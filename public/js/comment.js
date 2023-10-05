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
    console.log("*****************comments.js start new comment listener:");
    newCommentForm.addEventListener('submit', newCommentHandler);
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
