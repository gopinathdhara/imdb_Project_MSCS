import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("hi");
    setLoading(true);
    setError(false);
    async function fetchMovieDetails() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        console.log(response.data);
        setMovie(response.data);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    }
    fetchMovieDetails();
  }, []);

  //   if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold">
          Loading movie details...
        </p>
      </div>
    );

  //   if (error)
  //     return <div className="text-center mt-10">Error loading movies</div>;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4">❌</div>

        <h2 className="text-xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>

        <p className="text-gray-600 mt-2">
          We couldn't load the movie details. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <>
      <h1 className="text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6">
        Movie Details
      </h1>

      <div
        className="relative w-full min-h-[70vh] rounded-2xl overflow-hidden bg-cover bg-center flex items-end"
        key={movie?.id}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="relative z-10 p-6 md:p-10 max-w-3xl text-white">
          <h1 className="text-5xl md:text-5xl font-extrabold leading-tight">
            {movie?.title}
          </h1>

          {movie?.tagline && (
            <p className="mt-2 text-lg md:text-xl text-white/80 italic">
              {movie?.tagline}
            </p>
          )}

          {movie?.overview && (
            <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
              {movie?.overview}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
            <span className="px-3 py-1 rounded-full bg-white/10">
              ⭐ {movie?.vote_average?.toFixed(1)}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10">
              📅 {movie?.release_date}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10">
              ⏱ {movie?.runtime} min
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Status</p>
              <p className="font-semibold">{movie?.status}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Vote Count</p>
              <p className="font-semibold">
                {movie?.vote_count?.toLocaleString()}
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Popularity</p>
              <p className="font-semibold">{movie?.popularity?.toFixed(1)}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Revenue</p>
              <p className="font-semibold">
                ${movie?.revenue?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
