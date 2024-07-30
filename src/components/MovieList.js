// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Row, Col, Table, Input, FormGroup, Label, Input as BootstrapInput } from 'reactstrap';
import PaginationComponent from './PaginationComponent';
import placeholder from '../assets/placeholder.svg';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('Pokemon');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [year, setYear] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(query, currentPage, year, type);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults, 10) || 0);
    };
    getMovies();
  }, [query, currentPage, year, type]);

  const handleSearch = _.debounce((event) => {
    setQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  }, 300);

  const handleYearChange = (event) => {
    setYear(event.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPoster = (posterUrl) => {
    return posterUrl === "N/A" ? placeholder : posterUrl;
  };

  return (
    <>
      <h1 className="my-4 text-center text-primary">Movie Explorer</h1>
      <Row className="mb-4 align-items-end">
        <Col md="4">
          <FormGroup>
            <Label for="searchInput">Search</Label>
            <Input
              type="text"
              id="searchInput"
              onChange={handleSearch}
              placeholder="Search for movies..."
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label for="yearSelect">Year</Label>
            <BootstrapInput
              type="select"
              name="year"
              id="yearSelect"
              value={year}
              onChange={handleYearChange}
            >
              <option value="">All</option>
              {Array.from(new Array(30), (val, index) => 2024 - index).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </BootstrapInput>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label for="typeSelect">Type</Label>
            <BootstrapInput
              type="select"
              name="type"
              id="typeSelect"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">TV Series</option>
              <option value="episode">Episode</option>
            </BootstrapInput>
          </FormGroup>
        </Col>
      </Row>
      <Table striped className="movie-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Name</th>
            <th>Release Date</th>
            <th>IMDb ID</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>
                <img src={getPoster(movie.Poster)} alt={movie.Title} className="img-thumbnail" style={{ width: '50px', height: '75px' }} />
              </td>
              <td>
                <Link to={`/movie/${movie.imdbID}`} className="movie-link">{movie.Title}</Link>
              </td>
              <td>{movie.Year}</td>
              <td>{movie.imdbID}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default MovieList;
