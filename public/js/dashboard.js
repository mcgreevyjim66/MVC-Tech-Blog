const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (name && description) {
    console.log("*****************create blog:", name);
    console.log("*****************create blog:", description);
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    console.log("*****************delbuttonhandler id:" + id);

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};


document.addEventListener('DOMContentLoaded', (event) => {
  const newBlogForm = document.querySelector('.new-blog-form');
  const blogList = document.querySelector('.blog-list');
  
  console.log("*****************New Blog Form:", newBlogForm);
  console.log("*****************Blog List:", blogList);

  if (newBlogForm) {
    newBlogForm.addEventListener('submit', newFormHandler);
  }

  if (blogList) {
    blogList.addEventListener('click', delButtonHandler);
  }
});



