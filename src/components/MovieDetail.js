// src/components/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { fetchMovieDetails, fetchSimilarMovies } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'reactstrap';
import placeholder from '../assets/placeholder.svg';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      if (data.Title) {
        const similarMoviesData = await fetchSimilarMovies(data.Title);
        setSimilarMovies(similarMoviesData.Search ? similarMoviesData.Search.slice(0, 3) : []); // Limit to 3 similar movies
      }
    };
    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const getPoster = (posterUrl) => {
    return posterUrl === "N/A" ? placeholder : posterUrl;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Button color="primary" onClick={handleBackClick} className="mb-4">Back to Search Results</Button>
      <Row>
        <Col md="8">
          <Card>
            <Row noGutters>
              <Col md="4">
                <img src={getPoster(movie.Poster)} alt={movie.Title} className="img-fluid" />
              </Col>
              <Col md="8">
                <CardBody>
                  <CardTitle tag="h2">{movie.Title}</CardTitle>
                  <CardText>{movie.Plot}</CardText>
                  <ListGroup>
                    <ListGroupItem><strong>Genre:</strong> {movie.Genre}</ListGroupItem>
                    <ListGroupItem><strong>Director:</strong> {movie.Director}</ListGroupItem>
                    <ListGroupItem><strong>Cast:</strong> {movie.Actors}</ListGroupItem>
                    <ListGroupItem><strong>IMDb Rating:</strong> {movie.imdbRating}</ListGroupItem>
                    <ListGroupItem><strong>Duration:</strong> {movie.Runtime}</ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md="4">
          <h4>Similar Movies</h4>
          {similarMovies.map((similarMovie) => (
            <Card key={similarMovie.imdbID} className="mb-2">
              <Row noGutters>
                <Col md="4">
                  <img src={getPoster(similarMovie.Poster)} alt={similarMovie.Title} className="img-fluid" />
                </Col>
                <Col md="8">
                  <CardBody>
                    <CardTitle tag="h5">{similarMovie.Title}</CardTitle>
                    <CardText>{similarMovie.Year}</CardText>
                    <Button color="link" onClick={() => navigate(`/movie/${similarMovie.imdbID}`)}>View Details</Button>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default MovieDetail;
