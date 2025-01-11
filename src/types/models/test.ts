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
  id: number ;
  title: string;
  seed: string;
  source: string;
  questions: Question[];
  counts: number;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
}

interface PaginatedTestsResponse {
  data: TestResponse[];
  pagination: Pagination;
}

interface User {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface SignInRequest {
  email: string;
  password: string;
}



export type { PaginatedTestsResponse, TestResponse, AuthResponse, SignInRequest, User, Question, Answer } 