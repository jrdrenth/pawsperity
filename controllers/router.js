const express = require("express");
const router = express.Router();

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
router.get("/", (req, res) => {
    res.render("index", {
        title: "Pets",
        pageHeader: "Your Family List",
        icon: "fas fa-paw fa-2x",
    });
});

router.get("/petdetails", (req, res) => {
    res.render("petdetails", {
        title: "Pet Details",
        pageHeader: "Pet Details",
        icon: "fas fa-info-circle fa-2x",
    });
});

// Add pets
router.get("/addpet", (req, res) => {
    res.render("addpets", {
        title: "Add Pets",
        pageHeader: "Add New Pets",
        icon: "fas fa-plus fa-2x",
    });
});

// todo page
router.get("/todo", (req, res) => {
    res.render("todo", {
        title: "Todo",
        pageHeader: "Todo List",
        icon: "far fa-check-circle fa-2x",
    });
});

// visit page
router.get("/visit", (req, res) => {
    res.render("visit", {
        title: "Visits",
        pageHeader: "Visit List",
        icon: "far fa-calendar-check fa-2x",
    });
});

// Settings page
router.get("/settings", (req, res) => {
    res.render("settings", {
        title: "Config",
        pageHeader: "Settings",
        icon: "fas fa-cog fa-2x",
    });
});

router.get("/setting", (req, res) => {
    res.redirect("settings");
});

router.get("/config", (req, res) => {
    res.redirect("settings");
});

router.get("/profile", (req, res) => {
    res.render("profile", {
        title: "Profile",
        pageHeader: "Profile",
        icon: "fas fa-user-circle",
    });
});

module.exports = router;
