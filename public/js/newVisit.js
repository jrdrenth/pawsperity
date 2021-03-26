const newFormHandler = async function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="visit-name"]').value;
  
  const date = document.querySelector('input[name="visit-date"]').value;

  const description = document.querySelector('textarea[name="visit-description"]').value;

  const requestBody = JSON.stringify({ name, date, description });

  const response = await fetch(`/api/todos`, {
    method: 'POST',
    body: requestBody,
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/todos');
};

document
  .querySelector('#new-visit-form')
  .addEventListener('submit', newFormHandler);
