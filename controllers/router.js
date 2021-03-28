const express = require("express");
const { Todo, User, PetType, Pet, Visit } = require("../models");
const router = express.Router();
const withAuth = require("../utils/auth");
const fetch = require("node-fetch");
const { sequelize } = require("../models/Pet");
var moment = require("moment"); // require
moment().format();

// const { Sequelize } = require("sequelize/types");

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
    const userID = req.session.user_id;
    // fetches api from serverside through userID
    const response = await fetch(
        `http://localhost:3001/api/pets/byuserid/${userID}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    // waits for response of fetch
    const responseText = await response.text();
    // parses the response
    const apiRes = JSON.parse(responseText);

    // // bring in object of icons
    const petIcons = new Map([
        ["Dog", "fas fa-dog fa-2x"],
        ["Cat", "fas fa-cat fa-2x"],
        ["Rabbit", "fas fa-carrot fa-2x"],
        ["Bird", "fas fa-dove fa-2x"],
        ["Fish", "fas fa-fish fa-2x"],
        ["Reptile", "fab fa-suse fa-2x"],
        ["Rodent", "fas fa-cheese fa-2x"],
        ["Dragon", "fab fa-d-and-d fa-2x"],
        ["Dinosaur", "fas fa-tooth fa-2x"],
        ["Exotic", "fas fa-hand-sparkles fa-2x"],
        ["Beast", "fab fa-optin-monster fa-2x"],
        ["Pokemon", "fas fa-dot-circle fa-2x"],
        ["null", "far fa-question-circle fa-2x"],
    ]);

    // default icons
    const defaultIcon = "far fa-question-circle fa-2x";

    // maps new apiRes with added icon property to each object in array
    const pets = apiRes.map(({ id, name, dob, gender, pet_type }) => ({
        id,
        name,
        dob,
        gender,
        pet_type,
        icon: petIcons.get(pet_type.name) ?? defaultIcon,
    }));

    res.render("index", {
        title: "Pets",
        pageHeader: "Your Family List",
        icon: "fas fa-paw fa-2x",
        pets,
    });
});

// petdetails
router.get("/petdetails/:id", withAuth, async (req, res) => {
    const petID = req.params.id;
    const {
        pet_type_id: id,
        name,
        dob,
        gender,
        createdAt,
    } = await Pet.findByPk(petID);
    const { name: typeName } = await PetType.findByPk(id);

    const allPetTypes = await PetType.findAll({
        raw: true,
    });
    const pettypes = allPetTypes.map(({ id, name }) => ({ id, name }));

    res.render("petdetails", {
        title: "Pet Details",
        pageHeader: "Pet Details",
        icon: "fas fa-info-circle fa-2x",
        id: petID,
        name,
        dob,
        gender,
        createdAt,
        typeName,
        pettypes,
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
            // query for not completed todo in todo models
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
            title: "todo",
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

router.get("/visit", withAuth, async (req, res) => {
    try {
        // const visitsOrm = await Visit.findAll({
        //     order: [["date_time", "DESC"]],
        // });
        // const visits = visitsOrm.map((visit) => visit.get({ plain: true }));

        const userId = req.session.user_id;
        const response = await fetch(
            `http://localhost:3001/api/visits/byuserid/${userId}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        const responseText = await response.text();
        const visits = JSON.parse(responseText);

        const pastVisits = [];
        const todayVisits = [];
        const upcomingVisits = [];

        const today = moment(moment().format("YYYY-MM-DD")).toDate();
        const tomorrow = moment(moment().format("YYYY-MM-DD"))
            .add(1, "days")
            .toDate();

        visits.forEach((obj) =>
            console.log(obj.date_time, obj.date_time > today)
        );
        visits.forEach((obj) => {
            let visit = obj;
            visit.date_time = moment(
                visit.date_time,
                "YYYY-MM-DDTHH:mm:ss.fff"
            ).toDate();

            if (visit.date_time >= tomorrow) upcomingVisits.push(visit);
            else if (visit.date_time < today) pastVisits.push(visit);
            else todayVisits.push(visit);
        });

        res.render("visit", {
            title: "Visits",
            pageHeader: "Visit List",
            icon: "far fa-check-circle fa-2x",
            pastVisits,
            todayVisits,
            upcomingVisits,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get visit form
router.get("/visitForm", withAuth, async (req, res) => {
    // User ID
    const userId = req.session.user_id;

    // fetch data of pets
    const petResponse = await fetch(
        `http://localhost:3001/api/pets/byuserid/${userId}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );
    const petResponseText = await petResponse.text();
    const pets = JSON.parse(petResponseText);

    // fetch data of service provider // gets all providers
    const providerResponse = await fetch(
        `http://localhost:3001/api/services/providers/`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );
    const providerResponseText = await providerResponse.text();
    const providers = JSON.parse(providerResponseText);

    // fetch data of services // gets all services
    const servicesResponse = await fetch(
        `http://localhost:3001/api/services/`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );
    const servicesResponseText = await servicesResponse.text();
    const services = JSON.parse(servicesResponseText);

    res.render("visitForm", {
        title: "Visit Form",
        pageHeader: "Add New Visit",
        icon: "far fa-calendar-check fa-2x",
        pets,
        providers,
        services,
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
        id: userID,
    });
});

module.exports = router;
