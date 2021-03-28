$(document).ready(() => {
    //// EDIT FUNCTION ////
    (function editFunctions() {
        // Toggles the editor when run
        const toggleEdit = () => {
            $("#edit-popup-todo").slideToggle();
        };

        // Runs edit functions
        const edit = async () => {
            const id = document
                .querySelector("#edit-popup-todo")
                .getAttribute("data-id");

            const select = (x) => document.querySelector(x);
            console.log(id)
            const name = select("#edit-title").value;
            const description = select("#edit-description").value;

            const body = JSON.stringify({ name, description });

            console.log(body);     

            const response = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                body,
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                console.log("Todo updated!");
                document.location.reload();
            } else {
                alert("ERR: Failed to update todo!");
            }

        };

        // On click action of edit button
        $("#edit-todo").click(toggleEdit);
        $("#cancel-edits-todo").click(toggleEdit);
        $("#save-edits-todo").click(edit);
    })();

    //// REMOVE FUNCTION ////
    (function removeFunctions() {
        // opens confirmation box
        $("#remove-todo").click(() => {
            $("#delete-container").slideToggle();
            $("#remove-todo").slideUp();
        });

        // Cancels confirmation box
        $("#cancel-option").click(() => {
            $("#delete-container").slideUp();
            $("#remove-todo").slideToggle();
        });

        // actual removal from database
        const remove = async (e) => {
            e.preventDefault();
            // grabs id of the target event
            const id = document
                .querySelector("#delete-container")
                .getAttribute("data-id");
            // runs api delete
            const response = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Redirect to hom page
                document.location.replace("/todos");
            } else {
                alert("ERR: Failed to remove todo");
            }
        };

        // On click action
        $("#confirm-option").click(remove);
    })();
});
