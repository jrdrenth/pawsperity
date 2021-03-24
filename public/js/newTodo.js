const newFormHandler = async function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="todo-name"]').value;
  const description = document.querySelector('textarea[name="todo-description"]').value;

  const requestBody = JSON.stringify({ name, description });
  // console.log('\nNew Todo Request BODY:');
  // console.log(requestBody);
  // console.log();

  const response = await fetch(`/api/todos`, {
    method: 'POST',
    body: requestBody,
    headers: { 'Content-Type': 'application/json' }
  });

};

document
  .querySelector('#new-todo-form')
  .addEventListener('submit', newFormHandler);
