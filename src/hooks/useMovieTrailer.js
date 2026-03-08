import { useState, useEffect } from "react";
import axios from "axios";

const useMovieTrailer = (id) => {
  if (!id) return;
  // for movie trailer custom hook will be used many places so make it reuseable
  const [movieTrailerKey, setMovieTrailer] = useState("");
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState(false);
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  // ############## fetch movie trailer ###################

  useEffect(() => {
    setTrailerLoading(true);
    setTrailerError(false);
    async function fetchMovieTrailer() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        console.log("MovieTrailer");
        console.log(response.data.results);

        let trailer = response.data.results.find(
          (item) => item.type === "Trailer",
        );
        //console.log(trailer);
        setMovieTrailer(trailer?.key || "");
        setTrailerLoading(false);
        setTrailerError(false);
      } catch (e) {
        setTrailerLoading(false);
        setTrailerError(true);
        console.log(e);
      }
    }
    fetchMovieTrailer();
  }, [id]);

  //################################################################

  return {
    movieTrailerKey,
    trailerLoading,
    trailerError,
  };
};

export default useMovieTrailer;
