// opens confirmation box
const removePet = (e) => {
    e.preventDefault();
    $("#delete-container").slideToggle();
    $("#remove-pet").slideUp();
};

// cancels confirmation box
const cancelRemove = (e) => {
    e.preventDefault();
    $("#delete-container").slideUp();
    $("#remove-pet").slideToggle();
};

$("#remove-pet").click(removePet);
$("#cancel-option").click(cancelRemove);
