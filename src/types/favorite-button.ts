import { MovieItem } from 'types';

export interface FavoriteButtonProps {
  id: number;
  title: string;
  backdrop: boolean;
  buttonClassName?: string;
  iconClassName?: string;
  isFavorite: (id: number) => boolean;
  toggleFavorite: ({ id, title }: MovieItem) => void;
}
