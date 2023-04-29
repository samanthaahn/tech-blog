const form = document.querySelector('#comment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const contentEl = document.querySelector('#comment-content');
  const postId = document.querySelector('#post-id').value;

  const newComment = {
    comment: contentEl.value,
    post_id: post,
  };
  
  const response = await fetch(`/api/posts/${postId}/comments`, {
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