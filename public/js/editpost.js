form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const titleEl = document.querySelector('#title');
    const contentEl = document.querySelector('#content');
    const id = document.location.pathname.split('/').pop();
    
    const updatedPost = {
      title: titleEl.value,
      content: contentEl.value 
    };
    
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Could not update post, try again!');
    }
  });