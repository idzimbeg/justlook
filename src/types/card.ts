import { MovieItem } from 'types';

export interface CardProps {
  id: number;
  title: string;
  status: string | number;
  poster: string;
  release_date?: string;
  vote_average?: number;
  className?: string;
  overview?: string;
  slidesPerView?: number;
  backdrop: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: ({ id, title }: MovieItem) => void;
}
