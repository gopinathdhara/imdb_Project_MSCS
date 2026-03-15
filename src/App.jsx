import "./App.css";
import NavBar from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import { useContext } from "react";

// Lazy import pages

// lazy() is outside App()  (best practice)

// No normal imports of Home / WatchList

// Wrapped routes inside Suspense

const Home = lazy(() => import("./Components/Home"));
const WatchList = lazy(() => import("./Components/WatchList"));
const MovieDetails = lazy(() => import("./Components/MovieDetails"));
const Favourite = lazy(() => import("./Components/Favourite"));


// Context API is used to share global state across multiple components without prop drilling. 
// multiple components use same global state
// It is best for small global state like theme, authentication status, or language settings.

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-black text-white"
            : "min-h-screen bg-gray-100 text-black"
        }
      >
        <NavBar />
        {/* sharing same date between 2 components. app is closest common parent component it is called Lifting State Up*/}
        {/* remove passing props as using redux */}

        {/* This project is not using the IMDb API directly. Most likely you are using
      the API from The Movie Database (TMDB), which provides movie data that is
      very similar to the data shown on IMDb. But IMDb is the original movie
      database website, and your project is inspired by it. */}

        {/* User → IMDb
        ↓
Check movie details
        ↓
Watch trailer
        ↓
Read ratings / reviews
        ↓
Click "Watch on Prime Video"
        ↓
Redirect to streaming platform
        ↓
Watch full movie there */}

        {/* original website https://www.imdb.com/
deployed website https://imdb-mscs.netlify.app/ */}

        <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" end element={<Home />}></Route>
            <Route path="/watchlist" element={<WatchList />}></Route>
            <Route path="/movie-details/:id" element={<MovieDetails />}></Route>
            <Route path="/favouritelist" element={<Favourite />}></Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
