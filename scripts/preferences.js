// get elements from html
const select = document.getElementById('breed-pref');
const form = document.getElementById('form');

// add all dog breeds from list to dropdown
function generateOptions(data) {
  const options = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join('');
  select.innerHTML = options;
}

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

  const selectedBreed = document.querySelectorAll('option');

  const allOptions = [];

  for (let i = 0; i < selectedBreed.length; i++) {
    const breedObject = selectedBreed[i];
    allOptions.push(breedObject);

    if (selectedBreed[i].hasAttribute('selected')) {
      selectedBreed[i].removeAttribute('selected');
    }
    
    if (select.value == selectedBreed[i].value) {
      selectedBreed[i].setAttribute('selected', true);
    }
  }

  console.log(allOptions);

  localStorage.setItem("selectedSex", document.querySelector('input[name="sex"]:checked').id);
  localStorage.setItem("breed", select.value);

  location.href = 'http://127.0.0.1:5174/matching.html';
})
