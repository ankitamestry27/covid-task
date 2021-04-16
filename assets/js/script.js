var countriesDropdown = document.getElementById('countries'),
  loader = document.getElementById('loaderGif');

function createList(dataR) {
  var confirmed = dataR.Confirmed ? dataR.Confirmed : '0',
    deaths = dataR.Deaths ? dataR.Deaths : '0',
    recovered = dataR.Recovered ? dataR.Recovered : '0',
    active = dataR.Active ? dataR.Active : '0',
    date = dataR.Date ? dataR.Date : '-',
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

// show results on page visit


countriesDropdown.addEventListener("change", function (e) {
  console.log(event.target.value);
  var country = event.target.value;

  // remove all existing results
  document.querySelectorAll('.result').forEach(result => {
    result.remove();
  });

  loader.classList.remove('hide');

  fetch('https://api.covid19api.com/total/country/' + country)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dataCount = Object.keys(data).length;
      loader.classList.add('hide');
      console.log(dataCount);
      for (var i = 0; i < dataCount; i++) {
        createList(data[i]);
      }
    });
});