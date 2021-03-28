const newFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="visit-name"]').value;
    const date_time = document.querySelector('input[name="visit-date"]').value;
    const notes = document.querySelector('textarea[name="visit-description"]')
        .value;

    // need to add more DOMs
    console.log(date_time);
    const requestBody = JSON.stringify({ title, date_time, notes });

    console.log(requestBody);
    const response = await fetch(`/api/visits`, {
        method: "POST",
        body: requestBody,
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/visit");
    } else {
        alert("Something went wrong!");
    }
};

document
    .querySelector("#new-visit-form")
    .addEventListener("submit", newFormHandler);
