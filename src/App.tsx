import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "./utils/types/Film";
import React from "react";
import { baseUrlApi, tokenAuthorization } from "./utils/helpers/url";
import CardFilm from "./components/Card/CardMovie";
import Header from "./components/Header/Header";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleFindFilms = async () => {
      try {
        const res = await axios.get(`${baseUrlApi()}/popular?page=1`, {
          headers: {
            Authorization: `Bearer ${tokenAuthorization()}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res.data.results);
        setMovies(res.data.results);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        } else {
          console.log("Erro desconhecido", error);
        }
      }
    };

    handleFindFilms();
  }, []);

  return (
    <>
      <Header />
      <CardFilm movies={movies} />
    </>
  );
}

export default App;
