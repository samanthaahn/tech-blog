const postForm = document.querySelector('form');

  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titleEl = document.querySelector('#title');
    const contentEl = document.querySelector('#content');

    const newPost = {
        title: titleEl.value,
        content: contentEl.value
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
    
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post, try again!');
      }
    });
    
    const createPostButton = document.querySelector('#create-new-post');

createPostButton.addEventListener('click', () => {
  window.location.replace('/createpost');
});

    