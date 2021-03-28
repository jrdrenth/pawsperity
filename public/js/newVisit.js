$(document).ready(() => {
    // click create
    const newFormHandler = async function (event) {
        event.preventDefault();

        const select = (x) => document.querySelector(x);

        // pet id
        const petID = select("#pet-visit-id").value;
        // provider id
        const providerID = select("#provider-visit-id").value;
        // service id // more than 1
        const serviceID = select("#service-visit-id").value;
        const title = select('input[name="visit-name"]').value;
        const date = select('input[name="visit-date"]').value;
        const time = select('input[name="visit-time"]').value;
        const notes = select('textarea[name="visit-description"]').value;

        const date_time = `${date} ${time}`;

        // need to add more DOMs
        const visitBody = JSON.stringify({
            pet_id: petID,
            service_provider_id: providerID,
            title,
            date_time,
            notes,
        });

        const visitResponse = await fetch(`/api/visits`, {
            method: "POST",
            body: visitBody,
            headers: { "Content-Type": "application/json" },
        });

        // grabs the id from the visitResponse
        const visit = await visitResponse.json();

        const serviceBody = JSON.stringify({
            visit_id: visit.id,
            service_id: serviceID,
            price: null,
            performed_by: null,
            notes: null,
        });

        const serviceResponse = await fetch(`/api/services/provided`, {
            method: "POST",
            body: serviceBody,
            headers: { "Content-Type": "application/json" },
        });

        if (visitResponse.ok && serviceResponse.ok) {
            document.location.replace("/visit");
        } else {
            alert("Something went wrong!");
        }
    };

    document
        .querySelector("#new-visit-form")
        .addEventListener("submit", newFormHandler);
});
