import { useEffect, useState } from "react";
const KEY = "81105940";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal
          }
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
    }  
  };
  fetchMovies();
  return () => {
    controller.abort();
  };
}, [query]);    


return (
  <div>
    <h1>Movies</h1>
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} />
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.imdbID}>
            <td>{movie.Title}</td>
            <td>{movie.Year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default App;
