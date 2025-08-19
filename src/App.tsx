import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "./utils/types/Film";
import React from "react";
import { baseUrlApi, tokenAuthorization } from "./utils/helpers/url";
import CardFilm from "./components/Card/CardMovie";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import Loading from "./components/Loading/Loading";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoaging] = useState<boolean>(true);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleFindFilms = async (currentPage: number) => {
      try {
        const res = await axios.get(
          `${baseUrlApi()}/upcoming?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${tokenAuthorization()}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Results", res.data.results);
        console.log("Data: ", res.data);
        console.log("Total Pages: ", res.data.total_pages);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setIsLoaging(false);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        } else {
          console.log("Erro desconhecido", error);
        }
      }
    };

    handleFindFilms(currentPage);
  }, [currentPage]);

  return (
    <>
      <Header />
      {false ? (
        <Loading />
      ) : (
        <div>
          <CardFilm movies={movies} />
          <Pagination totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </>
  );
}

export default App;
