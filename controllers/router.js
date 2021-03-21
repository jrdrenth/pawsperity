const express = require("express");
const router = express.Router();

// Pets page
router.get("/", (req, res) => {
    res.render("index");
});

// todo page
router.get("/todo", (req, res) => {
    res.render("todo");
});

// visit page
router.get("/visit", (req, res) => {
    res.render("visit");
});

// Settings page
router.get("/settings", (req, res) => {
    res.render("settings");
});

router.get("/setting", (req, res) => {
    res.redirect("settings");
});

router.get("/config", (req, res) => {
    res.redirect("settings");
});

module.exports = router;
