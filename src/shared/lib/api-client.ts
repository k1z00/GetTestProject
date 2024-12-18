import { ofetch } from "ofetch";

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

interface PaginatedTestsResponse {
  tests: TestResponse[];
  total: number;
  page: number;
  pageSize: number;
}

async function FetchTest(
  title?: string,
  source?: string
): Promise<TestResponse> {
  try {
    const response = await ofetch<TestResponse>(
      "http://localhost:8000/api/v1/llvm/generate-test",
      {
        method: "POST",
        body: {
          title: title || "Default Title",
          source: source || "Default Source",
          counts: 5,
        },
      }
    );

    return response;
  } catch (error) {
    const typedError = error as Error;
    console.error("Failed to generate test:", typedError.message);
    throw new Error(`Failed to generate test: ${typedError.message}`);
  }
}

async function FetchTestById(id: string): Promise<TestResponse> {
  try {
    const response = await ofetch<TestResponse>(
      `http://localhost:8000/api/v1/test/${id}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    const typedError = error as Error;
    console.error("Failed to fetch test:", typedError.message);
    throw new Error(`Failed to fetch test: ${typedError.message}`);
  }
}

async function FetchTestsList(
  page: number = 1
): Promise<PaginatedTestsResponse> {
  try {
    const response = await ofetch<PaginatedTestsResponse>(
      `http://localhost:8000/api/v1/test/list?page=${page}&limit=10`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    const typedError = error as Error;
    console.error("Failed to fetch tests list:", typedError.message);
    throw new Error(`Failed to fetch tests list: ${typedError.message}`);
  }
}

export const apiClient = {
  FetchTest,
  FetchTestById,
  FetchTestsList,
};
