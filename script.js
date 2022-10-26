let city = document.querySelector('#city')
let day = document.querySelector('#day')
let description = document.querySelector("#description")
let temperature = document.querySelector('#temperature')
let icone = document.querySelector('#icone')
let windDirection = document.querySelector('#windDirection')
let clouds = document.querySelector('#clouds')

let weatherCheckBtn = document.querySelector('#weatherCheckBtn')
let weatherForecast = document.querySelector("#weatherForecast")
let guestsDropDown = document.querySelector("#guestsDropDown")
let loader = document.querySelector('#loader')
let inputCity = document.querySelector("#inputCity")
let inputCityContainer = document.querySelector("#inputCityContainer")
let dataListCity=document.querySelector("#cityList")
let submitButton=document.querySelector("#submitButton")

let descriptionToday = document.querySelector("#descriptionToday")
let temperatureToday = document.querySelector('#temperatureToday')
let iconeToday = document.querySelector("#iconeToday")
let windDirectionToday = document.querySelector('#windDirectionToday')
let cloudsToday = document.querySelector('#cloudsToday')

let descriptionTomorrow = document.querySelector("#descriptionTomorrow")
let temperatureTomorrow = document.querySelector('#temperatureTomorrow')
let iconeTomorrow = document.querySelector("#iconeTomorrow")
let windDirectionTomorrow = document.querySelector('#windDirectionTomorrow')
let cloudsTomorrow = document.querySelector('#cloudsTomorrow')

let descriptionDayAfterTomorrow = document.querySelector("#descriptionDayAfterTomorrow")
let temperatureDayAfterTomorrow = document.querySelector('#temperatureDayAfterTomorrow')
let iconeDayAfterTomorrow = document.querySelector("#iconeDayAfterTomorrow")
let windDirectionDayAfterTomorrow = document.querySelector('#windDirectionDayAfterTomorrow')
let cloudsDayAfterTomorrow = document.querySelector('#cloudsDayAfterTomorrow')



inputCity.addEventListener('input', function () {

  let inputCityValue = inputCity.value
  let searchAPI = "https://weather-api-alpha.herokuapp.com/pogoda/miasta?szukaj="
  let searchedCity = searchAPI + inputCityValue

 

  fetch(searchedCity)
  .then(response => response.json())
  .then(response => {
    console.log(response)

  dataListCity.innerHTML="";

    response.forEach(element => {
      let option = document.createElement("option")
      option.classList.add("cityAutocomplete");
      option.text = element.nazwa
      dataListCity.appendChild(option)
      console.log(element.nazwa)
    })
  });
  })
      



function unhideElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}





submitButton.addEventListener('click', function () {

    // po wciśnięciu entera wyjmuj kółeczko loadera i sprawdź, czy wszystkie pogodowe widgety pochowane 
    unhideElement(loader)
    hideElement(weatherForecast)
    hideElement(weatherForecastToday)
    hideElement(weatherForecastTomorrow)
    hideElement(weatherForecastDayAfterTomorrow)

    //uderz do odpowiedniego miasta
    let inputCityValue = inputCity.value
    let cityAPI = "https://weather-api-alpha.herokuapp.com/pogoda/prognoza?miasto="
    let selectedCity = cityAPI +  inputCityValue + '"'

    fetch(selectedCity)
  .then(res => res.json())
  .then(res => {
  

    console.log(res)
    // schowaj loadera, pokaż elementy do wyświetlania pogody
    hideElement(loader)
    unhideElement(weatherForecast)
    unhideElement(weatherForecastToday)
    unhideElement(weatherForecastTomorrow)
    unhideElement(weatherForecastDayAfterTomorrow)



    let date = new Date(res.aktualizacja)
    let month = date.getMonth() + 1
    if (month < 10) {
      month = "0" + month
    }
    let weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
    let weekDay = weekDays[date.getDay()-1]
    if (weekDay = 'Poniedziałek'){
      weekDay='Niedziela'
    }

    // aktualnie
    icone.src = 'ikonki/' + res.teraz.ikonka + '.png'
    icone.alt = res.teraz.ikonka
    day.innerHTML = weekDay + ', ' + date.getDate() + '.' + month
    city.innerHTML = res.miasto
    description.innerHTML = res.teraz.opis
    temperature.innerHTML = Math.floor(res.teraz.temperatura) + " °C"
    windDirection.innerHTML = res.teraz.wiatrKierunekSłownie
    clouds.innerHTML = res.teraz.zachmurzenie + '%'

    //dziś
    iconeToday.src = 'ikonki/' + res.prognoza.dziś.ikonka + '.png'
    iconeToday.alt = res.prognoza.dziś.ikonka
    descriptionToday.innerHTML = res.prognoza.dziś.opis
    temperatureToday.innerHTML = Math.floor(res.prognoza.dziś.temperatura) + " °C"
    windDirectionToday.innerHTML = res.prognoza.dziś.wiatrKierunekSłownie
    cloudsToday.innerHTML = res.prognoza.dziś.zachmurzenie + '%'

    //jutro
    iconeTomorrow.src = 'ikonki/' + res.prognoza.jutro.ikonka + '.png'
    iconeTomorrow.alt = res.prognoza.jutro.ikonka
    descriptionTomorrow.innerHTML = res.prognoza.jutro.opis
    temperatureTomorrow.innerHTML = Math.floor(res.prognoza.jutro.temperatura) + " °C"
    windDirectionTomorrow.innerHTML = res.prognoza.jutro.wiatrKierunekSłownie
    cloudsTomorrow.innerHTML = res.prognoza.jutro.zachmurzenie + '%'

    //pojutrze
    iconeDayAfterTomorrow.src = 'ikonki/' + res.prognoza.pojutrze.ikonka + '.png'
    iconeDayAfterTomorrow.alt = res.prognoza.pojutrze.ikonka
    descriptionDayAfterTomorrow.innerHTML = res.prognoza.pojutrze.opis
    temperatureDayAfterTomorrow.innerHTML = Math.floor(res.prognoza.pojutrze.temperatura) + " °C"
    windDirectionDayAfterTomorrow.innerHTML = res.prognoza.pojutrze.wiatrKierunekSłownie
    cloudsDayAfterTomorrow.innerHTML = res.prognoza.pojutrze.zachmurzenie + '%'
  })

  // tutaj w razie błędu
  .catch(error => alert('Wystąpił błąd :( \n\nSprawdź połączenie z internetem \nSprawdź czy wpisane miasto występuje na liście miast'));
    
});
