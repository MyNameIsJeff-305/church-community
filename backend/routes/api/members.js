const router = require('express').Router();

const { Member } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

//Get All Members
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const members = await Member.findAll();

        if (!members) {
            return res.status(404).json({
                message: "No members found"
            });
        }

        res.json({ members });
    } catch (error) {
        next(error);
    }
});

// Get Member Details
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.json({ member });
    } catch (error) {
        next(error);
    }
});

// Add a Member
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const newMember = await Member.create(req.body);
        res.status(201).json({ member: newMember });
    } catch (error) {
        next(error);
    }
});

// Edit a Member
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        await member.update(req.body);
        res.json({ member });
    } catch (error) {
        next(error);
    }
});

// Delete a Member
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        await member.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;