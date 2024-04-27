// All variables needed in the script
const fontSelector = document.querySelector('.select-box');
const toggleDarkModeBtn = document.querySelector('.toggle-btn');
const fontOptions = document.querySelector('.font-options');
const arrowDown = document.querySelector('.select-box svg');
const fontSelected = document.querySelector('.font-selected');

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

// Listen to click events on all page
document.addEventListener('click', handleClicks);

// Listen to toggle button event to launch dark mode or disable it
toggleDarkModeBtn.addEventListener('change', toggleDarkMode);
