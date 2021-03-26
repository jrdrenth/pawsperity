const express = require("express");
const { Todo, User, PetType, Pet } = require("../models");
const router = express.Router();
const withAuth = require("../utils/auth");
const fetch = require("node-fetch");

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

// Logout destroys session
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Pets page
router.get("/", withAuth, async (req, res) => {
    // pulls in id of user to gather correct pet
    const userID = req.session.user_id;
    // pulls in all pets in db based off user id
    const petlist = await Pet.findAll({
        where: { owner_id: userID },
    });
    // serializes the data
    const pets = petlist.map((pet) => pet.get({ plain: true }));

    // const petTypeID = pets.map((id) => id.pet_type_id);

    // // Pulls in pettype to compare
    // const petTypes = await PetType.findAll({
    //     where: { id: petTypeID },
    // });

    // petTypes.forEach((element) => console.log(element.dataValues.id));

    // fetch // TESTING
    const response = await fetch(
        `http://localhost:3001/api/pets/byuserid/${userID}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    console.log("\nRESPONSE HERE=========================================");
    console.log(response.body);

    res.render("index", {
        title: "Pets",
        pageHeader: "Your Family List",
        icon: "fas fa-paw fa-2x",
        pets,
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
router.get("/addpet", withAuth, async (req, res) => {
    // Gets list of pets to be put into dropdown menu
    const petTypes = await PetType.findAll();
    // serializing data
    const types = petTypes.map((type) => type.get({ plain: true }));

    res.render("addpets", {
        title: "Add Pets",
        pageHeader: "Add New Pets",
        icon: "fas fa-plus fa-2x",
        types,
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
            },
        });
        const todosCompletedData = await Todo.findAll({
            where: {
                is_completed: true,
            },
        });

        // serializing data to be completed or not
        const todosNotCompleted = todosNotCompletedData.map((todo) =>
            todo.get({ plain: true })
        );

        const todosCompleted = todosCompletedData.map((todo) =>
            todo.get({ plain: true })
        );

        res.render("todos", {
            title: "Todo",
            pageHeader: "Todo List",
            icon: "far fa-check-circle fa-2x",
            todosNotCompleted,
            todosCompleted,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single todo
router.get("/todo/:id", withAuth, async (req, res) => {
    try {
        const todoData = await Todo.findByPk(req.params.id, {});

        const todo = todoData.get({ plain: true });

        res.render("singleTodo", {
            title: "Todo",
            pageHeader: "Todo Information",
            icon: "far fa-check-circle fa-2x",
            todo,
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

// Gets profile page from within settings
router.get("/settings/profile", withAuth, async (req, res) => {
    // Grabs user id from session
    const userID = req.session.user_id;
    // Queries db for name, email and createdAt
    const { name, email, createdAt } = await User.findByPk(userID);
    // Renders page with the vars
    res.render("profile", {
        title: "Profile",
        pageHeader: "Profile",
        icon: "fas fa-user-circle fa-2x",
        name,
        email,
        createdAt,
    });
});

module.exports = router;
