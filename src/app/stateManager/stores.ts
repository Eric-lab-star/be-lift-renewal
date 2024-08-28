import { create } from "zustand";

interface IBearStore {
  bears: number;
	nuts: number;
	honey: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<IBearStore>()((set) => ({
  bears: 0,
	nuts: 0,
	honey:0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

interface IMovie {
	movies: number;
	increaseMovies: () => void;
}

export const useMovie = create<IMovie>()((set)=>({
	movies: 0,
	increaseMovies: () => set((state) => ({ movies: state.movies + 1 }))
}))
