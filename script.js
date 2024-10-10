// script.js

document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blogForm");
    const postsContainer = document.getElementById("postsContainer");
    const toggleTheme = document.getElementById("toggleTheme");
    const backButton = document.getElementById("backButton");
    const errorMessage = document.getElementById("errorMessage");

    // Handle form submission
    if (blogForm) {
        blogForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;

            if (!username || !title || !content) {
                errorMessage.textContent = "Please complete the form.";
                return;
            }

            // Store data in localStorage
            const blogPost = { username, title, content };
            const blogPosts =
                JSON.parse(localStorage.getItem("blogPosts")) || [];
            blogPosts.push(blogPost);
            localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

            // Redirect to posts page
            window.location.href = "posts.html";
        });
    }

    // Load posts on the posts page
    if (postsContainer) {
        const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
        if (blogPosts.length === 0) {
            postsContainer.innerHTML = "<p>No blog posts available.</p>";
        } else {
            blogPosts.forEach((post) => {
                const postElement = document.createElement("div");
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p><strong>${post.username}</strong></p>
                    <p>${post.content}</p>
                    <hr>
                `;
                postsContainer.appendChild(postElement);
            });
        }
    }

    // Toggle light/dark mode
    if (toggleTheme) {
        toggleTheme.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    }

    // Back button functionality
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});
