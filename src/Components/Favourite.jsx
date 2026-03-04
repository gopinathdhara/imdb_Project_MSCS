import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  sortRatingDesc1,
  sortRatingAsc1,
  sortPopularityDesc1,
  sortPopularityAsc1,
} from "../Redux/favouriteSlice";

function Favourite() {
  // usestate hook
  const [search, setSearch] = useState("");
  const favouriteList = useSelector((state) => state.favourites.favouritelist);
  const dispatch = useDispatch();
  const genreIds = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  // includes return true if string matches with array item else false
  // calls when component rerender after putting values in search box state changes
  let filtered_movies = favouriteList.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  // sorting watch list
  const sortRatingDesc = () => {
    dispatch(sortRatingDesc1());
  };

  const sortRatingAsc = () => {
    dispatch(sortRatingAsc1());
  };

  const sortPopularityDesc = () => {
    dispatch(sortPopularityDesc1());
  };

  const sortPopularityAsc = () => {
    dispatch(sortPopularityAsc1());
  };

  return (
    <>
      <div className="text-2xl font-bold text-center m-5">
        <h1>Favourite Movies</h1>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Favourite Movies"
          className="h-[2rem] w-[20rem] px-3 border border-gray-500 mb-5 rounded"
        />
      </div>
      <div className="px-4  flex justify-evenly flex-wrap text-center gap-8">
        <table className="w-full border border-gray-200 text-gray-500">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 ">Title</th>
              <th className="py-2 ">
                <button onClick={sortRatingDesc}>↓</button>
                Rating
                <button onClick={sortRatingAsc}>↑</button>
              </th>
              <th className="py-2 ">
                <button onClick={sortPopularityDesc}>↓</button>
                Popularity
                <button onClick={sortPopularityAsc}>↑</button>
              </th>
              <th className="py-2 ">Genre</th>
            </tr>
          </thead>
          <tbody className="divide-y border border-gray-100">
            {filtered_movies?.map((item, index) => {
              const imgPath = item.backdrop_path || item.poster_path;

              return (
                <tr key={item.id}>
                  <td className="py-2 ">{item.title}</td>
                  <td className="py-2 ">{item.vote_average}</td>
                  <td className="py-2 ">{item.popularity}</td>
                  <td className="py-2 ">{genreIds[item?.genre_ids?.[0]]}</td>
                  <td>
                    <Link to={`/movie-details/${item.id}`}>
                      <button class="mybutton2"> Details</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Favourite;
