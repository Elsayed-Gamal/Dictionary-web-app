const fontSelector = document.querySelector('.select-box');
const toggleDarkModBtn = document.querySelector('.toggle-btn');

fontSelector.addEventListener('click', function () {
  document.querySelector('.font-options').classList.toggle('hidden');
});

toggleDarkModBtn.addEventListener('change', function (e) {
  if (e.target.checked) {
    document.querySelector('body').classList.add('dark-mode');
    document.querySelector('.moon path').classList.add('stroke-dark-mode');
  } else {
    document.querySelector('body').classList.remove('dark-mode');
    document.querySelector('.moon path').classList.remove('stroke-dark-mode');
  }
});
