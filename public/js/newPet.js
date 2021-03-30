// short query selector
const select = (element) => document.querySelector(element);

const addPet = async function (e) {
    e.preventDefault();
    // DOM elements
    const name = select("input[name='pet-name'").value;
    const dob = select("input[name='pet-dob'").value;
    const gender = select("select[name='pet-gender'").value;
    const type = select("select[name='pet-type'").value;

    // Formats into JSON string
    const body = JSON.stringify({ name, dob, gender, pet_type_id: type });
    // fetches api
    const response = await fetch("/api/pets/", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
    });
    // grabs the id from the response
    const pet = await response.json();

    document.location.replace(`/petdetails/${pet.id}`);
};

select("#add-pet").addEventListener("click", addPet);
