// get elements from html
const searchBreed = document.getElementById('search-breed');
const searchName = document.getElementById('search-name');
const searchSex = document.getElementById('search-sex');

const sortBy = document.querySelector('.sort-by');
const newMatches = document.querySelector('.new-matches');
const changePref = document.querySelector('.change-pref');
const showAllMatches = document.querySelector('.show-all-matches');

// functions for changing pages
function findMatches() {
  location.href = 'http://127.0.0.1:5174/matching.html';
}

function changePreferences() {
  location.href = 'http://127.0.0.1:5174';
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
function showMatch (sortedArray) {

  for (let i = 0; i < sortedArray.length; i++) {
    const displayMatch = document.createElement('div');
    displayMatch.id = sortedArray[i].dogId;
    displayMatch.classList.add('match-div');
  
    displayMatch.innerHTML = `
          <div class="dog-img">
            <img src="${sortedArray[i].matchedImg}"/>
          </div>
          <div class="info-div">
            <p class="info-breed">${sortedArray[i].matchedBreed}</p>
            <p class="info-name">${sortedArray[i].matchedName}</p>
            <p class="info-sex">${sortedArray[i].matchedSex}</p>
          </div>
          <button onclick="handleRemove(${sortedArray[i].dogId})">Remove</button>  
      `
    showAllMatches.appendChild(displayMatch);
  }
}

// run function at least once to show matches when page loads
showMatch(allMatches);

// sorting divs from dropdown user selection
sortBy.addEventListener('change', () => {
  // get all current matches divs
  const matchesDivs = showAllMatches.querySelectorAll('.match-div');

  // create copy of array
  let allMatchesCopy = [...allMatches];

  // removes all current divs
  matchesDivs.forEach(match => {
    match.remove();
  });
  
  if (sortBy.value == 'oldest') {
    showMatch(allMatches);

  } else if (sortBy.value == 'newest') {
    // run function to sort array
    let sortedNames = allMatchesCopy.reverse();
    showMatch(sortedNames);

  } else if (sortBy.value == 'alphabetical-names') {
    // run function to sort array
    let sortedNames = allMatchesCopy.sort(compareNames);
    showMatch(sortedNames);

  } else if (sortBy.value == 'reverse-names') {
    // run function to sort array
    let sortedNames = allMatchesCopy.sort(reverseCompareNames);
    showMatch(sortedNames);

  } else if (sortBy.value == 'alphabetical-breeds') {
    // run function to sort array
    let sortedNames = allMatchesCopy.sort(compareBreeds);
    showMatch(sortedNames);
    
  } else if (sortBy.value == 'reverse-breeds') {
    // run function to sort array
    let sortedNames = allMatchesCopy.sort(reverseCompareBreeds);
    showMatch(sortedNames);
  }
});

searchBreed.addEventListener('keyup', (e) => {
  let currentValue = searchBreed.value.toLowerCase();
  let dogsBreed = document.querySelectorAll('.info-breed');

  for (let i = 0; i < dogsBreed.length; i++) {
    const allBreedInfo = dogsBreed[i].textContent.toLowerCase();
    if (allBreedInfo.includes(currentValue)) {
      dogsBreed[i].parentNode.parentNode.style.display = 'block';
    } else {
      dogsBreed[i].parentNode.parentNode.style.display = 'none';
    }
  }
});

searchName.addEventListener('keyup', (e) => {
  let currentValue = searchName.value.toLowerCase();
  let dogsName = document.querySelectorAll('.info-name');

  for (let i = 0; i < dogsName.length; i++) {
    const allNameInfo = dogsName[i].textContent.toLowerCase();
    if (allNameInfo.includes(currentValue)) {
      dogsName[i].parentNode.parentNode.style.display = 'block';
    } else {
      dogsName[i].parentNode.parentNode.style.display = 'none';
    }
  }
});
