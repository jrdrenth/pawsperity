// Animations for the visits page

// Today animations
$("#visit-today").click(() => {
    // Toggles visibility
    $("#visit-today .hide").slideToggle();
    // Slides up other cards to show the one clicked
    $("#visit-upcoming .hide").slideUp();
    $("#visit-past .hide").slideUp();
});

// Upcomfing animations
$("#visit-upcoming").click(() => {
    $("#visit-upcoming .hide").slideToggle();
    $("#visit-today .hide").slideUp();
    $("#visit-past .hide").slideUp();
});

// Past animations
$("#visit-past").click(() => {
    $("#visit-past .hide").slideToggle();
    $("#visit-today .hide").slideUp();
    $("#visit-upcoming .hide").slideUp();
});
