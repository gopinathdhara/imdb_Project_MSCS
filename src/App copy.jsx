import "./App.css";
import NavBar from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import WatchList from "./Components/WatchList";

function App() {

  // const [watchList, setWatchList] = useState(() => {
  //   const movies = localStorage.getItem("movies");
  //   return movies ? JSON.parse(movies) : [];
  // });

  return (
    <>
      <NavBar />
      {/* sharing same date between 2 components. app is closest common parent component it is called Lifting State Up*/}
      {/* remove passing props as using redux */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/watchlist" element={<WatchList />}></Route>
      </Routes>
    </>
  );
}

export default App;
