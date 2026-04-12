function saveCityWeather(city,data){
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    history = history.filter(item => item.city !== city);

    history.unshift({
        city : city,
        data : data,
        time : Date.now()
    });
    if(history.length > 5){
        history.pop();
    }
    localStorage.setItem("weatherHistory",JSON.stringify(history));
    renderHistory();
}
function getCityWeather(city){
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    return history.find(item => item.city === city);
}

function displayWeather(city,data){
    const temp = data.main.temp;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;
    let result = document.getElementById("result");
    
    result.innerHTML = 
        `
            <h3>${city.toUpperCase()}</h3>
            <p>${temp}°C</p>
            <p>Condition: ${condition}</p>
            <p>Humidity: ${humidity}%</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png">
        `;
}
async function getWeather(forceRefresh = false) {
    let city = document.getElementById("city").value.toLowerCase();
    let result = document.getElementById("result");

    if(city === ""){
        result.innerText = "Please Enter a City Name";
        return;
    }

    const cached = getCityWeather(city);
    
    if(!forceRefresh && cached && (Date.now()-cached.time < 600000)){
        const minutesAgo = Math.floor((Date.now() - cached.time)/60000);
        displayWeather(city,cached.data);
        
        let result = document.getElementById("result");
        result.innerHTML += `<p style="font-size:15px;">Showing cached data [Updated ${minutesAgo}mins ago]</p>`;
        return;
    }
    else
        result.innerText = "Loading.....";
    
    const apiKey = "2b6c4c4d21ade4922fc8595d7d9f308c"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();
    
        
    
        if(response.ok && data.cod === 200){
            saveCityWeather(city,data);
            displayWeather(city,data);
        }
        else{
            console.error("API Error:", data.message);
            result.innerText = `Error: ${data.message}`;
        }    
        
    }
    catch(error){
        result.innerText = "Error fetching data";
        console.log(error);
    }
    
}

function renderHistory(){
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    const list = document.getElementById("historyList");

    list.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item.city.charAt(0).toUpperCase() + item.city.slice(1);
        li.onclick = () => {
            document.getElementById("city").value = item.city;
            getWeather();
        };
        list.appendChild(li);
    });
}
function clearHistory(){
    localStorage.removeItem("weatherHistory");
    renderHistory();
}
window.onload = () => {
    renderHistory();
};