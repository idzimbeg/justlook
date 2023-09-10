/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Card } from 'components';
import { Movie, SliderProps } from 'types';

import 'swiper/css';
import { cx } from 'helpers';

const SlideButton = ({ direction }: { direction: string }) => {
  const swiper = useSwiper();

  const [showButton, setShowButton] = useState(false);

  const isNext = direction === 'next';
  const isPrev = direction === 'prev';

  const handleButtonClick = () => {
    if (isNext) {
      swiper.slideNext();
    } else if (isPrev) {
      swiper.slidePrev();
    }
  };

  useEffect(() => {
    const updateButtonVisibility = () => {
      if (isNext) {
        setShowButton(!swiper.isEnd);
        return;
      }
      if (isPrev) {
        setShowButton(!swiper.isBeginning);
      }
    };

    updateButtonVisibility();

    swiper.on('slideChange', updateButtonVisibility);

    return () => {
      swiper.off('slideChange', updateButtonVisibility);
    };
  }, [swiper, isNext, isPrev]);

  return showButton ? (
    <div
      className={cx(
        'absolute top-0 z-20 h-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100',
        isNext ? 'right-0 rounded-r-md' : 'left-0 rounded-l-md',
      )}
    >
      <button
        type="button"
        onClick={handleButtonClick}
        className={cx(
          'z-20 flex h-full items-center justify-center align-middle text-6xl font-semibold opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100',
        )}
      >
        {isNext ? '>' : '<'}
      </button>
    </div>
  ) : null;
};

export const Slider: React.FC<SliderProps> = ({
  data,
  slidesPerView,
  className,
  status,
  cardClassName,
  customBreakpoints,
  backdrop = true,
  isFavorite,
  toggleFavorite,
}) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (data) {
      setLoaded(true);
    }
  }, [data]);
  return (
    <Swiper
      breakpoints={customBreakpoints}
      draggable={false}
      spaceBetween={20}
      className={cx('group/slider p-12', className)}
      slidesPerView={slidesPerView}
    >
      {data &&
        data.results &&
        data.results.map((movie: Movie) => (
          <SwiperSlide key={movie.id} className="mx-0 flex flex-col p-0 px-0 md:justify-center">
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              status={status || ''}
              poster={movie.poster_path}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              className={cx('h-64', cardClassName)}
              overview={movie.overview}
              backdrop={backdrop}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
            />
            {backdrop && (
              <div className="flex">
                <div
                  className={cx(
                    'scale-x-1 h-1 w-3/6 transform bg-gradient-to-r from-common-yellow to-common-red delay-100 duration-[2000ms] ease-in-out group-hover:scale-y-100',
                    !loaded && 'w-0',
                  )}
                />
                <span className="z-50 -ml-2 -mt-3">🔥</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      <SlideButton direction="next" />
      <SlideButton direction="prev" />
    </Swiper>
  );
};
