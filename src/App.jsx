import "./App.css";
import NavBar from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy import pages

// lazy() is outside App()  (best practice)

// No normal imports of Home / WatchList

// Wrapped routes inside Suspense

const Home = lazy(() => import("./Components/Home"));
const WatchList = lazy(() => import("./Components/WatchList"));
const MovieDetails = lazy(() => import("./Components/MovieDetails"));

function App() {
  return (
    <>
      <NavBar />
      {/* sharing same date between 2 components. app is closest common parent component it is called Lifting State Up*/}
      {/* remove passing props as using redux */}

      <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/watchlist" element={<WatchList />}></Route>
          <Route path="/movie-details/:id" element={<MovieDetails />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
