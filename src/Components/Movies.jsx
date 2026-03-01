import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchMovies from "../Redux/fetchMovies";
import { handleNext, handlePrevious } from "../Redux/paginationSlice";
import { addWatchList, removeWatchList } from "../Redux/watchlistSlice";

function Movies() {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  //useDispatch hook
  const dispatch = useDispatch();

  const { movieSlc, loading, error } = useSelector((state) => state.movies);
  const pageNo = useSelector((state) => state.pagination.pageNo);
  const watchList = useSelector((state) => state.watch_list.watchlist);

  useEffect(() => {
    if (!TOKEN) {
      console.error("TMDB Token is missing");
      return;
    }

    dispatch(fetchMovies(pageNo));
  }, [pageNo]);

  function handleprev() {
    dispatch(handlePrevious());
  }
  function handlenext() {
    dispatch(handleNext());
  }

  function doescontain(movie_obj) {
    return watchList?.some((item) => item.id === movie_obj.id);
  }

  function addToWatchList(movieobj) {
    dispatch(addWatchList(movieobj));
  }

  function removeFromWatchList(movieobj) {
    dispatch(removeWatchList(movieobj));
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10">Error loading movies</div>;

  return (
    <>
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>
      <div className="flex justify-evenly text-center gap-8 flex-wrap">
        {movieSlc?.map((item, index) => {
          const imgPath = item.backdrop_path || item.poster_path;
          const check_if_contain = doescontain(item);
          return (
            <div
              key={item.id}
              className="h-[40vh] w-[200px] rounded-xl flex flex-col bg-cover bg-center flex"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${imgPath})`,
              }}
            >
              {check_if_contain ? (
                <div
                  className="m-4 flex "
                  onClick={() => removeFromWatchList(item)}
                >
                  ❌
                </div>
              ) : (
                <div className="m-4 flex " onClick={() => addToWatchList(item)}>
                  😍
                </div>
              )}
              <div className="text-white text-xl p-2">{item.title}</div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-400 p-4 h-[50px] mt-8 w-full flex justify-center gap-4">
        <div onClick={handleprev}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        {pageNo}
        <div onClick={handlenext}>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </>
  );
}

export default Movies;
