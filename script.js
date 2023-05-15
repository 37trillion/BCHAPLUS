// This code runs when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // Get a reference to the comment form and the comments section
  var commentForm = document.getElementById('comment-form');
  var commentsSection = document.getElementById('comments-section');

  // When the comment form is submitted, handle the form data
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the name and comment text from the form
    var nameInput = document.getElementById('name-input');
    var commentInput = document.getElementById('comment-input');
    var name = nameInput.value;
    var comment = commentInput.value;

    // Create a new comment object with the name and comment text
    var newComment = {
      name: name,
      comment: comment
    };

    // Send the comment data to the PHP script using AJAX
    var request = new XMLHttpRequest();
    request.open('POST', 'comments.php');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
      // When the AJAX request is complete, add the new comment to the comments section
      var response = JSON.parse(request.responseText);
      var commentElement = createCommentElement(response.name, response.comment);
      commentsSection.appendChild(commentElement);

      // Reset the form inputs
      nameInput.value = '';
      commentInput.value = '';
    };
    request.send(JSON.stringify(newComment));
  });

  // Fetch the existing comments from the PHP script using AJAX
  var request = new XMLHttpRequest();
  request.open('GET', 'comments.php');
  request.onload = function() {
    // When the AJAX request is complete, add each comment to the comments section
    var comments = JSON.parse(request.responseText);
    comments.forEach(function(comment) {
      var commentElement = createCommentElement(comment.name, comment.comment);
      commentsSection.appendChild(commentElement);
    });
  };
  request.send();

  // Helper function to create a new comment element
  function createCommentElement(name, comment) {
    var commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = '<h3>' + name + '</h3><p>' + comment + '</p>';
    return commentElement;
  }

});s
