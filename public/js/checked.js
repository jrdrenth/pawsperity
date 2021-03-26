
// const h3 = document.querySelector("h3");
// const id = document.getElementsByClassName('check');

// for (i = 0; i < cb.length; i++) {
//   console.log(cb)
// }


// console.log(cb.checked);
// document.querySelector('#accept:checked') !== null

// console.log(cb.value); // on
// cb.onclick = () => {
//   const result = cb.value;
//   alert(result);
// }

$(document).on("click", ".accept", function() {
  // const result = cb.value;
  const id = $(this).attr("data-id");

  const newComplete = $(this).data("")

  // $.ajax("api/")
});


// const checkedHandler = async function(event) {

//   event.preventDefault();

//   const is_completed = document.getElementById('#accept:checked') !== null
//   result = document.querySelector('h1')
//   const cb = document.getElementById('accept');
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
//   .querySelector('#todoCB')
//   .addEventListener('click', checkedHandler);
