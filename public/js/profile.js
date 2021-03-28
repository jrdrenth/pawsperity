$(document).ready(() => {
    // Shorthand query selector
    const select = (x) => document.querySelector(x);

    const toggleEdit = () => {
        $("#profile-edit-popup").slideToggle();
    };

    // runs the actual update
    const edit = async (e) => {
        e.preventDefault();
        // Grabs id of user
        const defaultName = select("#defaultProfile").getAttribute("data-name");
        const defaultEmail = select("#defaultProfile").getAttribute(
            "data-email"
        );
        const id = select("#profile-edit-popup").getAttribute("data-id");
        const name = select("#new-name").value || defaultName;
        const email = select("#new-email").value || defaultEmail;
        const body = JSON.stringify({ name, email });

        const response = await fetch(`/api/users/${id}`, {
            method: "PUT",
            body,
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            console.log("User has been edited!");
        } else {
            alert("ERR: Failed to update user");
        }
    };

    $("#profile-edit-popper").click(toggleEdit);
    $("#cancel-edits-profile").click(toggleEdit);
    $("#save-edits-profile").click(edit);
});
