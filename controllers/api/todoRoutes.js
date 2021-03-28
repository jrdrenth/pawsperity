const router = require("express").Router();
const { Todo } = require("../../models/");
// const withAuth = require('../../utils/auth');

// Create
router.post("/", async (req, res) => {
    try {
        const requestedTodo = { ...req.body, user_id: req.session.user_id };

        const newTodo = await Todo.create(requestedTodo);
        res.status(200).json(newTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read all
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by id
router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (todo != null) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({
                message: `No todo found with id: ${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by user_id
router.get("/byuserid/:id", async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: { user_id: req.params.id },
            order: [["id", "asc"]],
        });

        if (todos != null) {
            res.status(200).json(todos);
        } else {
            res.status(404).json({ message: `No todos found` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const todoCheck = await Todo.update(req.body, {
            where: { id: req.params.id },
        });
        if (todoCheck > 0) {
            res.status(200).json(todoCheck);
        } else {
            res.status(404).json(todoCheck);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const isDeleted = await Todo.destroy({ where: { id: req.params.id } });

        if (isDeleted != 0) {
            res.status(200).json(isDeleted);
        } else {
            res.status(404).json(isDeleted);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
