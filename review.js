const newMatches = document.querySelector('.new-matches');
const changePref = document.querySelector('.change-pref');

function findMatches() {
  location.href = 'http://127.0.0.1:5174/matching.html';
}

function changePreferences() {
  location.href = 'http://127.0.0.1:5174';
}

newMatches.addEventListener('click', findMatches);
changePref.addEventListener('click', changePreferences);
