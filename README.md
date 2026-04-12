# 🌤 Weather App

A fully functional weather application built using HTML, CSS, and JavaScript that fetches real-time weather data from OpenWeatherMap API.

---

## 🚀 Features

- 🌍 Search weather by city name  
- ⚡ Client-side caching using localStorage  
- ⏱ Cache expiry system (10-minute validation)  
- 📦 Stores last 5 searched cities (no duplicates)  
- 🔄 Conditional API fetching (reduces unnecessary calls)  
- 📡 Offline fallback using cached data  
- 🔁 Manual refresh option to fetch latest data  
- 🕘 Displays "last updated" time for transparency  
- 📜 Search history with clickable items  
- 🎨 Clean and responsive UI  

---

## 🧠 How It Works

- When a user searches for a city:
  - The app first checks localStorage for cached data  
  - If valid (within 10 minutes), it displays cached data instantly  
  - Otherwise, it fetches fresh data from the API  

- The cache:
  - Stores weather data for up to 5 cities  
  - Removes duplicates  
  - Automatically removes oldest entries when limit exceeds  

- The refresh button:
  - Bypasses cache and forces a fresh API call  

---

## 🛠 Tech Stack

- HTML  
- CSS  
- JavaScript (Vanilla JS)  
- OpenWeatherMap API  

---

## 🌐 Live Demo

👉 [View Live](https://himesh-d.github.io/Weather-App/)

---

## 📦 Installation & Usage

1. Clone the repository:
```bash
git clone https://github.com/Himesh-D/Weather-App.git