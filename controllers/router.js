const express = require("express");
const router = express.Router();

// Pets page
router.get("/", (req, res) => {
    res.render("index", {
        title: "Pets",
        pageHeader: "Your Family List",
    });
});

// todo page
router.get("/todo", (req, res) => {
    res.render("todo", {
        title: "Todo",
        pageHeader: "Todo List",
    });
});

// visit page
router.get("/visit", (req, res) => {
    res.render("visit", {
        title: "Visits",
        pageHeader: "Visit List",
    });
});

// Settings page
router.get("/settings", (req, res) => {
    res.render("settings", {
        title: "Config",
        pageHeader: "Settings",
    });
});

router.get("/setting", (req, res) => {
    res.redirect("settings");
});

router.get("/config", (req, res) => {
    res.redirect("settings");
});

module.exports = router;
