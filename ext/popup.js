const mainSwitch = document.querySelector('.main-switch');
const switchLabelContainer = document.querySelector('.switch-label-container');
const switchContainer = document.querySelector('.switch-container');

const engageSwitch = (() => {
  //determine if pihole is enabled
  //const queryType = 'enable';
  //let endpoint = processRoute(queryType)
  //console.log(endpoint)

})();

const toggleSwitch = () => {
  switchContainer.classList.toggle('enabled');
  switchContainer.classList.toggle('disabled');

  let label = switchContainer.classList.contains('enabled') ? 'Enabled' : 'Disabled';
  switchLabelContainer.innerHTML = `<span>${label}</span>`;
};

mainSwitch.addEventListener('click', toggleSwitch);