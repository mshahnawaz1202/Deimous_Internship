/* ===========================
   INTERN FEEDBACK FORM - script.js
=========================== */

// -- DOM references --
const form           = document.querySelector('.feedbackform');
const nameInput      = document.getElementById('name');
const emailInput     = document.getElementById('email');
const messageInput   = document.getElementById('message');
const charCounter    = document.getElementById('charCounter');
const loadingEl      = document.getElementById('loadingBanner');
const successEl      = document.getElementById('successBanner');
const apiErrorEl     = document.getElementById('errorBanner');
const postsContainer = document.getElementById('postsContainer');
const submitBtn      = document.getElementById('submitBtn');

// -- Static feedback data --
const feedbackData = [
    {
        id: 1,
        name: "Ali Hassan",
        email: "alihassan@company.com",
        category: "Suggestion",
        rating: 5,
        message: "The onboarding process was exceptionally smooth! I really appreciated the mentorship sessions in the first week. Maybe we could add more hands-on coding workshops in week two.",
        likes: 12,
        liked: false,
        date: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
        id: 2,
        name: "Mubashar",
        email: "mubasharweb@gmal.com",
        category: "Bug",
        rating: 3,
        message: "Found a minor bug in the development sandbox configuration script. The environment variables for the database port were mismatching in the Docker Compose file.",
        likes: 4,
        liked: false,
        date: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
        id: 3,
        name: "Haider",
        email: "haiderdev@gmal.com",
        category: "General",
        rating: 4,
        message: "Having a great time interning here! The team is super supportive, and the daily standups are very engaging. Looking forward to working on the production deployment next week.",
        likes: 8,
        liked: false,
        date: new Date(Date.now() - 3600000 * 48).toISOString()
    }
];

// -- Character counter --
messageInput.addEventListener('input', function() {
    var len = messageInput.value.length;
    charCounter.textContent = len + ' / 500';
    charCounter.style.color = len > 450 ? '#f87171' : 'rgba(255,255,255,0.28)';
});

// -- Helpers --
function showError(id, msg) {
    var el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function clearError(id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
}
function clearAllErrors() {
    ['nameError','emailError','categoryError','ratingError','messageError'].forEach(clearError);
}
function showLoading() {
    loadingEl.classList.add('show');
    successEl.style.display = 'none';
    apiErrorEl.style.display = 'none';
}
function hideLoading() {
    loadingEl.classList.remove('show');
}
function showSuccess(msg) {
    successEl.textContent  = msg;
    successEl.style.display = 'block';
}
function showApiError(msg) {
    apiErrorEl.textContent  = msg;
    apiErrorEl.style.display = 'block';
}
function hideBanners() {
    hideLoading();
    successEl.style.display  = 'none';
    apiErrorEl.style.display = 'none';
}

// -- Ripple effect --
submitBtn.addEventListener('click', function(e) {
    var rect   = submitBtn.getBoundingClientRect();
    var size   = Math.max(rect.width, rect.height);
    var x      = e.clientX - rect.left - size / 2;
    var y      = e.clientY - rect.top  - size / 2;
    var ripple = document.createElement('span');
    ripple.className   = 'ripple';
    ripple.style.width  = ripple.style.height = size + 'px';
    ripple.style.left   = x + 'px';
    ripple.style.top    = y + 'px';
    submitBtn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 700);
});

// -- Validation --
function validate() {
    var valid = true;
    clearAllErrors();

    if (!nameInput.value.trim()) {
        showError('nameError', 'Name is required.');
        nameInput.classList.add('input-error');
        valid = false;
    } else {
        nameInput.classList.remove('input-error');
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        showError('emailError', 'Email is required.');
        emailInput.classList.add('input-error');
        valid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address.');
        emailInput.classList.add('input-error');
        valid = false;
    } else {
        emailInput.classList.remove('input-error');
    }

    var selectedCategory = document.querySelector('input[name="category"]:checked');
    if (!selectedCategory) {
        showError('categoryError', 'Please select a category.');
        valid = false;
    }

    var selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        showError('ratingError', 'Please select a rating.');
        valid = false;
    }

    if (!messageInput.value.trim()) {
        showError('messageError', 'Feedback message is required.');
        messageInput.classList.add('input-error');
        valid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters.');
        messageInput.classList.add('input-error');
        valid = false;
    } else {
        messageInput.classList.remove('input-error');
    }

    return valid;
}

// -- Form submit --
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    hideBanners();
    if (!validate()) return;

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Submitting...';
    showLoading();

    var payload = {
        title:  nameInput.value.trim(),
        body:   messageInput.value.trim(),
        userId: 1,
    };

    try {
        var res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Server responded with ' + res.status);
        var data = await res.json();
        console.log('Submitted:', data);

        hideLoading();
        showSuccess('Thank you! Your feedback has been submitted successfully.');

        feedbackData.unshift({
            id:       feedbackData.length + 1,
            name:     nameInput.value.trim(),
            email:    emailInput.value.trim(),
            category: document.querySelector('input[name="category"]:checked').value,
            rating:   parseInt(document.querySelector('input[name="rating"]:checked').value),
            message:  messageInput.value.trim(),
            likes:    0,
            liked:    false,
            date:     new Date().toISOString()
        });

        form.reset();
        charCounter.textContent = '0 / 500';
        clearAllErrors();
        renderFeedback();

    } catch (err) {
        hideLoading();
        showApiError('Something went wrong: ' + err.message + '. Please try again.');
    } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Submit Feedback';
    }
});

// -- Live error clearing --
nameInput.addEventListener('input', function() {
    if (nameInput.value.trim()) { clearError('nameError'); nameInput.classList.remove('input-error'); }
});
emailInput.addEventListener('input', function() {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        clearError('emailError'); emailInput.classList.remove('input-error');
    }
});
messageInput.addEventListener('input', function() {
    if (messageInput.value.trim().length >= 10) {
        clearError('messageError'); messageInput.classList.remove('input-error');
    }
});
document.querySelectorAll('input[name="category"]').forEach(function(r) {
    r.addEventListener('change', function() { clearError('categoryError'); });
});
document.querySelectorAll('input[name="rating"]').forEach(function(r) {
    r.addEventListener('change', function() { clearError('ratingError'); });
});

// -- Utilities --
function formatRelativeTime(isoString) {
    var diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
    if (diff < 60)    return 'just now';
    if (diff < 3600)  return Math.floor(diff / 60) + ' min ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
}

function renderStars(rating) {
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        stars += '<span class="star' + (i <= rating ? ' filled' : '') + '">&#9733;</span>';
    }
    return stars;
}

function getInitials(name) {
    return name.split(' ').map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
}

function getCategoryClass(category) {
    var map = { General: 'cat-general', Bug: 'cat-bug', Suggestion: 'cat-suggestion' };
    return map[category] || 'cat-general';
}

// -- Render feedback cards --
function renderFeedback() {
    postsContainer.innerHTML = '';

    feedbackData.forEach(function(item, index) {
        var card = document.createElement('article');
        card.className = 'post-card fade-in';
        card.style.animationDelay = (index * 90) + 'ms';

        card.innerHTML =
            '<div class="post-card-header">' +
                '<div class="avatar">' + getInitials(item.name) + '</div>' +
                '<div class="post-meta">' +
                    '<p class="post-author">' + item.name + '</p>' +
                    '<span class="post-category ' + getCategoryClass(item.category) + '">' + item.category + '</span>' +
                '</div>' +
                '<span class="post-time">' + formatRelativeTime(item.date) + '</span>' +
            '</div>' +
            '<div class="post-stars">' + renderStars(item.rating) + '<span class="rating-text">' + item.rating + ' / 5</span></div>' +
            '<p class="post-message">' + item.message + '</p>' +
            '<div class="post-footer">' +
                '<button class="like-btn' + (item.liked ? ' liked' : '') + '" data-id="' + item.id + '" type="button">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">' +
                        '<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046z"/>' +
                    '</svg>' +
                    '<span class="like-count">' + item.likes + '</span>' +
                '</button>' +
                '<span class="post-id">ID #' + item.id + '</span>' +
            '</div>';

        postsContainer.appendChild(card);
    });

    // Like button events
    document.querySelectorAll('.like-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id   = parseInt(btn.getAttribute('data-id'));
            var item = feedbackData.find(function(f) { return f.id === id; });
            if (!item) return;
            item.liked  = !item.liked;
            item.likes += item.liked ? 1 : -1;
            btn.classList.toggle('liked', item.liked);
            btn.querySelector('.like-count').textContent = item.likes;
        });
    });
}

// -- Init --
renderFeedback();
