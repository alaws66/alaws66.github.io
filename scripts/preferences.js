const host = `${location.protocol}//${location.host}`;

// get elements from html
const select = document.getElementById('breed-pref');
const form = document.getElementById('form');

let pickedBreed;

// add all dog breeds from list to dropdown
function generateOptions(data) {
  const options = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join('');
  select.innerHTML = options;

  const chosenBreed = localStorage.getItem('chosenBreedStored');
  // all selected attribute to option previously chosen
  for (let i = 0; i < select.length; i++) {
    if (chosenBreed == select[i].value) {
      select[i].setAttribute('selected', "");
    }
  }
}

// function to capitalize first letter of all dog breeds
function capitalizeBreeds(arr) {
  return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });
}

// fetch list of all dog breeds from API and run function
async function getListOption() {
  const breedsList = await fetch('https://dog.ceo/api/breeds/list');
  const json = await breedsList.json();
  generateOptions(capitalizeBreeds(json.message));
}
getListOption();

// when save button clicked save selected dropdown value
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // get all dropdown options
  const selectedBreed = document.querySelectorAll('option');

  // add selected attribute to selected option
  for (let i = 0; i < selectedBreed.length; i++) {
    if (select.value == selectedBreed[i].value) {
      selectedBreed[i].setAttribute('selected', "");
      pickedBreed = selectedBreed[i].value;
    }
  }

  // save strings to local storage
  localStorage.setItem("chosenBreedStored", pickedBreed);
  localStorage.setItem("selectedSex", document.querySelector('input[name="sex"]:checked').id);
  localStorage.setItem("breed", select.value);

  // redirect user to matching page
  location.href = `${host}/matching.html`;
})
