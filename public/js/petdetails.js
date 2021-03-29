$(document).ready(() => {
    //// EDIT FUNCTION ////
    (function editFunctions() {
        // Toggles the editor when run
        const toggleEdit = () => {
            $("#edit-popup").slideToggle();
        };

        // Runs edit functions
        const edit = async () => {
            const id = document
                .querySelector("#edit-popup")
                .getAttribute("data-id");

            const select = (x) => document.querySelector(x);

            const name = select("#edit-name").value;
            const dob = select("#new-pet-dob").value;
            const gender = select("#new-pet-gender").value;

            const body = JSON.stringify({ name, dob, gender });

            const response = await fetch(`/api/pets/${id}`, {
                method: "PUT",
                body,
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                console.log("Pet updated!");
                document.location.href(`/petdetails/${id}`);
            } else {
                alert("ERR: Failed to update pet!");
            }
        };

        // On click action of edit button
        $("#edit-pet").click(toggleEdit);
        $("#cancel-edits-pets").click(toggleEdit);
        $("#save-edits").click(edit);
    })();

    //// REMOVE FUNCTION ////
    (function removeFunctions() {
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
                // Redirect to home page
                document.location.replace("/");
            } else {
                alert("ERR: Failed to remove pet");
            }
        };

        // On click action
        $("#confirm-option").click(remove);
    })();
});
