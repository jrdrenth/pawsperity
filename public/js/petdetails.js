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
    // grabs id of the target event
    const id = document
        .querySelector("#delete-container")
        .getAttribute("data-id");
    // runs api delete
    const response = await fetch(`/api/pets/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        // Redirect to hom page
        document.location.replace("/");
    } else {
        alert("ERR: Failed to remove pet");
    }
};

// On click action
$("#confirm-option").click(remove);
