const form = document.querySelector('#comment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const contentEl = document.querySelector('#comment-content').value;
  const postId = document.querySelector('#comment-content').getAttribute('post');

  const newComment = {
    content: contentEl,
    post_id: postId,
  };
  
  const response = await fetch(`/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment)
  });

  if (response.ok) {
    document.location.reload(true);
  } else {
    alert('Failed to add comment, try again!');
  }
});