const newCommentHandler = async (event) => {
  console.log("*****************comments.js inside new comment listener:");
  event.preventDefault();
  console.log(document.querySelector('#new-comment-id'))
  const comment = document.querySelector('#new-comment-id').value.trim();
  //const blogId = document.querySelector('#blog-id').value.trim();
  let inputElement = document.querySelector('.comment-input');
  let blog_id = inputElement.getAttribute('data-blogid');

  if (comment) {
    console.log("*****************comment.js add commentText:", comment);
    console.log("*****************comment.js add blogId:", blog_id);
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      //body: JSON.stringify({ commentText, blogId }),
      //body: JSON.stringify({ comment}),
      body: JSON.stringify({ comment,  blog_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
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

//***************************************************** 
//if (title && content) {
//  const response = await fetch(`/api/posts/${post_id}`, {
//    method: "PUT",
//    body: JSON.stringify({ title, content }),
//    headers: { "Content-Type": "application/json" },
//  });
  //****************************************** */

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
      document.location.replace('/profile');
    } else {
      alert('Failed to update blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    console.log("*****************comments.js delete id:" + id);

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
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
  const updateBlogForm = document.querySelector('.update-blog-form');
  
  console.log("*****************update blog form:", updateBlogForm);

  if (updateBlogForm) {
    console.log("*****************blogs.js start update blog listener:");
    updateBlogForm.addEventListener('submit', updateBlogHandler);
  }

});



//document.addEventListener('DOMContentLoaded', (event) => {
//  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);
//  document.querySelector('.project-list').addEventListener('click', delButtonHandler);
//});


//document
//  .querySelector('.new-project-form')
//  .addEventListener('submit', newFormHandler);

//document
//  .querySelector('.project-list')
//  .addEventListener('click', delButtonHandler);
