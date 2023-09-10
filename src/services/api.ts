import { useState, useEffect } from 'react';
import { Movie, MovieCollection } from 'types';

import { moviedbApiKey, url } from 'helpers';
import { resToMovie } from './transformations';

export const useApiData = <T>(apiUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Always fetch data when the component mounts
  }, [apiUrl]);

  return { data, isLoading, error };
};

export const usePopularMovies = () => {
  const apiUrl = `${url}/popular?api_key=${moviedbApiKey}`;
  const { data, isLoading, error } = useApiData(apiUrl);

  return { popularMovies: data, isLoading, error };
};

export const useMovieById = (id: string | undefined) => {
  const apiUrl = `${url}/${id}?api_key=${moviedbApiKey}`;
  const { data, isLoading, error } = useApiData<Movie>(apiUrl);

  return { movieData: resToMovie(data), isLoading, error };
};

export const useMoviesSearch = (query: string, searchYear: string, genre: string) => {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${moviedbApiKey}&query=${encodeURIComponent(
    query,
  ).trim()}&year=${encodeURIComponent(searchYear).trim()}&with_genres=${encodeURIComponent(genre).trim()}`;

  const { data, isLoading, error } = useApiData<MovieCollection>(apiUrl);

  return { moviesCollectionData: data?.results, isMoviesCollectionDataLoading: isLoading, MoviesCollectionDataError: error };
};

export const useTopRatedMovies = () => {
  const apiUrl = `${url}/top_rated?api_key=${moviedbApiKey}`;
  const { data, isLoading, error } = useApiData(apiUrl);

  return { topRated: data, isTopRatedMoviesLoading: isLoading, error };
};

export const useNowPlayingMovies = () => {
  const apiUrl = `${url}/now_playing?api_key=${moviedbApiKey}`;
  const { data, isLoading, error } = useApiData(apiUrl);

  return { nowPlaying: data, isNowPlayingMoviesLoading: isLoading, error };
};

export const useSearchMovieByGenre = (genreId: number) => {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${moviedbApiKey}&with_genres=${genreId}`;
  const { data, isLoading, error } = useApiData(apiUrl);

  return { moviesByGenre: data, isMoviesByGenreLoading: isLoading, error };
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue !== null) {
        return JSON.parse(serializedValue);
      }
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setValue: updateValue };
};
