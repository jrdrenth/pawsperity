const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="visit-name"]').value;
  const date_time = document.querySelector('input[name="visit-date"]').value;
  const notes = document.querySelector('textarea[name="visit-description"]').value;
  console.log(date_time);
  const requestBody = JSON.stringify({ title, date_time, notes });

  const response = await fetch(`/api/visits`, {
    method: 'POST',
    body: requestBody,
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/visit');
};

document
  .querySelector('#new-visit-form')
  .addEventListener('submit', newFormHandler);
