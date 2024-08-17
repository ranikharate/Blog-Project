
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postList = document.getElementById('postList');

   // Handle post deletion
   function deletePost(event) {
        event.target.closest('.post').remove();
    }

    // Handle liking a post
     function likePost(event) {
        const likeCountSpan = event.target.previousElementSibling;
         let likes = parseInt(likeCountSpan.textContent) || 0;
        likeCountSpan.textContent = ++likes;
         }

    // Handle commenting on a post
    function commentOnPost(event) {
         const postElement = event.target.closest('.post');
        const commentInput = postElement.querySelector('input');
      const commentText = commentInput.value.trim();
         if (!commentText) return;

        const commentList = postElement.querySelector('ul');
      const newComment = document.createElement('li');
         newComment.textContent = commentText;
         commentList.appendChild(newComment);
        commentInput.value = '';
    }

     // Render posts
    function renderPosts(posts) {
         postList.innerHTML = '';
        posts.forEach(post => {
                        const postElement = document.createElement('div');
             postElement.className = 'post';
             postElement.dataset.id = post.id;
             postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                 <small>Category: ${post.category}</small>
                <p>Likes: <span class="like-count">${post.likes}</span> <button class="like-button">Like</button></p>
                <div>
                    <input type="text" placeholder="Add a comment...">
                     <button class="comment-button">Comment</button>
              </div>
                 <ul>
                     ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
                 </ul>
                <button class="delete-post">Delete</button>
             `;

             postElement.querySelector('.delete-post').addEventListener('click', deletePost);
             postElement.querySelector('.like-button').addEventListener('click', likePost);
            postElement.querySelector('.comment-button').addEventListener('click', commentOnPost);

          postList.appendChild(postElement);
        });
    }

    // Handle form submission
         postForm.addEventListener('submit', e => {
        e.preventDefault();
                const newPost = {
             id: Date.now(),
             title: document.getElementById('postTitle').value,
            content: document.getElementById('postContent').value,
            category: document.getElementById('postCategory').value,
             likes: 0,
           comments: []
         };
         const existingPosts = Array.from(postList.querySelectorAll('.post')).map(postElement => ({
             id: parseInt(postElement.dataset.id),
             title: postElement.querySelector('h3').textContent,
             content: postElement.querySelector('p').textContent,
             category: postElement.querySelector('small').textContent.replace('Category: ', ''),
            likes: parseInt(postElement.querySelector('.like-count').textContent),
            comments: Array.from(postElement.querySelectorAll('ul li')).map(li => li.textContent)
        }));
         existingPosts.push(newPost);
        renderPosts(existingPosts);
         postForm.reset();
     });

     // Initialize with existing posts (if any)
     const existingPosts = Array.from(postList.querySelectorAll('.post')).map(postElement => ({
         id: parseInt(postElement.dataset.id),
         title: postElement.querySelector('h3').textContent,
        content: postElement.querySelector('p').textContent,
         category: postElement.querySelector('small').textContent.replace('Category: ', ''),
         likes: parseInt(postElement.querySelector('.like-count').textContent),
         comments: Array.from(postElement.querySelectorAll('ul li')).map(li => li.textContent)
     }));
    renderPosts(existingPosts);
    });




