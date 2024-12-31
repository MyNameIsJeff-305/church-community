const router = require('express').Router();
const { requireAuth, authorize } = require('../../utils/auth.js');

const { Member, Gender, MemberType, CivilStatus, Household, Phone, PhoneType } = require('../../db/models');

//Get all Members
router.get('/', requireAuth, async (req, res, next) => {

    try {
        const members = await Member.findAll();

        let Members = [];

        for (let member of members) {
            const gender = await Gender.findByPk(member.genderId);
            const memberType = await MemberType.findByPk(member.memberTypeId);
            const civilStatus = await CivilStatus.findByPk(member.memberCivilStatusId);

            Members.push({
                id: member.id,
                userId: member.userId,
                profileImg: member.profileImg,
                firstName: member.firstName,
                lastName: member.lastName,
                alias: member.alias,
                idNumber: member.idNumber,
                birthDate: member.birthDate,
                gender: gender.gender,
                memberType: memberType.memberType,
                civilStatus: civilStatus.civilStatus
            })
        }

        res.json(Members);
    }
    catch (error) {
        next(error);
    }
});

//Get a Member
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        const gender = await Gender.findByPk(member.genderId);
        const memberType = await MemberType.findByPk(member.memberTypeId);
        const civilStatus = await CivilStatus.findByPk(member.memberCivilStatusId);
        const household = await Household.findByPk(member.householdId) || null;

        let safeMember = {
            id: member.id,
            userId: member.userId,
            profileImg: member.profileImg,
            firstName: member.firstName,
            lastName: member.lastName,
            alias: member.alias,
            idNumber: member.idNumber,
            birthDate: member.birthDate,
            gender: gender.gender,
            memberType: memberType.memberType,
            civilStatus: civilStatus.civilStatus,
            household: household ? household.name : null
        }

        return res.json(safeMember);

    } catch (error) {

    }
})

//Create a Member
router.post('/', requireAuth, async (req, res, next) => { //Implement Role and Permissions
    try {
        const { profileImg, firstName, lastName, alias, idNumber, birthDate, genderId, householdId, memberTypeId, memberStatusId, memberCivilStatusId } = req.body;

        const member = await Member.create({
            profileImg: profileImg || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            firstName,
            lastName,
            alias,
            idNumber,
            birthDate,
            genderId,
            householdId: householdId || null,
            memberTypeId,
            memberStatusId,
            memberCivilStatusId
        });

        return res.status(201).json(member);
    } catch (error) {
        next(error);
    }
})

//Update a Member
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        const { profileImg, firstName, lastName, alias, idNumber, birthDate, genderId, householdId, memberTypeId, memberStatusId, memberCivilStatusId } = req.body;

        member.profileImg = profileImg || member.profileImg;
        member.firstName = firstName || member.firstName;
        member.lastName = lastName || member.lastName;
        member.alias = alias || member.alias;
        member.idNumber = idNumber || member.idNumber;
        member.birthDate = birthDate || member.birthDate;
        member.genderId = genderId || member.genderId;
        member.householdId = householdId || member.householdId;
        member.memberTypeId = memberTypeId || member.memberTypeId;
        member.memberStatusId = memberStatusId || member.memberStatusId;
        member.memberCivilStatusId = memberCivilStatusId || member.memberCivilStatusId;

        await member.save();

        return res.json(member);

    } catch (error) {
        next(error);
    }
});

//Delete a Member
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        await member.destroy();

        return res.json({ message: 'Member deleted' });

    } catch (error) {
        next(error);
    }
});

//Get all Phones of a Member
router.get('/:id/phones', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const phones = await Phone.findAll({
            where: {
                memberId: memberId
            }
        })

        if (phones.length === 0) {
            return res.status(404).json({ message: 'This user does not have phones' });
        }

        let Phones = [];

        for (let phone of phones) {
            const phoneType = await PhoneType.findAll({
                where: {
                    phoneId: phone.id
                },
            });

            Phones.push({
                id: phone.id,
                phone: phone.phoneNumber,
                phoneType: phoneType[0].phoneType
            })
        }


        res.json(Phones);

    } catch (error) {
        next(error);
    }
})

//Add a Phone to a Member
router.post('/:id/phones', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const { phoneNumber, phoneType } = req.body;
        
        const phone = await Phone.create({
            phoneNumber,
            memberId
        });

        await PhoneType.create({
            phoneId: phone.id,
            phoneType: phoneType
        });

        return res.status(201).json({
            id: phone.id,
            phone: phone.phoneNumber,
            phoneType: phoneType
        });

    } catch (error) {
        next(error);
    }
});

//Update a Phone of a Member
router.put('/:id/phones/:phoneId', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);
    const phoneId = parseInt(req.params.phoneId);

    try {
        const phone = await Phone.findByPk(phoneId);

        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }

        const { phoneNumber, phoneType } = req.body;

        phone.phoneNumber = phoneNumber || phone.phoneNumber;

        await phone.save();

        const phoneTypeObj = await PhoneType.findOne({
            where: {
                phoneId: phone.id
            }
        });

        phoneTypeObj.phoneType = phoneType || phoneTypeObj.phoneType;

        await phoneTypeObj.save();

        return res.json({
            id: phone.id,
            phone: phone.phoneNumber,
            phoneType: phoneTypeObj.phoneType
        });

    } catch (error) {
        next(error);
    }
});

//Delete a Phone of a Member
router.delete('/:id/phones/:phoneId', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);
    const phoneId = parseInt(req.params.phoneId);

    try {
        const phone = await Phone.findByPk(phoneId);

        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }

        await phone.destroy();

        return res.json({ message: 'Phone deleted' });

    } catch (error) {
        next(error);
    }
});


module.exports = router;
