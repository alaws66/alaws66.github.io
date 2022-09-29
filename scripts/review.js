const host = `${location.protocol}//${location.host}`;

// get elements from html
const searchBreed = document.getElementById('search-breed');
const searchName = document.getElementById('search-name');

const sortBy = document.querySelector('.sort-by');
const newMatches = document.querySelector('.new-matches');
const changePref = document.querySelector('.change-pref');
const showAllMatches = document.querySelector('.show-all-matches');

let selectedSort = '';

// functions for changing pages
function findMatches() {
  location.href = `${host}/matching.html`;
}

function changePreferences() {
  location.href = host;
}

// run function when button clicked
newMatches.addEventListener('click', findMatches);
changePref.addEventListener('click', changePreferences);

// get string from storage and convert back to an array
let matchDetailsString = localStorage.getItem('reviewAllMatchesString');
let matchDetails = JSON.parse(matchDetailsString);

// empty array
let allMatches = [];

// push all objects from array into empty array
for (let i = 0; i < matchDetails.length; i++) {
  const matchObjects = matchDetails[i];
  allMatches.push(matchObjects);
}

// function to sort names alphabetically
function compareNames(a, b) {
  if (a.matchedName < b.matchedName){
    return -1;
  }
  if (a.matchedName > b.matchedName){
    return 1;
  }
  return 0;
}

// function to sort names reverse alphabetically
function reverseCompareNames(a, b) {
  if (a.matchedName < b.matchedName){
    return 1;
  }
  if (a.matchedName > b.matchedName){
    return -1;
  }
  return 0;
}

// function to sort breeds alphabetically
function compareBreeds(a, b) {
  if (a.matchedBreed < b.matchedBreed){
    return -1;
  }
  if (a.matchedBreed > b.matchedBreed){
    return 1;
  }
  return 0;
}

// function to sort breeds reverse alphabetically
function reverseCompareBreeds(a, b) {
  if (a.matchedBreed < b.matchedBreed){
    return 1;
  }
  if (a.matchedBreed > b.matchedBreed){
    return -1;
  }
  return 0;
}

// function to remove match
function handleRemove(id) {
  let matchDetails = JSON.parse(matchDetailsString);

  let filteredList = matchDetails.filter(function(item) {
    return item.dogId != id
  });

  matchDetails = filteredList;
  matchDetailsString = JSON.stringify(matchDetails);
  localStorage.setItem("reviewAllMatchesString", matchDetailsString);
  
  document.getElementById(id).remove();

  allMatches = [];

  // push all objects from array into empty array
  for (let i = 0; i < matchDetails.length; i++) {
    const matchObjects = matchDetails[i];
    allMatches.push(matchObjects);
  }
}

// function to display all matches and their info
function showMatch (sortType, breed, name) {
  let allMatchesCopy = [...allMatches];

  // Filter for breed
  allMatchesCopy = allMatchesCopy.filter((el) => el.matchedBreed.toLowerCase().includes(breed.toLowerCase()));

  // Filter for name
  allMatchesCopy = allMatchesCopy.filter((el) => el.matchedName.toLowerCase().includes(name.toLowerCase()));
  
  let sortedNames = () => {
    switch (sortType) {
      case 'newest':
        return allMatchesCopy.reverse();
      case 'alphabetical-names':
        return allMatchesCopy.sort(compareNames);
      case 'reverse-names':
        return allMatchesCopy.sort(reverseCompareNames);
      case 'alphabetical-breeds':
        return allMatchesCopy.sort(compareBreeds);
      case 'reverse-breeds':
        return allMatchesCopy.sort(reverseCompareBreeds);
      default:
        return allMatchesCopy;
    }
  }

  allMatchesCopy = sortedNames();

  showAllMatches.innerHTML = '';
  
  for (let i = 0; i < allMatchesCopy.length; i++) {
    const displayMatch = document.createElement('div');
    displayMatch.id = allMatchesCopy[i].dogId;
    displayMatch.classList.add('match-div');
  
    displayMatch.innerHTML = `
          <div class="dog-img">
            <img src="${allMatchesCopy[i].matchedImg}"/>
          </div>
          <div class="info-div">
            <p class="info-breed">Breed: ${allMatchesCopy[i].matchedBreed}</p>
            <p class="info-name">Name: ${allMatchesCopy[i].matchedName}</p>
            <p class="info-sex">Sex: ${allMatchesCopy[i].matchedSex}</p>
          </div>
          <button onclick="handleRemove(${allMatchesCopy[i].dogId})">Remove</button>  
      `
    showAllMatches.appendChild(displayMatch);
  }
}

// run function at least once to show matches when page loads
showMatch(selectedSort, searchBreed.value.toLowerCase(), searchName.value.toLowerCase());

// sorting divs from dropdown user selection
sortBy.addEventListener('change', (e) => {
  selectedSort = e.target.value;
  showMatch(selectedSort, searchBreed.value.toLowerCase(), searchName.value.toLowerCase());
});

searchBreed.addEventListener('keyup', (e) => {
  showMatch(selectedSort, searchBreed.value.toLowerCase(), searchName.value.toLowerCase());
});

searchName.addEventListener('keyup', (e) => {
  showMatch(selectedSort, searchBreed.value.toLowerCase(), searchName.value.toLowerCase());
});
