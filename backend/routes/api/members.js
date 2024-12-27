const router = require('express').Router();
const { requireAuth, authorize } = require('../../utils/auth.js');

const { Member, Gender, MemberType, CivilStatus } = require('../../db/models');

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
            civilStatus: civilStatus.civilStatus
        }

        return res.json(safeMember);

    } catch (error) {

    }
})

//Create a Member
router.post('/', requireAuth, async(req, res, next) => { //Implement Role and Permissions
    try {
        const { profileImg, firstName, lastName, alias, idNumber, birthDate, genderId, householdId, memberTypeId, memberStatusId, memberCivilStatusId } = req.body;

        // console.log(firstName, lastName, alias, idNumber, birthDate, genderId, householdId, memberTypeId, memberStatusId, memberCivilStatusId, "THIS IS FIRSTNAME")

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

        console.log(member)

        return res.status(201).json(member);
    } catch (error) {
        
    }
})

//Update a Member

//Delete a Member


module.exports = router;
