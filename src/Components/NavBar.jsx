import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
    <div className="flex gap-4">
 <Link to="/">
        <img
          className="w-[70px]"
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
        ></img>
      </Link>
      <Link to="/" className="text-2xl font-bold text-left">Movies</Link>
      <Link to="/watchlist" className="text-2xl font-bold text-left">WatchList</Link>
    </div>
     
    </>
  );
}

export default NavBar;
