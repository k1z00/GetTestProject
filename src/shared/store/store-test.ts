import { create } from "zustand";
import { apiClient } from "../lib/api-client";

interface Answer {
  value: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  typeAnswer: string;
  answers: Answer[];
}

interface TestResponse {
  id?: number;
  title: string;
  seed: string;
  source: string;
  questions: Question[];
  counts: number;
}

interface FetchState {
  test: TestResponse | null;
  setTest: (test: TestResponse) => void;
  resetTest: () => void;
  fetchTestById: (id: number) => Promise<void>; // Исправляем тип
}

export const useFetchStore = create<FetchState>((set) => ({
  test: null,
  setTest: (test: TestResponse) => set({ test }),
  resetTest: () => set({ test: null }),
  fetchTestById: async (id: number) => {
    try {
      const response = await apiClient.FetchTestById(id.toString()); 
      set({ test: response });
    } catch (error) {
      console.error("Failed to fetch test:", error);
    }
  },
}));
