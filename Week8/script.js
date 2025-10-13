// ================= Data Expiration Setup =================
const EXPIRATION_DAYS = 0.003472; // data expires after 5 minutes

function getTimestamp() {
  return new Date().getTime();
}

function saveWithExpiration(key, value) {
  const data = { value: value, timestamp: getTimestamp() };
  localStorage.setItem(key, JSON.stringify(data));
}

function loadWithExpiration(key) {
  const dataString = localStorage.getItem(key);
  if (!dataString) return null;
  try {
    const data = JSON.parse(dataString);
    const age = getTimestamp() - data.timestamp;
    const maxAge = EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
    if (age > maxAge) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}

// ================= Navigation Toggle =================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('show');
});

navToggle?.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    navToggle.click();
  }
});

// ================= Roster Filters & Search =================
const searchInput = document.getElementById('searchInput');
const roleFilter = document.getElementById('roleFilter');
const teamFilter = document.getElementById('teamFilter');
const playerCards = document.querySelectorAll('.player-card');

function filterPlayers() {
  const searchValue = searchInput?.value.toLowerCase() || '';
  const roleValue = roleFilter?.value.toLowerCase() || '';
  const teamValue = teamFilter?.value.toLowerCase() || '';

  playerCards.forEach(card => {
    const playerName = card.querySelector('h2').textContent.toLowerCase();
    const role = card.getAttribute('data-role');
    const team = card.getAttribute('data-team');

    const show = playerName.includes(searchValue) &&
                 (!roleValue || role === roleValue) &&
                 (!teamValue || team === teamValue);

    card.style.display = show ? '' : 'none';
  });
}

// Attach filter event listeners with expiration & auto-refresh
if (searchInput) {
  searchInput.value = loadWithExpiration('searchValue') || '';
  searchInput.addEventListener('input', () => {
    filterPlayers();
    saveWithExpiration('searchValue', searchInput.value);
  });
}
if (roleFilter) {
  roleFilter.value = loadWithExpiration('roleValue') || '';
  roleFilter.addEventListener('change', () => {
    filterPlayers();
    saveWithExpiration('roleValue', roleFilter.value);
  });
}
if (teamFilter) {
  teamFilter.value = loadWithExpiration('teamValue') || '';
  teamFilter.addEventListener('change', () => {
    filterPlayers();
    saveWithExpiration('teamValue', teamFilter.value);
  });
}

// Initial filter pass
filterPlayers();

// ================= Follow Buttons =================
document.querySelectorAll('.follow-btn').forEach(button => {
  button.addEventListener('click', () => {
    const isFollowing = button.classList.toggle('following');
    button.textContent = isFollowing ? 'Following ✅' : 'Follow ⭐';
  });
});

// ================= Theme Toggle =================
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');

  // Apply saved theme
  const savedTheme = loadWithExpiration('userTheme') || 'light';
  document.body.classList.add(savedTheme);
  updateThemeToggleText(savedTheme);

  // ✅ Set initial aria-pressed for accessibility
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-pressed', savedTheme === 'dark');
  }

  // Toggle theme with timestamp refresh
  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.classList.replace(currentTheme, newTheme);
    saveWithExpiration('userTheme', newTheme);
    updateThemeToggleText(newTheme);

    // ✅ Update aria-pressed state
    themeToggleBtn.setAttribute('aria-pressed', newTheme === 'dark');
  });

  function updateThemeToggleText(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }
  }

  // Clear all stored data on double-click
  themeToggleBtn?.addEventListener('dblclick', () => {
    localStorage.removeItem('userTheme');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('roleValue');
    localStorage.removeItem('teamValue');
    location.reload();
  });
});