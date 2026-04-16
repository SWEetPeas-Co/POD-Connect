// src/lib/favoritesContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth } from '@/src/lib/firebase';
import { getClubs } from '@/src/lib/api';

type FavoritesContextType = {
  favoriteIds: string[];
  toggleFavorite: (clubId: string, userId: string) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // ⭐ Load membership state from backend on startup
  useEffect(() => {
    async function loadFavorites() {
      const user = auth.currentUser;
      if (!user) return;

      const clubs = await getClubs();
      const joined = clubs
        .filter((c: { members:string[]; }) => c.members?.includes(user.uid))
        .map((c: { _id: string; }) => c._id);

      setFavoriteIds(joined);
    }

    loadFavorites();
  }, []);

  // ⭐ Toggle membership + update backend
  async function toggleFavorite(clubId: string, userId: string) {
    const isFavorite = favoriteIds.includes(clubId);
    const endpoint = isFavorite ? "leave" : "join";

    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/clubs/${clubId}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      // Update local state AFTER backend succeeds
      setFavoriteIds(prev =>
        isFavorite
          ? prev.filter(id => id !== clubId)
          : [...prev, clubId]
      );

    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
