const apiKey = '85572ca916387be28a193e6fba722603'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

// get access to the elements
const input = document.querySelector('#main_input')
const searchButton = document.querySelector('#search_button')
const searchResults = document.querySelector('#search_results')
const syms = document.querySelector('#syms')

searchButton.addEventListener('click', () => {
    if (!input.value) {
        alert('Search cannot be blank')
        return
    }

    search()
})

setInterval(() => {
    if (syms.style.color == 'green') {
        syms.style.color = 'black'
    } else {
        syms.style.color = 'green'
    }
}, 1000);


function search() {
    const url = `${baseUrl}?q=${input.value}&appid=${apiKey}&units=metric`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=imperial`)
    .then((res) => res.json())
    .then((data) => {

        if (searchResults.children) {
            searchResults.innerHTML = ''
        }

        // Get desired data
        let sunrise = new Date(data.sys.sunrise * 1000)
        let sunset = new Date(data.sys.sunset * 1000)

        dataObject = {
            name: data.name,
            temp: data.main.temp,
            desription: data.weather[0].description,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            high: data.main.temp_max,
            low: data.main.temp_min,
            sunrise: sunrise.toLocaleTimeString('default'),
            sunset: sunset.toLocaleTimeString('default')
        }

        for (key in dataObject) {
            element = document.createElement("li")
            textNode = document.createTextNode(`${key}: ${dataObject[key]}`)
            element.appendChild(textNode)
            searchResults.appendChild(element)
        }

        // searchResults.appendChild = 
        // `<li>Name: ${name}</li>
        //  <li>Temp: ${temp}</li> 
        //  <li>Status: ${description}</li>
        //  <li>Feels Like: ${feels_like}</li>
        //  <li>Humidity: ${humidity}</li>
        //  <li>High: ${high}</li>
        //  <li>Low: ${low}</li>
        //  <li>Sunrise: ${sunrise}</li>
        //  <li>Sunset: ${sunset}</li>
        //  `
    })
    .catch((err) => {
        console.log('Fetch Error', err)
        searchResults.innerHTML = 'No Results Found'
    })
}