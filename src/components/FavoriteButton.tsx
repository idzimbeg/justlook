/* eslint-disable max-len */
import { BookmarkIcon } from '@heroicons/react/24/solid';

import { cx } from 'helpers';
import { FavoriteButtonProps } from 'types';

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  title,
  backdrop,
  buttonClassName,
  iconClassName,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <button
      type="button"
      className={cx(
        'absolute z-50 flex items-center justify-center',
        backdrop
          ? 'left-12 top-0 h-7 w-7 rounded-full bg-black/40 opacity-0 transition-opacity duration-300 ease-in-out group-hover/card:opacity-100'
          : '-top-1 left-3',
        buttonClassName,
      )}
      onClick={() => toggleFavorite({ id, title })}
      aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
    >
      <BookmarkIcon className={cx(isFavorite(id) ? 'text-white/80' : 'text-white/20', backdrop ? 'w-4' : 'w-8', iconClassName)} />
    </button>
  );
};
