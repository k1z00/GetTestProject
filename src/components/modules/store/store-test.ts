import { create } from "zustand";

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
  title: string;
  seed: string;
  source: string;
  questions: Question[];
}

interface FetchState {
  test: TestResponse | null; 
  setTest: (test: TestResponse) => void; 
  resetTest: () => void; 
}

export const useFetchStore = create<FetchState>((set) => ({
  test: null, 
  setTest: (test: TestResponse) => set({ test }),
  resetTest: () => set({ test: null }), 
}));
