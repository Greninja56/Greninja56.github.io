// ================= Navigation Toggle =================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('show');
});

navToggle.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    navToggle.click();
  }
});

// ================= ROSTER FILTERS & SEARCH =================
const searchInput = document.getElementById('searchInput');
const roleFilter = document.getElementById('roleFilter');
const teamFilter = document.getElementById('teamFilter');
const playerCards = document.querySelectorAll('.player-card');

function filterPlayers() {
  const searchValue = searchInput.value.toLowerCase();
  const roleValue = roleFilter.value.toLowerCase();
  const teamValue = teamFilter.value.toLowerCase();

  playerCards.forEach(card => {
    const playerName = card.querySelector('h2').textContent.toLowerCase();
    const role = card.getAttribute('data-role');
    const team = card.getAttribute('data-team');

    const matchesSearch = playerName.includes(searchValue);
    const matchesRole = !roleValue || role === roleValue;
    const matchesTeam = !teamValue || team === teamValue;

    if (matchesSearch && matchesRole && matchesTeam) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

if (searchInput) searchInput.addEventListener('input', filterPlayers);
if (roleFilter) roleFilter.addEventListener('change', filterPlayers);
if (teamFilter) teamFilter.addEventListener('change', filterPlayers);

// ================= FOLLOW BUTTONS =================
const followButtons = document.querySelectorAll('.follow-btn');

followButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isFollowing = button.classList.toggle('following');
    button.textContent = isFollowing ? 'Following ✅' : 'Follow ⭐';
  });
});

// ================= THEME PREFERENCE =================
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('userTheme') || 'light';
  document.body.classList.add(savedTheme);
  updateThemeToggleText(savedTheme);

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.body.classList.remove(currentTheme);
      document.body.classList.add(newTheme);

      localStorage.setItem('userTheme', newTheme);
      updateThemeToggleText(newTheme);
    });
  }

  function updateThemeToggleText(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }
  }
});
