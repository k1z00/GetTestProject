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
  data: TestResponse | null;
  setData: (data: TestResponse) => void;
  resetData: () => void;
}

export const useTestStore = create<FetchState>((set) => ({
  data: null,
  setData: (data: TestResponse) => set({ data }),
  resetData: () => set({ data: null }),
}));
