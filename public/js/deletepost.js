const deleteBtn = document.querySelector('#deleteBtn');

deleteBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const id = document.location.pathname.split('/').pop();
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Could not delete post. Try again!');
  }
});