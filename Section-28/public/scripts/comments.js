const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const saveCommentFormElement = document.querySelector("#comments-form form");

function _getCommentsListElement(comments) {
  const commentsListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");

    commentElement.innerHTML = `
            <article class="comment-item">
                <h2>${comment.title}</h2>
                <p>${comment.text}</p>
            </article>`;

    commentsListElement.append(commentElement);
  }

  return commentsListElement;
}

async function loadComments() {
  const postId = loadCommentsBtnElement.dataset.postId;

  try {
    const result = await fetch(`/posts/${postId}/comments`);
    const resultData = await result.json();

    if (!resultData || resultData.length === 0) {
      commentsSectionElement.innerHTML = `
          <p>No comments found.</p>
          <button id="load-comments-btn" data-postId ='${postId}' class="btn btn-alt">Try Again</button>`;

      return;
    }

    const commentsListElement = _getCommentsListElement(resultData);

    commentsSectionElement.innerHTML = "";
    commentsSectionElement.appendChild(commentsListElement);
  } catch (error) {
    alert(
      "Error Sending Request. Try again later maybe? Or get a four-leaf-clover, it's considered lucky you see ;p"
    );
  }
}

async function saveComment(event) {
  event.preventDefault();

  const postId = saveCommentFormElement.dataset.postId;

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const text = formData.get("text");

  const comment = { title: title, text: text };

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    saveCommentFormElement.reset();

    if (!response.ok) {
      alert("Comment addition failed. Apologies _/_");
      return;
    }

    // Updating current comment list on page
    await loadComments();
  } catch (error) {
    alert(
      "Request sending failed. Try again later? Or play the dino game if you on chrome ;p"
    );
  }
}

loadCommentsBtnElement.addEventListener("click", loadComments);
saveCommentFormElement.addEventListener("submit", saveComment);
