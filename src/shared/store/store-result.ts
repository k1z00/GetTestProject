import{ create }from "zustand";



interface TestResultsState {
  results: Record<number, number>; // { testId: score }
  addResult: (testId: number, score: number) => void;
}

export const useTestResultsStore = create<TestResultsState>((set) => ({
  results: {},
  addResult: (testId, score) =>
    set((state) => ({
      results: {
        ...state.results,
        [testId]: score, 
      },
    })),
}));
