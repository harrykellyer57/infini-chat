/*
Filename: ComplexWebApp.js

Description: This code is a complex web application that demonstrates advanced JavaScript techniques such as modular programming, asynchronous functions, DOM manipulation, event handling, and more. It creates an interactive web page where users can post and view comments, like/dislike comments, and filter comments based on their rating.

Author: John Doe
Date: August 1, 2022
*/

// MODULE - CommentManager
const CommentManager = (() => {
  let comments = [];

  const getComments = () => comments;

  const addComment = async (comment) => {
    // Simulate server request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    comments.push(comment);
    renderComments();
  };

  const renderComments = () => {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    comments.forEach((comment) => {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.innerHTML = `
        <p>${comment.text}</p>
        <p>Rating: ${comment.rating}</p>
        <button class="like-btn">Like</button>
        <button class="dislike-btn">Dislike</button>
      `;

      commentElement.querySelector('.like-btn').addEventListener('click', () => {
        comment.rating++;
        renderComments();
      });

      commentElement.querySelector('.dislike-btn').addEventListener('click', () => {
        comment.rating--;
        renderComments();
      });

      commentsContainer.appendChild(commentElement);
    });
  };

  return {
    getComments,
    addComment,
  };
})();

// MODULE - CommentForm
const CommentForm = (() => {
  const commentInput = document.getElementById('comment-input');
  const submitBtn = document.getElementById('submit-btn');

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentText = commentInput.value;
    if (commentText.trim() !== '') {
      CommentManager.addComment({ text: commentText, rating: 0 });
      commentInput.value = '';
    }
  };

  const init = () => {
    submitBtn.addEventListener('click', handleSubmit);
  };

  return { init };
})();

// MODULE - CommentFilter
const CommentFilter = (() => {
  const filterBtns = Array.from(document.getElementsByClassName('filter-btn'));

  const handleFilter = (event) => {
    const selectedFilter = event.target.dataset.filter;
    const comments = CommentManager.getComments();
    const filteredComments = comments.filter((comment) => comment.rating >= selectedFilter);
    CommentManager.renderComments(filteredComments);
  };

  const init = () => {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', handleFilter);
    });
  };

  return { init };
})();

// MAIN SCRIPT
document.addEventListener('DOMContentLoaded', () => {
  CommentForm.init();
  CommentFilter.init();
});
