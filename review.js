// get elements from html
const newMatches = document.querySelector('.new-matches');
const changePref = document.querySelector('.change-pref');
const showAllMatches = document.querySelector('.show-all-matches');
const showMatches = document.querySelector('.show-matches');

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

// function to display all matches and their info
function showMatch () {
  // loop through all objects in the array
  for (let i = 0; i < matchDetails.length; i++) {
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

    // get individual properties from each object in the array
    const properties = Object.values(matchDetails[i]);
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

// run function
showMatch();
