import { useEffect } from 'react';
import { useLocalStorage } from 'services';
import { MovieItem } from 'types';

export function useFavorites() {
  const { value: favorites, setValue: setFavorites } = useLocalStorage<MovieItem[]>('favorites', []);

  function isFavorite(id: number): boolean {
    return favorites.some((favorite) => favorite.id === id);
  }

  const updateLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
    const event = new CustomEvent('localStorageChange', { detail: { key, value } });
    window.dispatchEvent(event);
  };

  function toggleFavorite({ id, title }: MovieItem): void {
    const isAlreadyFavorite = isFavorite(id);

    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter((value) => value.id !== id);
      setFavorites(updatedFavorites);
      updateLocalStorage('favorites', JSON.stringify(updatedFavorites));
    } else {
      const newFavorite: MovieItem = { id, title };
      const updatedFavorites: MovieItem[] = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      updateLocalStorage('favorites', JSON.stringify(updatedFavorites));
    }
  }

  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent instanceof CustomEvent && customEvent.detail.key === 'favorites') {
        const newValue = customEvent.detail.value;
        setFavorites(JSON.parse(newValue));
      }
    };

    window.addEventListener('localStorageChange', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange as EventListener);
    };
  }, [favorites, setFavorites]);

  return { favorites, isFavorite, toggleFavorite };
}
