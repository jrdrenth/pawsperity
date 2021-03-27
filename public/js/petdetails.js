// opens confirmation box
$("#remove-pet").click(() => {
    $("#delete-container").slideToggle();
    $("#remove-pet").slideUp();
});

// Cancels confirmation box
$("#cancel-option").click(() => {
    $("#delete-container").slideUp();
    $("#remove-pet").slideToggle();
});

// actual removal from database
const remove = async (e) => {
    e.preventDefault();
};
