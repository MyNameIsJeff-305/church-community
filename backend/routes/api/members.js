const router = require('express').Router();
const { requireAuth, authorize } = require('../../utils/auth.js');

const { Member, Gender, MemberType, CivilStatus, Household, Phone, PhoneType, Email, EmailTypes } = require('../../db/models');

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
        });

        if (phones.length === 0) {
            return res.status(404).json({ message: 'No phones found' });
        }

        let Phones = [];

        for (let phone of phones) {

            Phones.push({
                id: phone.id,
                phoneNumber: phone.phoneNumber,
                phoneType: phone.phoneType
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
            phoneType,
            memberId
        });

        return res.status(201).json(phone);

    } catch (error) {
        next(error)
    }
});

//Update a Phone of a Member
router.put('/:id/phones/:phoneId', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const phone = await Phone.findByPk(req.params.phoneId);

        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }

        const { phoneNumber, phoneType } = req.body;

        phone.phoneNumber = phoneNumber || phone.phoneNumber;
        phone.phoneType = phoneType || phone.phoneType;

        await phone.save();

        return res.json(phone);

    } catch (error) {
        next(error);
    }
});

//Delete a Phone of a Member
router.delete('/:id/phones/:phoneId', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const phone = await Phone.findByPk(req.params.phoneId);

        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }

        await phone.destroy();

        return res.json({ message: 'Phone deleted' });

    } catch (error) {
        next(error);
    }
});

//Get all Emails of a Member
router.get('/:id/emails', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const emails = await Email.findAll({
            where: {
                memberId: memberId
            }
        });

        if(emails.length === 0) {
            return res.status(404).json({ message: 'No emails found' });
        }

        let Emails = [];

        for (let email of emails) {
            Emails.push({
                id: email.id,
                emailAddress: email.emailAddress,
                emailType: email.emailType
            })
        }

        res.json(Emails);

    } catch (error) {
        next(error);
    }
});

//Add an Email to a Member
router.post('/:id/emails', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const { emailAddress, emailType } = req.body;

        const email = await Email.create({
            emailAddress,
            emailType,
            memberId
        });

        return res.status(201).json(email);

    } catch (error) {
        next(error);
    }
});

//Update an Email of a Member
router.put('/:id/emails/:emailId', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const email = await Email.findByPk(req.params.emailId);

        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const { emailAddress, emailType } = req.body;

        email.emailAddress = emailAddress || email.emailAddress;
        email.emailType = emailType || email.emailType;

        await email.save();

        return res.json(email);

    } catch (error) {
        next(error);
    }
});

//Delete an Email of a Member
router.delete('/:id/emails/:emailId', requireAuth, async (req, res, next) => {
    const memberId = parseInt(req.params.id);

    try {
        const email = await Email.findByPk(req.params.emailId);

        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        await email.destroy();

        return res.json({ message: 'Email deleted' });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
