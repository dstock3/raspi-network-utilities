const form = document.querySelector('form');
const domainInput = document.querySelector('#domainInput');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const domain = domainInput.value;

  chrome.runtime.sendMessage({ type: 'whitelist', domain });

  window.close();
});
