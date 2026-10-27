const cityName = localStorage.getItem("previousCity") == null ? "Berlin" : localStorage.getItem("previousCity")
const searches = document.querySelector('.searches')
const matches = document.querySelector('.matches')
const recentSearches = document.querySelector('.recent-searches')
const mainLocation = document.querySelector('.main-location')
const date = document.querySelector('.date')
const currentTemp = document.querySelector('.current_temp')
const weatherCode = document.querySelector('.weather_code')
const apparentTemp = document.querySelector('.apparent_temp')
const windSpeed = document.querySelector('.windspeed')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const weatherImg = document.querySelector('.weather-img')
const footer = document.querySelector('.footer')
const day = document.querySelectorAll('.day')
const dates = document.querySelectorAll('.date')
const weatherIcon = document.querySelectorAll('.code-icon')
const temps = document.querySelectorAll('.temps')
const weatherDescForecast = document.querySelectorAll('.weather_desc_forecast')
const loadingSkelenton = document.querySelector('.loading-skelenton')
const submitSearch = document.querySelector('.submit-search')
const city1Compare = document.querySelector('.city-1-compare')
const city2Compare = document.querySelector('.city-2-compare')



const city1 = document.querySelector('.city-1')
const compareBox = document.querySelector('.compare-box')
const compareCityName = document.querySelector('.compare-city-name')
const compareCurrentTemp = document.querySelector('.stats-city-1')
const compareWeatherIcon = document.querySelector('.compare-weather-icon')


const compareWeatherIcon2 = document.querySelector('.compare-weather-icon-2')
const statsCity2 = document.querySelector('.stats-city-2')
const compareCity2Name = document.querySelector('.compare-city2-name')
const city2 = document.querySelector('.city-2')
const cityCheck = document.querySelector('.city-check')

const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
function loadingScreen() {
    loadingSkelenton.style.display = "flex"

    while (loadingSkelenton.children.length < 3) {
        const dot = document.createElement("p")
        dot.classList.add("dot")
        loadingSkelenton.appendChild(dot)

    }
    if (loadingSkelenton.children.length == 3) {

        loadingSkelenton.replaceChildren()
    }
}





const weatherDescriptions = {
    0: ["Clear sky", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/clear-day.svg"],
    1: ["Mainly clear", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/mostly-clear-day.svg"],
    2: ["Partly cloudy", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/partly-cloudy-day.svg"],
    3: ["Overcast", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/overcast.svg"],
    45: ["Fog", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/fog.svg"],
    48: ["Depositing rime fog", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/extreme-fog.svg"],
    51: ["Light drizzle", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/drizzle.svg"],
    53: ["Moderate drizzle", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/overcast-drizzle.svg"],
    55: ["Dense drizzle", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/extreme-drizzle.svg"],
    61: ["Slight rain", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/rain.svg"],
    63: ["Moderate rain", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/overcast-rain.svg"],
    65: ["Heavy rain", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/extreme-rain.svg"],
    80: ["Slight rain showers", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/hail.svg"],
    81: ["Moderate rain showers", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/overcast-hail.svg"],
    82: ["Violent rain showers", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/extreme-hail.svg"],
    95: ["Thunderstorm", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/thunderstorms.svg"],
    96: ["Thunderstorm with hail", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/thunderstorms-hail.svg"],
    99: ["Thunderstorm with heavy hail", "https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/thunderstorms-extreme-hail.svg"]
};
const loadUsersCity = async (latitude, longitude) => {
    loadingScreen()
    try {
        console.log(latitude, longitude)
        const cityName = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`)
        const response = await cityName.json()
        console.log(response)
        // const latitude = await usersLocation[0]
        // const longitude = await usersLocation[1]
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min&timezone=auto`)
        const weatherResponse = await weather.json()
        console.log(weatherResponse)

        mainLocation.textContent = `${response.address.state}, ${response.address.country}`
        const now = new Date()
        date.textContent = now.toDateString()
        currentTemp.textContent = `${weatherResponse.current.temperature_2m}${weatherResponse.current_units.temperature_2m}`
        apparentTemp.textContent = `${weatherResponse.current.apparent_temperature}${weatherResponse.current_units.temperature_2m}`
        humidity.textContent = `${weatherResponse.current.relative_humidity_2m}${weatherResponse.current_units.relative_humidity_2m}`
        windSpeed.textContent = `${weatherResponse.current.wind_speed_10m}${weatherResponse.current_units.wind_speed_10m}`
        pressure.textContent = `${weatherResponse.current.surface_pressure}${weatherResponse.current_units.surface_pressure}`
        console.log(weatherResponse)
        weatherCode.textContent = weatherDescriptions[weatherResponse.current.weather_code][0]
        weatherImg.src = weatherDescriptions[weatherResponse.current.weather_code][1]
        let count = Number(weatherResponse.daily.time[0].slice(-2))
        for (i = 0; i < 7; i++) {
            const currentMonth = `${now.toLocaleDateString("en-US", {
                month: "short"
            })}`
            const currentDay = now.getDate()
            day[i].textContent = now.toLocaleDateString("en-US", {
                weekday: "short"
            })
            dates[i + 1].textContent = `${currentMonth}, ${currentDay}`
            temps[i].children[0].textContent = `${weatherResponse.daily.temperature_2m_min[i]}${weatherResponse.daily_units.temperature_2m_min} `
            temps[i].children[1].textContent = `${weatherResponse.daily.apparent_temperature_min[i]}${weatherResponse.current_units.temperature_2m} `
            weatherDescForecast[i].textContent = weatherDescriptions[weatherResponse.daily.weather_code[i]][0]
            weatherIcon[i].src = weatherDescriptions[weatherResponse.daily.weather_code[i]][1]

            now.setDate(now.getDate() + 1)
            compareCityName.textContent = `${response.address.state}, ${response.address.country}`
            city1Compare.textContent = `${response.address.state}`
            compareCurrentTemp.children[0].textContent = currentTemp.textContent = `${weatherResponse.current.temperature_2m}${weatherResponse.current_units.temperature_2m}`
            compareCurrentTemp.children[1].textContent = weatherDescriptions[weatherResponse.current.weather_code][0]
            compareWeatherIcon.children[0].src = weatherDescriptions[weatherResponse.current.weather_code][1]
            footer.children[1].children[1].textContent = `${weatherResponse.current.relative_humidity_2m}${weatherResponse.current_units.relative_humidity_2m}`
            footer.children[2].children[1].textContent = `${weatherResponse.current.surface_pressure}${weatherResponse.current_units.surface_pressure}`
            footer.children[3].children[1].textContent = `${weatherResponse.current.wind_speed_10m}${weatherResponse.current_units.wind_speed_10m}`

            loadingSkelenton.style.display = "none"
        }


    } catch (error) {

        console.log(`Error fectching the city data: ${error} `)
    }

}
const findCity = async (name) => {
    loadingScreen()
    try {
        const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`

        const city = await fetch(cityUrl)
        const response = await city.json()
        if (!response.results || response.results.length === 0) {
            console.log(`No city results found for: ${name}`)
            loadingSkelenton.style.display = "none"
            return
        }
        const latitude = response.results[0].latitude
        const longitude = response.results[0].longitude
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min&timezone=auto`)
        const weatherResponse = await weather.json()
        console.log(weatherResponse)

        mainLocation.textContent = `${response.results[0].name}, ${response.results[0].country}`
        const now = new Date()

        date.textContent = now.toDateString()
        currentTemp.textContent = `${weatherResponse.current.temperature_2m}${weatherResponse.current_units.temperature_2m}`
        apparentTemp.textContent = `${weatherResponse.current.apparent_temperature}${weatherResponse.current_units.temperature_2m}`
        humidity.textContent = `${weatherResponse.current.relative_humidity_2m}${weatherResponse.current_units.relative_humidity_2m}`
        windSpeed.textContent = `${weatherResponse.current.wind_speed_10m}${weatherResponse.current_units.wind_speed_10m}`
        pressure.textContent = `${weatherResponse.current.surface_pressure}${weatherResponse.current_units.surface_pressure}`
        console.log(weatherResponse)
        weatherCode.textContent = weatherDescriptions[weatherResponse.current.weather_code][0]
        weatherImg.src = weatherDescriptions[weatherResponse.current.weather_code][1]
        let count = Number(weatherResponse.daily.time[0].slice(-2))
        for (i = 0; i < 7; i++) {
            const currentMonth = `${now.toLocaleDateString("en-US", {
                month: "short"
            })}`
            const currentDay = now.getDate()
            day[i].textContent = now.toLocaleDateString("en-US", {
                weekday: "short"
            })
            dates[i + 1].textContent = `${currentMonth}, ${currentDay}`
            temps[i].children[0].textContent = `${weatherResponse.daily.temperature_2m_min[i]}${weatherResponse.daily_units.temperature_2m_min} `
            temps[i].children[1].textContent = `${weatherResponse.daily.apparent_temperature_min[i]}${weatherResponse.current_units.temperature_2m} `
            weatherDescForecast[i].textContent = weatherDescriptions[weatherResponse.daily.weather_code[i]][0]
            weatherIcon[i].src = weatherDescriptions[weatherResponse.daily.weather_code[i]][1]

            now.setDate(now.getDate() + 1)
            loadingSkelenton.style.display = "none"
        }


    } catch (error) {

        console.log(`Error fectching the city data: ${error} `)
    }

}

const params = new URLSearchParams(window.location.search)
const city = params.get("city")
if (city) {
    findCity(city)
}
else {
    getUserLocation()
}

// else {
//     findCity(cityName)
// }
const searchInput = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')
const recent = document.querySelector('.recent-searches')

if (searchHistory.length > 0) {
    recent.innerHTML = ""
    const text = document.createElement("p")
    text.textContent = "Recent Searches"
    recent.appendChild(text)
    searchHistory.forEach(search => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        div.appendChild(p)
        recent.appendChild(div)
        p.textContent = search

    })
}
searchButton.addEventListener("click", function () {

    if (searchInput.value !== "") {
        localStorage.setItem("previousCity", searchInput.value)

        searchHistory.push(searchInput.value)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
        const div = document.createElement("div")
        const p = document.createElement("p")
        div.appendChild(p)
        recent.appendChild(div)
        p.textContent = searchInput.value
        findCity(localStorage.getItem("previousCity"))
    }
})

// const relatedFinds = async () => {
//     const finds = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput.value}&count=10&language=en&format=json`)
//     const response = await finds.json()
//     return response
// }
searchInput.parentElement.addEventListener("click", function (e) {
    searches.style.display = "flex"
    e.stopPropagation()

})
window.addEventListener("click", function () {
    searches.style.display = "none"

})
searches.addEventListener("click", function (e) {
    e.stopPropagation()
})
matches.addEventListener("click", function (e) {
    e.stopPropagation()
})
searchInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        findCity(searchInput.value)
        localStorage.setItem("previousCity", searchInput.value)
        searches.style.display = "none"
        searchHistory.push(searchInput.value)

    }
})
searchInput.addEventListener("input", function () {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput.value}&count=1&language=en&format=json`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.results !== undefined) {
                data.results.forEach((element, index) => {

                    if (matches.children.length < 1) {
                        const div = document.createElement("div")
                        const p = document.createElement("p")
                        div.appendChild(p)
                        matches.appendChild(div)
                        p.textContent = `${element.name}, ${element.country}`

                    }
                    else {
                        matches.children[0].children[0].textContent = `${element.name}, ${element.country}`

                    }


                    if (matches.children.length > 0) {
                        matches.children[0].addEventListener("click", function () {
                            localStorage.setItem("previousCity", element.name)
                            console.log("works")
                            findCity(element.name)
                            searches.style.display = "none"
                            console.log(`${element.name}, ${element.country}`)
                            searchHistory.push(`${element.name}, ${element.country}`)

                        })
                    }

                });
            }



        })


})

const compareCity1 = async (name) => {
    try {
        const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`

        const city = await fetch(cityUrl)
        const response = await city.json()
        const latitude = response.results[0].latitude
        const longitude = response.results[0].longitude
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min&timezone=auto`)

        const weatherResponse = await weather.json()

        compareCityName.textContent = `${response.results[0].name}, ${response.results[0].country}`
        city1Compare.textContent = `${response.results[0].name}`
        compareCurrentTemp.children[0].textContent = currentTemp.textContent = `${weatherResponse.current.temperature_2m}${weatherResponse.current_units.temperature_2m}`
        compareCurrentTemp.children[1].textContent = weatherDescriptions[weatherResponse.current.weather_code][0]
        compareWeatherIcon.children[0].src = weatherDescriptions[weatherResponse.current.weather_code][1]
        footer.children[1].children[1].textContent = `${weatherResponse.current.relative_humidity_2m}${weatherResponse.current_units.relative_humidity_2m}`
        footer.children[2].children[1].textContent = `${weatherResponse.current.surface_pressure}${weatherResponse.current_units.surface_pressure}`
        footer.children[3].children[1].textContent = `${weatherResponse.current.wind_speed_10m}${weatherResponse.current_units.wind_speed_10m}`

    } catch (error) {
        console.log(`Error fectching the city data: ${error}`)
    }


}
const compareCity2 = async (name) => {
    try {
        const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`

        const city = await fetch(cityUrl)
        const response = await city.json()
        const latitude = response.results[0].latitude
        const longitude = response.results[0].longitude
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min&timezone=auto`)

        const weatherResponse = await weather.json()

        compareCity2Name.textContent = `${response.results[0].name}, ${response.results[0].country}`
        statsCity2.children[0].textContent = currentTemp.textContent = `${weatherResponse.current.temperature_2m}${weatherResponse.current_units.temperature_2m}`
        statsCity2.children[1].textContent = weatherDescriptions[weatherResponse.current.weather_code][0]
        compareWeatherIcon2.children[0].src = weatherDescriptions[weatherResponse.current.weather_code][1]
        city2Compare.textContent = `${response.results[0].name}`

        footer.children[1].children[2].textContent = `${weatherResponse.current.relative_humidity_2m}${weatherResponse.current_units.relative_humidity_2m}`
        footer.children[2].children[2].textContent = `${weatherResponse.current.surface_pressure}${weatherResponse.current_units.surface_pressure}`
        footer.children[3].children[2].textContent = `${weatherResponse.current.wind_speed_10m}${weatherResponse.current_units.wind_speed_10m}`

    } catch (error) {
        console.log(`Error fectching the city data: ${error}`)
    }


}
// const city1Param = params.get("city1")
// if (city1Param) {
//     compareCity1(city1Param)
// }

// else {
//     findCity(cityName)
// }
compareCity1("laos")
compareCity2("lagos")
submitSearch.addEventListener("click", function () {
    if (compareBox.children[0].value !== "") {
        if (cityCheck.textContent == "city-1") {
            compareCity1(compareBox.children[0].value)
        }
        else if (cityCheck.textContent == "city-2") {
            compareCity2(compareBox.children[0].value)
        }
        compareBox.style.display = "none"
    }
}
)
city1.addEventListener("click", function (e) {
    e.stopPropagation()
    compareBox.style.display = "flex"
    compareBox.children[0].value = ""
    cityCheck.textContent = "city-1"
})

city2.addEventListener("click", function (e) {
    e.stopPropagation()

    compareBox.style.display = "flex"
    compareBox.children[0].value = ""
    cityCheck.textContent = "city-2"
})
window.addEventListener("click", function () {
    compareBox.style.display = "none"
    compareBox.children[0].value = ""
    searchInput.value = ""
})
compareBox.addEventListener("click", function (e) {
    e.stopPropagation()
})


Array.from(recent.children).forEach(child => {
    child.addEventListener("click", function () {
        findCity(child.children[0].textContent)
        localStorage.setItem("previousCity", child.children[0].textContent)
    })
})

function noOfDaysInAMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}


const home = document.querySelector('.home')
const compare = document.querySelector('.compare')
const compareCities = document.querySelector('.compare-cities')
const mainBody = document.querySelector('.main-bar')
compare.addEventListener("click", function () {
    compareCities.style.display = "flex"
    mainBody.style.display = "none"
})
home.addEventListener("click", function () {
    compareCities.style.display = "none"
    mainBody.style.display = "grid"
})
function getUserLocation() {
    if (!navigator.geolocation) {
        console.log("location is not allowed")
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            // const getCity = async (longitude, latitude) => {


            //     const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min&timezone=auto`)
            //     const weatherResponse = await weather.json()
            //     return weatherResponse
            // }

            // getCity(longitude, latitude)
            const accuracy = position.coords.accuracy
            loadUsersCity(latitude, longitude)
        },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                console.log("permission denied")
            }
            else {
                console.log("Unable to retrieve your current location")
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 60000
        }
    )
}

