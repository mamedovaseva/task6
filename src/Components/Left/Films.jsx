import React, { useEffect, useState } from 'react';
import './Films.css';

const Films = ({ addToFavorites, isLocked, favorites }) => {
  const [datas, setDatas] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=harry&apikey=b57b7f35")
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setDatas(data.Search.slice(0, 10)); 
        }
      });
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b57b7f35`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search) {
            setDatas(data.Search.slice(0, 10)); 
          } else {
            setDatas([]); 
          }
        });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetch("https://www.omdbapi.com/?s=harry&apikey=b57b7f35")
        .then((res) => res.json())
        .then((data) => {
          if (data.Search) {
            setDatas(data.Search.slice(0, 10)); 
          }
        });
    }
  };

  return (
    <div className="films-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange} 
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
        />
        <button onClick={handleSearch} disabled={!searchTerm.trim()}>
          Search
        </button>
      </div>
      {datas.length > 0 ? (
        datas.map((data, i) => (
          <div key={i} className="film-item">
            <img src={data.Poster} alt={data.Title} className="film-poster" />
            <h3 className="film-title">{data.Title}</h3>
            <p className="film-year"><strong>Year:</strong> {data.Year}</p>
            <button 
              onClick={() => addToFavorites(data)} 
              disabled={isLocked || favorites.some((fav) => fav.imdbID === data.imdbID)} 
            >
              {favorites.some((fav) => fav.imdbID === data.imdbID) ? "Added" : "Add to favorites"}
            </button>
          
          </div>
        ))
      ) : (
        <p>No films found</p>
      )}
    </div>
  );
};

export default Films;