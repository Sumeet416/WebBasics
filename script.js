document.addEventListener("DOMContentLoaded", () => {
  const commentsGrid = document.getElementById("recent-comments");
  const commentForm = document.getElementById("comment-form");

  // Store all comments in memory
  let allComments = [];

  // Function to render the latest 3 comments
  function renderLatestComments() {
    commentsGrid.innerHTML = "";
    // Get the last 3 comments (newest) and reverse them so the very latest is first
    const latestComments = allComments.slice(-3).reverse();
    
    latestComments.forEach(comment => {
      const initial = comment.name ? comment.name.charAt(0).toUpperCase() : "U";
      const dateObj = new Date(comment.date);
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);

      const commentHTML = `
        <div class="comment-card" style="animation: fadeIn 0.5s ease-out;">
          <div class="comment-meta">
            <div class="comment-avatar">${initial}</div>
            <div class="comment-author-info">
              <span class="comment-author-name">${comment.name}</span>
              <span class="comment-date">${formattedDate}</span>
            </div>
          </div>
          <p class="comment-body">${comment.text}</p>
        </div>
      `;
      commentsGrid.insertAdjacentHTML("beforeend", commentHTML);
    });
  }

  // Fetch initial comments directly from comment.json
  // Added a cache-busting query parameter so it always grabs the newest data
  fetch("comment.json?t=" + Date.now())
    .then(response => response.json())
    .then(data => {
      allComments = data || [];
      renderLatestComments();
    })
    .catch(error => console.error("Error loading comments:", error));

  // Handle Form Submission
  if (commentForm) {
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("comment-name").value;
      const textInput = document.getElementById("comment-text").value;

      // Construct a new comment object
      const newComment = {
        id: Date.now(),
        name: nameInput,
        text: textInput,
        date: new Date().toISOString()
      };

      try {
        // Send data to our Node.js server
        const response = await fetch("/add-comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newComment)
        });

        if (!response.ok) throw new Error("Server not running");
        
        // If successful, push strictly to our array
        allComments.push(newComment);
      } catch (err) {
        console.warn("Backend server not running. Adding comment superficially to the UI.", err);
        // Fallback for static frontend-only view
        allComments.push(newComment);
      }

      // Re-render the grid (automatically extracts the 3 newest items)
      renderLatestComments();

      // Reset form and give feedback
      commentForm.reset();
      const btn = commentForm.querySelector("button");
      const originalText = btn.innerText;
      btn.innerText = "Posted!";
      btn.style.backgroundColor = "#4caf50";
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
      }, 2000);
    });
  }
});
