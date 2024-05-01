// All variables needed in the script
const fontSelector = document.querySelector('.select-box');
const toggleDarkModeBtn = document.querySelector('.toggle-btn');
const fontOptions = document.querySelector('.font-options');
const arrowDown = document.querySelector('.select-box svg');
const fontSelected = document.querySelector('.font-selected');
const searchForm = document.querySelector('.search-section form');
const errMsg = document.querySelector('.error-message');
let audio;

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

  // Play sound when pressind soun
  if (e.target.closest('.sound-icon')) {
    audio.play();
  }
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
    if (!searchForm.querySelector("input[type='text']").value) {
      searchForm.closest('.search-section').classList.add('not-valid');
      return;
    }

    if (searchForm.querySelector("input[type='text']").value) {
      searchForm.closest('.search-section').classList.remove('not-valid');
    }
    const word = searchForm.querySelector("input[type='text']").value;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const [data] = await response.json();

    if (document.querySelector('.data-fetched')) {
      document.querySelector('.data-fetched').remove();
    }
    errMsg.classList.add('hidden');
    const dataFetched = `
      <div class="data-fetched">
        <header class="data-header">
          <h1>${data.word}</h1>
          <p class="phonetic">${
            data.phonetics[data.phonetics.length - 1].text
          }</p>
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
        <div class="source"><p>Source</p><a href="${data.sourceUrls}">${
      data.sourceUrls
    }</a><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg></div>
      </div>
    `;

    document
      .querySelector('.api-data')
      .insertAdjacentHTML('beforeend', dataFetched);

    audio = new Audio(`${data.phonetics[data.phonetics.length - 1].audio}`);

    data.meanings.forEach((meaning, meaningIndex) => {
      const meanings = `
        <div class="meaning meaning-${meaningIndex}">
          <div class="meaning-header">
            <h3>${meaning.partOfSpeech}</h3>
            <div class="meaning-line"></div>
          </div>
          <div class="meanings meanings-${meaningIndex}">
            <p class="meaning-word">Meaning</p>
            <div class="definitions">
                    
            </div>
          </div>
          
        </div>
    `;

      const synonyms = `
        <div class="synonyms">
          Synonyms <span>${meaning.synonyms}</span>
        </div>`;

      document
        .querySelector('.meaning-container')
        .insertAdjacentHTML('beforeend', meanings);

      if (meaning.synonyms.length > 0) {
        document
          .querySelector(`.meaning-${meaningIndex}`)
          .insertAdjacentHTML('beforeend', synonyms);
      }

      meaning.definitions.forEach((definition, definitionIndex) => {
        const definitions = `
          <div class="definition definition-${definitionIndex}">
            <p>
              ${definition.definition}
            </p>
          </div>
      `;

        const example = `<div class="example">“${definition.example}”</div>`;
        document
          .querySelector(`.meanings-${meaningIndex}`)
          .insertAdjacentHTML('beforeend', definitions);

        if (definition.example) {
          document
            .querySelector(
              `.meanings-${meaningIndex} .definition-${definitionIndex}`
            )
            .insertAdjacentHTML('beforeend', example);
        }
      });
    });
  } catch (error) {
    console.log(error);
    if (document.querySelector('.data-fetched')) {
      document.querySelector('.data-fetched').remove();
    }
    errMsg.classList.remove('hidden');
  }
};

// Listen to click events on all page
document.addEventListener('click', handleClicks);

// Listen to toggle button event to launch dark mode or disable it
toggleDarkModeBtn.addEventListener('change', toggleDarkMode);

// Listen to form submit
searchForm.addEventListener('submit', fetchRenderApiData);
