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
const matchDetailsString = localStorage.getItem('reviewAllMatchesString');
const matchDetails = JSON.parse(matchDetailsString);

// function getPreviousMatches() {
//   const combinedMatchesString = localStorage.getItem('storedMatchesString');
//   const combinedMatches = JSON.parse(combinedMatchesString);

//   allMatches.push(combinedMatches);
// }

let allMatches = [];

for (let i = 0; i < matchDetails.length; i++) {
  const matchObjects = matchDetails[i];
  allMatches.push(matchObjects);
}

// localStorage.setItem("storedMatchesString", allMatches);

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

// function to display all matches and their info
function showMatch (sortedArray) {
  // loop through all objects in the array
  for (let i = 0; i < sortedArray.length; i++) {
    // create all elements to display new match
    const displayMatch = document.createElement('div');
    const imgDiv = document.createElement('div');
    const pDiv = document.createElement('div');
    const dogImg = document.createElement('img');
    const breedInfo = document.createElement('p');
    const nameInfo = document.createElement('p');
    const sexInfo = document.createElement('p');
    const removeBtn = document.createElement('button');

    // add classes to divs
    displayMatch.classList.add('match-div');
    imgDiv.classList.add('dog-img');
    pDiv.classList.add('info-div');

    // add classes to p tags
    breedInfo.classList.add('info-breed');
    nameInfo.classList.add('info-name');
    sexInfo.classList.add('info-sex');

    // get individual properties from each object in the array
    const properties = Object.values(sortedArray[i]);
    const matchedBreed = properties[0];
    const matchedName = properties[1];
    const matchedSex = properties[2];
    const matchedImg = properties[3];

    // add src to img and append to divs
    dogImg.src = matchedImg;
    imgDiv.appendChild(dogImg);
    displayMatch.appendChild(imgDiv);

    // add text content to all p tags and append to divs
    breedInfo.textContent = matchedBreed;
    pDiv.appendChild(breedInfo);
    displayMatch.appendChild(pDiv);

    nameInfo.textContent = matchedName;
    pDiv.appendChild(nameInfo);
    displayMatch.appendChild(pDiv);

    sexInfo.textContent = matchedSex;
    pDiv.appendChild(sexInfo);
    displayMatch.appendChild(pDiv);

    // add text content to button and append to div
    removeBtn.textContent = 'Remove';
    displayMatch.appendChild(removeBtn);

    // append all divs to main div
    showAllMatches.appendChild(displayMatch);

    // if button clicked remove match
    removeBtn.addEventListener('click', () => {
      showAllMatches.removeChild(displayMatch);
    });
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
