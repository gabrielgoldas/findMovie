import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { baseUrlApi, tokenAuthorization } from "../../utils/helpers/url";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import CardMovie from "../Card/CardMovie";
import Pagination from "../Pagination/Pagination";
import { Movie } from "../../utils/types/Movie";

function Home() {
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
          `${baseUrlApi()}/popular?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${tokenAuthorization()}`,
              "Content-Type": "application/json",
            },
          }
        );
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
          <CardMovie movies={movies} />
          <Pagination totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </>
  );
}

export default Home;
