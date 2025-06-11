document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#menu li");
  const main = document.querySelector("main");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("data-page");

      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      if (page === "home") {
        main.innerHTML = `
          <section id="create-post">
            <textarea id="post-text" placeholder="What's on your mind?"></textarea><br>
            <input type="file" id="media-upload" class="custom-file-input" accept="image/*,video/*" hidden>
            <label for="media-upload" class="upload-label">📎</label>
            <button onclick="addPost()">Post</button>
          </section>

          <section id="feed">
            <div class="post">
              <p>main content</p>
              <video controls width="30%">
                <source src="videos/facebook.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <br>
              <button onclick="likePost(this)" style="margin-left: 15px;">👍 Like <span>100322</span></button>
            </div>
          </section>
        `;
      } else if (page === "profile") {
  fetch("get_user_info.php")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch user info");
      return response.json();
    })
    .then(data => {
      main.innerHTML = `<h2>👤 Profile</h2><p><strong>${data.name}</strong>!</p>`;
    })
    .catch(error => {
      main.innerHTML = `<h2>👤 Profile</h2><p>Error loading profile info.</p>`;
      console.error(error);
    });
} else if (page === "about") {
        window.open("https://www.youtube.com/watch?v=L5NW4gskY6U&ab_channel=GeorgeTer-Nersesov", "_blank");
        return;
      } else if (page === "messages") {
        main.innerHTML = `<h2>📨 Messages</h2><p>You have no messages right now.</p>`;
      }else if (page === "log-out") {
      window.location.href = "../login.html";
    }
    });
  });

 
  const homeBtn = document.querySelector('[data-page="home"]');
  if (homeBtn) homeBtn.click();
});

function addPost() {
  const textarea = document.getElementById("post-text");
  const fileInput = document.getElementById("media-upload");
  const feed = document.getElementById("feed");

  if (!textarea || !feed) return;

  const text = textarea.value.trim();
  const file = fileInput.files[0];

  if (!text && !file) return;

  const post = document.createElement("div");
  post.className = "post";

  let mediaHTML = "";

  if (file) {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      mediaHTML = `<img src="${url}" alt="Uploaded Image" style="max-width: 100%; height: auto; margin-top: 10px;">`;
    } else if (file.type.startsWith("video/")) {
      mediaHTML = `
        <video controls style="max-width: 100%; height: auto; margin-top: 10px;">
          <source src="${url}" type="${file.type}">
          Your browser does not support the video tag.
        </video>
      `;
    }
  }

  post.innerHTML = `
    <p>${text}</p>
    ${mediaHTML}
    <button onclick="likePost(this)">👍 Like <span>0</span></button>
  `;

  feed.prepend(post);
  textarea.value = "";
  fileInput.value = "";
}

function likePost(btn) {
  const span = btn.querySelector("span");
  span.textContent = parseInt(span.textContent) + 1;
}

function mainPageLoad() {
  window.location.href = "main.html";
}

