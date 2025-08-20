import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import FavoriteMovie from "./components/FavoriteMovie/FavoriteMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<MovieDetails />} />
        <Route path="/favoritos" element={<FavoriteMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
