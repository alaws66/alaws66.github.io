// lists of random dog names
const femaleNames = [
  'Luna',
  'Bella',
  'Lola',
  'Poppy',
  'Coco',
  'Ruby',
  'Rosie',
  'Daisy',
  'Molly',
  'Willow',
  'Nala',
  'Bonnie',
  'Lily',
  'Roxy',
  'Millie',
  'Tilly',
  'Winnie',
  'Honey',
  'Maggie',
  'Skye',
  'Penny',
  'Dolly',
  'Bailey',
  'Pepper',
  'Olive',
  'Lucy',
  'Betty',
  'Belle',
  'Lulu',
  'Peggy',
  'Minnie',
  'Cookie',
  'Stella',
  'Holly',
  'Phoebe',
  'Amber',
  'Frankie',
  'Cleo',
  'Jess',
  'Sky',
  'Ellie',
  'Ivy',
  'Nelly',
  'Milly',
  'Ella',
  'Darcy',
  'Nova',
  'Beau',
  'Freya',
  'Lady',
  'Pixie',
  'Sophie',
  'Kiki',
  'Maddie',
  'Elsa',
  'Blu',
  'Dotty',
  'Boo',
  'Tia',
  'Dora',
  'Polly',
  'Wilma',
  'Daphne',
  'Peanut',
  'Piper',
  'Sandy',
  'Storm',
  'Martha',
  'Scout',
  'Heidi',
  'Roo',
  'Leia',
  'Zoe',
  'Biscuit',
  'Chloe',
  'Angel',
  'Charlie',
  'Maple',
  'Marley',
  'Harper',
  'Princess',
  'Peppa',
  'Nina',
  'Dixie',
  'Hazel',
  'Flo',
  'Lilo',
  'Riley',
  'Nancy',
  'Trixie',
  'Star',
  'Teddy',
  'Hattie',
  'Bear',
  'Gigi',
  'Toffee',
  'Blossom',
  'Red',
  'Kira',
  'Ava',
];

const maleNames = [
  'Milo',
  'Teddy',
  'Max',
  'Buddy',
  'Alfie',
  'Charlie',
  'Oscar',
  'Archie',
  'Bailey',
  'Hugo',
  'Bruno',
  'Barney',
  'Loki',
  'Bear',
  'Monty',
  'Toby',
  'Murphy',
  'Leo',
  'Rocky',
  'Jasper',
  'Marley',
  'Frank',
  'Jack',
  'Blu',
  'Bobby',
  'Otis',
  'Rocco',
  'Chester',
  'Simba',
  'Buster',
  'Winston',
  'Pablo',
  'Billy',
  'Bruce',
  'Henry',
  'Woody',
  'Ozzy',
  'Rex',
  'Louie',
  'Rolo',
  'Frankie',
  'Otto',
  'Rufus',
  'Ronnie',
  'Louis',
  'Harry',
  'Gizmo',
  'Gus',
  'Beau',
  'Lenny',
  'Duke',
  'Finn',
  'Paddy',
  'Tyson',
  'Ernie',
  'Rio',
  'Baxter',
  'Kobe',
  'Coco',
  'Hunter',
  'Sam',
  'Basil',
  'Hector',
  'Diesel',
  'Percy',
  'Boris',
  'Dylan',
  'Obi',
  'Prince',
  'Riley',
  'Jax',
  'Chewy',
  'Rusty',
  'Lucky',
  'Joey',
  'Ben',
  'Casper',
  'Bob',
  'Rudy',
  'Buzz',
  'Jake',
  'Merlin',
  'Apollo',
  'Jackson',
  'Scooby',
  'Ace',
  'Elvis',
  'Albert',
  'Chico',
  'Sunny',
  'Peanut',
  'Thor',
  'Hank',
  'Cosco',
  'Oreo',
  'Eric',
  'Moose',
  'Fred',
  'Mac',
  'Pluto',
];

// list of sexes
const sexes = ['male', 'female'];

// get elements from html
const matches = document.querySelector('.matches-img');
const dogInfo = document.querySelector('.dog-info');
const crossBtn = document.querySelector('.cross');
const heartBtn = document.querySelector('.heart');
const reviewMatch = document.querySelector('.review-matches');
const changePref = document.querySelector('.change-pref');

// get paragraph elements from html
const name = document.querySelector('.name');
const breedShow = document.querySelector('.breed');
const sex = document.querySelector('.sex');

// function for event listener to change page when button clicked
function changePreferences() {
  location.href = 'http://127.0.0.1:5174';
}

changePref.addEventListener('click', changePreferences);

// generate random dog image based off of breed selected by user
function fetchBreedImg() {
  // get user input from local storage
  const selectedSex = localStorage.getItem('selectedSex');
  const selectedBreed = localStorage.getItem('breed');

  const img = matches.querySelector('img');

  // fetch data from API to get random dog image
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
  .then(response => response.json())
  .then(data => generateImage(data.message))

  // put random image into html
  function generateImage(data) {
  const html = `
    <img src='${data}' alt='${selectedBreed}' id='dog-img'>
  `;
  matches.innerHTML = html;
  }

  // get random sex
  const randomSex = sexes[Math.floor(Math.random()*sexes.length)];

  // get random name based off of user input
  const randomFemName = femaleNames[Math.floor(Math.random()*femaleNames.length)];
  const randomMaleName = maleNames[Math.floor(Math.random()*maleNames.length)];

  // get random name from specific list depending on user selection
  if (selectedSex == 'female') {
    name.textContent = `Name: ${randomFemName}`;
    dogInfo.appendChild(name);
  } else if (selectedSex == 'male') {
    name.textContent = `Name: ${randomMaleName}`;
    dogInfo.appendChild(name);
  }

  breedShow.textContent = `Breed: ${selectedBreed}`

  // display specific sex to match user selection and name to match random sex
  if (selectedSex == 'male') {
    sex.textContent = 'Sex: male'
    dogInfo.appendChild(sex);
  } else if (selectedSex == 'female') {
    sex.textContent = 'Sex: female'
    dogInfo.appendChild(sex);
  } else if (selectedSex == 'both' && randomSex == 'female') {
    name.textContent = `Name: ${randomFemName}`;
    dogInfo.appendChild(name);
    sex.textContent = `Sex: ${randomSex}`;
    dogInfo.appendChild(sex);
  } else if (selectedSex == 'both' && randomSex == 'male') {
    name.textContent = `Name: ${randomMaleName}`;
    dogInfo.appendChild(name);
    sex.textContent = `Sex: ${randomSex}`;
    dogInfo.appendChild(sex);
  }
}

// run function once before button click
fetchBreedImg();

// run function for new image when button clicked
matches.addEventListener('change', fetchBreedImg);

crossBtn.addEventListener('click', () => {
  fetchBreedImg();
});

// empty array
let allMatches = [];

heartBtn.addEventListener('click', () => {
  // add all match info into local storage
  localStorage.setItem("likedBreed", breedShow.textContent);
  localStorage.setItem("likedName", name.textContent);
  localStorage.setItem("likedSex", sex.textContent);
  localStorage.setItem('likedImgSrc', document.getElementById('dog-img').src);

  // get match info from storage
  const matchedBreed = localStorage.getItem('likedBreed');
  const matchedName = localStorage.getItem('likedName');
  const matchedSex = localStorage.getItem('likedSex');
  const matchedImg = localStorage.getItem('likedImgSrc');

  // add all match info into an object and push to empty array
  let likedMatch = {matchedBreed, matchedName, matchedSex, matchedImg};
  allMatches.push(likedMatch);

  // run function
  fetchBreedImg();
});

// function to change page when button clicked and store allMatches
function reviewMatches() {
  const allMatchesString = JSON.stringify(allMatches);
  localStorage.setItem("reviewAllMatchesString", allMatchesString);

  location.href = 'http://127.0.0.1:5174/review.html';
}

// run function when button clicked
reviewMatch.addEventListener('click', reviewMatches);
