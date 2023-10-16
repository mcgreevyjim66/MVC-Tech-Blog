const newCommentHandler = async (event) => {
  console.log("*****************comments.js inside new comment listener:");
  event.preventDefault();
  console.log(document.querySelector('#new-comment-id'))
  const comment = document.querySelector('#new-comment-id').value.trim();
  //const blogId = document.querySelector('#blog-id').value.trim();
  let inputElement = document.querySelector('.comment-input');
  let blog_id = inputElement.getAttribute('data-blogid');
  let comment_created_by = ""


  if (comment) {
    console.log("*****************blog.js add commentText:", comment);
    console.log("*****************blog.js add blogId:", blog_id);
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment,  comment_created_by, blog_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //document.location.replace('/blogs');
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

const updateBlogHandler = async (event) => {
  console.log("*****************blog.js inside update blog listener:");
  event.preventDefault();
  console.log(document.querySelector('#update-blog-id'))
  const description = document.querySelector('#update-blog-id').value.trim();
  let inputElement = document.querySelector('.blog-input');
  let id = inputElement.getAttribute('data-updateblogid');


  if (description && id) {
    console.log("*****************blog.js update blog desc:", description);
    console.log("*****************blog.js update blogId:", id);
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
     // document.location.replace('/dashboard');
     document.location.reload();
    } else {
      alert('Failed to update blog');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log("*****************inside blogs.js delete id:");
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    console.log("*****************blogs.js delete id:" + id);

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};


document.addEventListener('DOMContentLoaded', (event) => {
  const newCommentForm = document.querySelector('.new-comment-form');
  
  console.log("*****************New comment form:", newCommentForm);

  if (newCommentForm) {
    console.log("*****************blogs.js start new comment listener:");
    newCommentForm.addEventListener('submit', newCommentHandler);
  } 
});

document.addEventListener('DOMContentLoaded', (event) => {
  const updateBlogForm = document.querySelector('.update-blog-button');
  
  console.log("*****************update blog form:", updateBlogForm);

  if (updateBlogForm) {
    console.log("*****************blogs.js start update blog listener:");
    updateBlogForm.addEventListener('click', updateBlogHandler);
  }


});

document.addEventListener('DOMContentLoaded', (event) => {
  const deleteBlogForm = document.querySelector('.delete-blog');
  
  console.log("*****************delete blog form:", deleteBlogForm);

  if (deleteBlogForm) {
    console.log("*****************blogs.js start update blog listener:");
    deleteBlogForm.addEventListener('click', delButtonHandler);
  }

});


