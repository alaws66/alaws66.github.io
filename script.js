// get element from html
const select = document.getElementById('breedPref');
const form = document.getElementById('form');

// add all dog breeds from list to dropdown
function generateOptions(data) {
  const options = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join('');
  select.innerHTML = options;
}

// fetch list of all dog breeds from API and run function
async function getListOption() {
  const breedsList = await fetch('https://dog.ceo/api/breeds/list');
  const json = await breedsList.json();
  generateOptions(json.message);
}
getListOption();

// when save button clicked save selected dropdown value
form.addEventListener('submit', (e) => {
  e.preventDefault();

  localStorage.setItem("selectedSex", document.querySelector('input[name="sex"]:checked').id);

  localStorage.setItem("breed", select.value);
})
