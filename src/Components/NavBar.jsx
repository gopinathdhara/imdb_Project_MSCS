import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <>
      <div className="flex gap-4 nav-bar-cls">

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
        <NavLink to="/movies" className="nav-link text-2xl font-bold text-lefts">
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
      </div>
    </>
  );
}

export default NavBar;
