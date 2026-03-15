import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={
          theme === "dark"
            ? "bg-gray-900 text-white flex items-center justify-between px-8 py-4 mx-10 mt-6 rounded-2xl shadow-lg"
            : "bg-white text-gray-900 flex items-center justify-between px-8 py-4 mx-10 mt-6 rounded-2xl shadow-md border border-gray-200"
        }
      >
        {/* <Link to="/">
        <img
          className="w-[70px]"
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
        ></img>
      </Link> */}
        {/* <Link to="/" className="text-2xl font-bold text-left">Movies</Link>
      <Link to="/watchlist" className="text-2xl font-bold text-left">WatchList</Link>
      <Link to="/favouritelist" className="text-2xl font-bold text-left">FavouriteList</Link> */}

        {/* To highlight the active navigation link (Movies / WatchList / FavouriteList), 
the best way in React Router is to use NavLink instead of Link. 
NavLink automatically adds an active class when the route matches. */}

        <NavLink to="/" className="nav-link text-2xl font-bold text-left">
          <img
            className="w-[70px]"
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
          ></img>
        </NavLink>
        <NavLink
          to="/movies"
          className="nav-link text-2xl font-bold text-lefts"
        >
          Movies
        </NavLink>

        <NavLink
          to="/watchlist"
          className="nav-link text-2xl font-bold text-left"
        >
          WatchList
        </NavLink>

        <NavLink
          to="/favouritelist"
          className="nav-link text-2xl font-bold text-left"
        >
          FavouriteList
        </NavLink>

        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
            theme === "dark"
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </>
  );
}

export default NavBar;
