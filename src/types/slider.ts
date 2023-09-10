import { MovieItem } from 'types';

export interface SliderProps {
  data: any;
  title?: string;
  favorites?: any;
  slidesPerView?: number;
  currentFavorites: any[];
  className?: string;
  cardClassName?: string;
  backdrop: boolean;
  status?: string | number;
  customBreakpoints?: {
    [key: number]: { width: number; slidesPerView: number };
  };
  isFavorite: (id: number) => boolean;
  toggleFavorite: ({ id, title }: MovieItem) => void;
}
