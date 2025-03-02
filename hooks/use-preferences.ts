import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  industry: string;
  goals: string[];
  experience: string;
  interests: string[];
  background: string;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  clearPreferences: () => void;
}

export const usePreferences = create<UserPreferences>()(
  persist(
    (set) => ({
      industry: "",
      goals: [],
      experience: "",
      interests: [],
      background: "",
      setPreferences: (preferences) => set((state) => ({ ...state, ...preferences })),
      clearPreferences: () => set({ industry: "", goals: [], experience: "", interests: [], background: "" }),
    }),
    {
      name: 'user-preferences',
    }
  )
);