const newFormHandler = async function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="todo-name"]').value;
  const description = document.querySelector('textarea[name="todo-description"]').value;

  const requestBody = JSON.stringify({ name, description });

  const response = await fetch(`/api/todos`, {
    method: 'POST',
    body: requestBody,
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/todos');
};

document
  .querySelector('#new-todo-button')
  .addEventListener('click', newFormHandler);
