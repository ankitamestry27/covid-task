var countriesDropdown = document.getElementById('countries'),
  loader = document.getElementById('loaderGif'),
  resultMessage = document.getElementById('resultMessage'),
  header = document.querySelector('header'),
  resultHeader = document.getElementById('resultHeader'),
  countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

// append all country list to the dropdown
countryList.forEach(function (value, index, array) {
  var option = document.createElement('option');
  option.value = value.toLowerCase().split(' ').join('-');
  option.appendChild(document.createTextNode(value));
  countriesDropdown.appendChild(option);
});

// function to append data
function createList(dataR) {
  var ul,
    li,
    confirmed = dataR.Confirmed ? dataR.Confirmed : '0',
    deaths = dataR.Deaths ? dataR.Deaths : '0',
    recovered = dataR.Recovered ? dataR.Recovered : '0',
    active = dataR.Active ? dataR.Active : '0',
    date = dataR.Date ? dataR.Date.split('T')[0] : '-',
    confirmedLi,
    deathsLi,
    recoveredLi,
    activeLi,
    dateLi;

  li = document.createElement('li');
  li.className = 'result';

  ul = document.createElement('ul');
  li.appendChild(ul);

  function createLi(list, value) {
    list = document.createElement('li');
    list.appendChild(document.createTextNode(value));
    ul.appendChild(list);
  }

  createLi(confirmedLi, confirmed);
  createLi(deathsLi, deaths);
  createLi(recoveredLi, recovered);
  createLi(activeLi, active);
  createLi(dateLi, date);

  document.getElementById('results').appendChild(li);
}

// country dropdown functionality
countriesDropdown.addEventListener("change", function (event) {
  console.log(event.target.value);
  var country = event.target.value;

  // remove all existing results
  document.querySelectorAll('.result').forEach(result => {
    result.remove();
  });

  if (country == "nothing") {
    resultMessage.classList.remove('hide');
  } else {
    loader.classList.remove('hide');

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch('https://api.covid19api.com/total/country/' + country, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var dataCount = Object.keys(data).length;

        loader.classList.add('hide');

        console.log(data);
        if (dataCount > 0) {
          resultMessage.classList.add('hide');
          for (var i = 0; i < dataCount; i++) {
            createList(data[i]);
          }
        } else {
          resultMessage.classList.remove('hide');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        loader.classList.add('hide');
        resultMessage.classList.remove('hide');
      });
  }
});