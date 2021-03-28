$(document).on("click", ".accept", function() {
  const id = $(this).attr("data-id");

  const is_completed = $(this).is(":checked")
  document.location.reload()
  const response = fetch(`/api/todos/${id}`,{
    method: 'PUT',
    body: JSON.stringify({
      is_completed
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  document.location.reload()

});



// const checkedHandler = async function(event) {

//   event.preventDefault();

//   console.log("HERE")

//   const is_completed = document.getElementById('#accept:checked') !== null
//   result = document.querySelector('h1')
//   const cb = document.getElementsByClassName('accept');
//   result.innerText = cb.value;
//   console.log(cb.value)

//   const name = document.querySelector('input[name="todo-name"]').value;
//   const description = document.querySelector('textarea[name="todo-description"]').value;

//   const requestBody = JSON.stringify({ cb });

//   const response = await fetch(`/api/todos`, {
//     method: 'PUT',
//     body: requestBody,
//     headers: { 'Content-Type': 'application/json' }
//   });

//   document.location.replace('/todos');
// };

// document
//   .querySelector('input[type=checkbox]')
//   .addEventListener('checkbox', checkedHandler);

// ACTION: ge