// All variables needed in the script
const fontSelector = document.querySelector('.select-box');
const toggleDarkModeBtn = document.querySelector('.toggle-btn');
const fontOptions = document.querySelector('.font-options');
const arrowDown = document.querySelector('.select-box svg');
const fontSelected = document.querySelector('.font-selected');
const searchForm = document.querySelector('.search-section form');
const errMsg = document.querySelector('.error-message');

// Function that handle dark mode option
const toggleDarkMode = function (e) {
  // Enable and disable dark mode
  if (e.target.checked) {
    document.querySelector('body').classList.add('dark-mode');
    document.querySelector('.moon path').classList.add('stroke-dark-mode');
  } else {
    document.querySelector('body').classList.remove('dark-mode');
    document.querySelector('.moon path').classList.remove('stroke-dark-mode');
  }
};

// Function that handle all clicks on the page
const handleClicks = function (e) {
  // console.log(e.target);
  // Handle fonts menu and the font that user selected
  handleFontSelect(e);

  // Submit the form when clicking the search icon
  handleSearchBtn(e);
};

// Function that handle fonts menu and the font that user selected
const handleFontSelect = function (e) {
  // Show and hide font select options
  if (
    e.target === fontSelected ||
    e.target === fontSelected.querySelector('div') ||
    e.target === arrowDown
  ) {
    fontOptions.classList.toggle('hidden');
  } else if (e.target !== fontOptions) {
    fontOptions.classList.add('hidden');
  }

  // Change font based on user selection
  if (
    e.target === fontOptions.querySelector('.sans') ||
    e.target === fontOptions.querySelector('.serif') ||
    e.target === fontOptions.querySelector('.mono')
  ) {
    fontSelected.querySelector('div').remove();
    fontSelected.append(e.target.cloneNode(true));
    document.querySelector('body').classList.remove('sans', 'serif', 'mono');
    document.querySelector('body').classList.toggle(`${e.target.classList[1]}`);
  }
};

// Function that submit the form when clicking the search icon
const handleSearchBtn = function (e) {
  if (e.target === document.querySelector('.search-section svg')) {
    fetchRenderApiData(e);
  }
};

// Fetch and render word data from api
const fetchRenderApiData = async function (e) {
  try {
    e.preventDefault();
    const word = searchForm.querySelector("input[type='text']").value;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const [data] = await response.json();
    console.log(data);

    const dataFetched = `
      <div class="data-fetched">
        <header class="data-header">
          <h1>${data.word}</h1>
          <p class="phonetic">${data.phonetic}</p>
          <svg
            class="sound-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 75 75"
          >
            <g fill="#A445ED" fill-rule="evenodd">
              <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
              <path d="M29 27v21l21-10.5z" />
            </g>
          </svg>
        </header>
        <div class="meaning-container">
          
        </div>
      </div>
    `;

    document
      .querySelector('.api-data')
      .insertAdjacentHTML('beforeend', dataFetched);

    data.meanings.forEach(meaning => {
      const meanings = `
        <div class="meaning-header">
          <h3>${meaning.partOfSpeech}</h3>
          <div class="meaning-line"></div>
        </div>
        <div class="meanings">
          <p class="meaning-word">Meaning</p>
        </div>
        <div class="synonyms">
          Synonyms <span>electronic keyboard</span>
        </div>
    `;
      document
        .querySelector('.meaning-container')
        .insertAdjacentHTML('beforeend', meanings);

      meaning.definitions.forEach(definition => {
        const definitions = `
      <div class="meaning">
        <p>
          ${definition.definition}
        </p>
      </div>
      `;
        document
          .querySelector(`.meanings`)
          .insertAdjacentHTML('beforeend', definitions);
      });
    });
  } catch (error) {
    console.log(error);
    errMsg.classList.remove('hidden');
  }
};

// Listen to click events on all page
document.addEventListener('click', handleClicks);

// Listen to toggle button event to launch dark mode or disable it
toggleDarkModeBtn.addEventListener('change', toggleDarkMode);

// Listen to form submit
searchForm.addEventListener('submit', fetchRenderApiData);
