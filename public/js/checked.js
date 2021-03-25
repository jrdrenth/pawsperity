const checkedHandler = async function(event) {
  event.preventDefault();

  const is_completed =  document.querySelector('#accept:checked') !== null

  const name = document.querySelector('input[name="todo-name"]').value;
  const description = document.querySelector('textarea[name="todo-description"]').value;

  const requestBody = JSON.stringify({ name, description });

  const response = await fetch(`/api/todos`, {
    method: 'PUT',
    body: requestBody,
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/todos');
};

document
  .querySelector('.todoCB')
  .addEventListener('checkbox', checkedHandler);
