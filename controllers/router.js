const express = require("express");
const { Todo } = require("../models");
const router = express.Router();
const withAuth = require('../utils/auth');

// Login
router.get("/login", (req, res) => {
    res.render("login", {
        layout: "signup",
        title: "Login",
    });
});

// Signup
router.get("/signup", (req, res) => {
    res.render("signup", {
        layout: "signup",
        title: "Sign Up",
    });
});

// Pets page
router.get("/", withAuth, (req, res) => {
    res.render("index", {
        title: "Pets",
        pageHeader: "Your Family List",
        icon: "fas fa-paw fa-2x",
    });
});

router.get("/petdetails", withAuth, (req, res) => {
    res.render("petdetails", {
        title: "Pet Details",
        pageHeader: "Pet Details",
        icon: "fas fa-info-circle fa-2x",
    });
});

// Add pets
router.get("/addpet", withAuth, (req, res) => {
    res.render("addpets", {
        title: "Add Pets",
        pageHeader: "Add New Pets",
        icon: "fas fa-plus fa-2x",
    });
});

// get all todos in page
// we have two sections where it can be completed and not completed
router.get("/todos", withAuth, async (req, res) => {
    try {
        const todosNotCompletedData = await Todo.findAll({
            // query for not completed todo in Todo models
            where: {
                is_completed: false,
            }
        });
        const todosCompletedData = await Todo.findAll({
            where: {
                is_completed: true,
            }
        });

        // serializing data to be completed or not
        const todosNotCompleted = todosNotCompletedData.map((todo) => todo.get({ plain: true }));

        const todosCompleted = todosCompletedData.map((todo) => todo.get({plain: true}));

        res.render("todos", {
            title: "Todo",
            pageHeader: "Todo List",
            icon: "far fa-check-circle fa-2x",
            todosNotCompleted,
            todosCompleted
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single todo
router.get("/todo/:id", withAuth, async (req, res) => { 
    try{        
        const todoData = await Todo.findByPk(req.params.id, {})

        const todo = todoData.get({ plain: true });

        res.render('singleTodo', { 
            title: "Todo",
            pageHeader: "Todo Information",
            icon: "far fa-check-circle fa-2x",
            todo
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

// get todo form

router.get("/todo", withAuth, (req, res) => {
    res.render("todoForm", {
        title: "Todo Form",
        pageHeader: "Add New Todo",
        icon: "far fa-check-circle fa-2x",
    });
});

// get single post
// router.get('/todo/:id', async (req, res) => {
//     try {
//       const todoData = await Todo.findByPk(req.params.id, {
//         include: [
//           User,
//           {
//             model: Comment,
//             include: [User],
//           },
//         ],
//       });
  
//       if (todoData) {
//         const todo = todoData.get({ plain: true });
  
//         res.render('single-post', { todo });
//       } else {
//         res.status(404).end();
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// visit page
router.get("/visit", withAuth, (req, res) => {
    res.render("visit", {
        title: "Visits",
        pageHeader: "Visit List",
        icon: "far fa-calendar-check fa-2x",
    });
});

// Settings page
router.get("/settings", withAuth, (req, res) => {
    res.render("settings", {
        title: "Config",
        pageHeader: "Settings",
        icon: "fas fa-cog fa-2x",
    });
});

router.get("/setting", withAuth, (req, res) => {
    res.redirect("settings");
});

router.get("/config", withAuth, (req, res) => {
    res.redirect("settings");
});

router.get("/profile", withAuth, (req, res) => {
    res.render("profile", {
        title: "Profile",
        pageHeader: "Profile",
        icon: "fas fa-user-circle",
    });
});

module.exports = router;
