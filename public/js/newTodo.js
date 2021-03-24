const newFormHandler = async function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="todo-name"]').value;
  const description = document.querySelector('textarea[name="todo-description"]').value;

  await fetch(`/api/todo`, {
    method: 'POST',
    body: JSON.stringify({
      id: 1,
      unique_id: 1,
      name,
      description,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // document.location.replace('/todo');
};

document
  .querySelector('#new-todo-form')
  .addEventListener('submit', newFormHandler);
