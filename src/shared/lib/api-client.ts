import { ofetch } from "ofetch"; // Убедитесь, что ofetch установлен

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
  counts: number;
}
async function FetchTest(title?: string, source?: string): Promise<TestResponse> {
  try {
    const response = await ofetch<TestResponse>(
      "http://localhost:8000/api/v1/llvm/test",
      {
        method: "POST",
        body: {
          title: title,
          source: source,
          counts: 5,
        },
      }
    );

    console.log("Test generated successfully:", response);
    return response;
  } catch (error) {
     const typedError = error as Error;
    console.error("Failed to generate test:", typedError.message);
    throw new Error("Failed to generate test");
  }
}

export const apiClient = {
  FetchTest,
};
