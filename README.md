# 🎬 IMDB Movie App (MSCS Project)

This project does **not use the IMDb API directly**. Instead, it uses the API from **The Movie Database (TMDB)**, which provides movie data similar to the information shown on IMDb.

**IMDb** is the original movie database website, and this project is **inspired by the IMDb platform**.

This is a modern movie browsing web application built using **React + Redux Toolkit**, allowing users to explore trending movies, search for films, watch trailers, and manage movie lists using the TMDB API.

This project was developed as part of my **Master of Science in Computer Science (MSCS)** learning journey.

---

## 🚀 Live Demo

https://imdb-mscs.netlify.app/



---

## 📌 Features

* 🔥 Browse Trending Movies
* 🔎 Search Movies
* 📄 Pagination Support
* ⭐ View Movie Details
* 🎬 Watch Movie Trailers
* 🎥 View Similar Movies
* ❤️ Add Movies to Watchlist
* ⭐ Add Movies to Favourite List
* 🗂️ View Watchlist Page
* 🔃 Sort Watchlist (Ascending / Descending)
* 🔍 Search Inside Watchlist
* ▶ Redirect to Watch Full Movie
* 🪝 Reusable Custom Hooks for cleaner and reusable logic
* 🧠 Global State Management using Redux Toolkit
* ⚡ Fast Development with Vite
* 🎨 Responsive UI using Tailwind CSS
* 🌐 Movie Data fetched from TMDB API


---

## 🛠️ Tech Stack

* React.js
* Redux Toolkit
* Vite
* Tailwind CSS
* Axios
* TMDB API
* JavaScript (ES6+)


---

## ⚡ Performance Optimization

To ensure smooth performance and efficient rendering, several optimization techniques were implemented:

- **Debouncing** to reduce unnecessary API calls during movie search
- **Lazy Loading** using `React.lazy()` and `Suspense` to load components only when needed
- **Code Splitting** to reduce the initial bundle size
- **Efficient State Management** using Redux Toolkit
- **Conditional Rendering** to avoid unnecessary UI updates
- **Optimized API Calls** using Axios
- **Reusable Components** to maintain clean and modular code structure
- **Custom Hooks** for reusable trailer fetching and component logic

---

## 📂 Project Structure

```
src/
├── components/
├── pages/
├── redux/
├── App.jsx
└── main.jsx
```

---

## 📡 API Used

Movie data is fetched from **The Movie Database (TMDB)** API.

https://www.themoviedb.org/

---

## 👨‍💻 Author

**Gopinath Dhara**

Assistant Consultant – Tata Consultancy Services (TCS)
MS in Data Science – Liverpool John Moores University (UK)