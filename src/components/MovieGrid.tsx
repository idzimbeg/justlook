import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Card } from 'components';
import { Movie, SliderProps } from 'types';
import { cx } from 'helpers';

// eslint-disable-next-line no-var, import/no-extraneous-dependencies
var uniqid = require('uniqid');

interface MovieGridProps extends SliderProps {
  data: {
    results: { movie: Movie }[];
  }[];
  className?: string;
  cardClassName?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  data,
  className,
  cardClassName,
  title,
  backdrop = false,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <Swiper
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 1.2,
        },
        768: {
          width: 768,
          slidesPerView: 2,
        },
      }}
      spaceBetween={20}
      className={cx('container mx-auto w-full', className)}
    >
      {data.map((movieData) => (
        <div className="mx-auto flex w-full items-center justify-center gap-2 px-16" key={uniqid()}>
          <SwiperSlide
            key={uniqid()}
            className="mx-auto flex  w-full flex-col items-center justify-center gap-4 px-2 align-middle sm:px-20"
          >
            <div className="flex w-full justify-start text-left" key={uniqid()}>
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            {movieData.results.map((movie: { movie: Movie }, index: number) => (
              <Card
                key={movie.movie.id}
                id={movie.movie.id}
                title={movie.movie.title}
                status={index + 1}
                poster={movie.movie.poster_path}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                className={cx('h-32 w-1/2 md:h-full md:w-full', cardClassName)}
                overview={movie.movie.overview}
                backdrop={backdrop}
                vote_average={movie.movie.vote_average}
                release_date={movie.movie.release_date}
              />
            ))}
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};
