(function(){
  const selectedDays = [];
  const selectedDatePicker = [];
  let selectedTabId = null;
  const tabValues = {
    'days-of-the-week': () => {
      return getSelectedDays();
    },
    'date-picker': () => {
      return getSelectedDatePicker();
    },
    'user-input': ''
  };

  const resultInput = document.getElementById('result');

  const getSelectedDays = () => {
    return selectedDays.join(',');
  }

  const getSelectedDatePicker = () => {
    return selectedDatePicker.join('/');
  }

  // selects the given content while hiding the others
  const selectTab = (id) => {
    const allContent = document.getElementsByClassName('tab-content');
    for(let i = 0; i < allContent.length; i++){
      if(allContent[i].getAttribute('id') === id) {
        allContent[i].classList.remove('hidden')
        allContent[i].classList.add('visible');
        selectedTabId = id;
      } else {
        allContent[i].classList.remove('visible')
        allContent[i].classList.add('hidden');
      }
    }
  }

  // populates the date picker tab with values
  const populateDatePicker = (id, start, end, selected) => {
    const el = document.getElementById(id);
    for(let i = start; i <= end; i++){
      const option = document.createElement('option');
      option.value = i;
      option.innerText = i;
      if(i === selected){
        option.setAttribute('selected', selected);
      }
      el.appendChild(option);
    }
  }

  const attachTabEventListener = () => {
    // attach on click handler to tab header
    const tabHeader = document.getElementById('header');
    tabHeader.addEventListener('click', (e) => {
      resultInput.setAttribute('value', '');
      selectTab(e.target.dataset['child']);
    });
  }

  const attachCheckboxEventListeners = () => {
    // attach event listener to checkboxes
    const daysOfTheWeek = document.getElementById('days-of-the-week');
    daysOfTheWeek.addEventListener('click', (e) => {
      if(e.target.checked) {
        selectedDays.push(e.target.value);
      } else {
        const index = selectedDays.indexOf(e.target.value);
        selectedDays.splice(index, 1);
      }
    });
  }

  const attachSelectEventListeners = () => {
    // attach event listener to date-picker
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.addEventListener('change', (e) => {
        const target = e.target;
        if(e.target.getAttribute('id') === 'date-input'){
          selectedDatePicker[0] = e.target.value;
        }
        if(e.target.getAttribute('id') === 'month-input'){
          selectedDatePicker[1] = e.target.value;
        }
        if(e.target.getAttribute('id') === 'year-input'){
          selectedDatePicker[2] = e.target.value;
        }
      });
    });
  }

  const attachFormSubmitEventListeners = () => {
    // attach submit form
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = tabValues[selectedTabId]();
      resultInput.setAttribute('value', value);
    });
  }

  // initialise the flow
  const init = () => {
    // select first tab
    selectTab("days-of-the-week");
    attachTabEventListener();
    attachCheckboxEventListeners();
    attachSelectEventListeners();
    attachFormSubmitEventListeners();

    // find current date
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    selectedDatePicker[0] = date;
    selectedDatePicker[1] = month;
    selectedDatePicker[2] = year;

    // add values in options in tab content
    populateDatePicker('date-input', start = 1, end = 31, date);
    populateDatePicker('month-input', start = 1, end = 12, month);
    populateDatePicker('year-input', start = year - 10, end = year + 10, year);

  }

  init();
})();