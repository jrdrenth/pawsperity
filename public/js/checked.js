$(document).ready(() => {
    $(document).on("click", ".accept", async function () {
        const id = this.getAttribute("data-id");
        const is_completed = this.checked;
        const res = await fetch(`/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({ is_completed }),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            document.location.reload();
        } else {
            console.log("something went wrong");
        }
    });
});
