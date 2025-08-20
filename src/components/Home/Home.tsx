import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { baseUrlApi, tokenAuthorization } from "../../utils/helpers/url";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import CardMovie from "../Card/CardMovie";
import Pagination from "../Pagination/Pagination";
import { Movie, MovieApiResponse } from "../../utils/types/Movie";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchData = async (query: string, page: number = 1) => {
    setIsLoading(true);
    setError("");

    try {
      const res = query
        ? await axios.get<MovieApiResponse>(
            `${baseUrlApi()}/search/movie?page=${page}`,
            {
              params: { query },
              headers: {
                Authorization: `Bearer ${tokenAuthorization()}`,
                Accept: "application/json",
              },
            }
          )
        : await axios.get<MovieApiResponse>(
            `${baseUrlApi()}/movie/popular?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${tokenAuthorization()}`,
                "Content-Type": "application/json",
              },
            }
          );

      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setSearchQuery(query);
      setCurrentPage(page);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, currentPage);
  }, [currentPage, searchQuery]);

  return (
    <>
      <Header title="Filmes" isFavorite={false} onSearch={fetchData} />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {error ? <h1>{error}</h1> : <CardMovie movies={movies} />}
          <Pagination
            totalPages={totalPages}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}

export default Home;
