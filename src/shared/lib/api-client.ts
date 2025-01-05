
import { PaginatedTestsResponse, TestResponse, User } from "../../types/models/test";
import customFetch from  './custom-fetch'





async function FetchTest(
  title?: string,
  source?: string
): Promise<TestResponse> {
  try {
    const response = await customFetch<TestResponse>("/api/v1/llvm/generate-test", {
      method: "POST",
      body: {
        title: title || "Default Title",
        source: source || "Default Source",
        counts: 5,
      },
    });

    return response;
  } catch (error) {
    const typedError = error as Error;
    console.error("Failed to generate test:", typedError.message);
    throw new Error(`Failed to generate test: ${typedError.message}`);
  }
}

async function FetchTestById(id: string): Promise<TestResponse> {
  try {
    const response = await customFetch<TestResponse>(`/api/v1/test/${id}`, {
      method: "GET",
    });

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
    const response = await customFetch<PaginatedTestsResponse>(
      `/api/v1/test/list?page=${page}&limit=10`,
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

const FetchAuthUser = async () => {
  try {
    const response = await customFetch("/api/v1/auth", {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch auth user:", error);
    throw new Error(`Failed to fetch auth user: ${error}`);
  }
};

async function SignInUser(email: string, password: string) {
  try {
    const response = await customFetch("/api/v1/auth/sign-in", {
      method: "POST",
      body: { email, password },
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const SignUpUser = async (
  email: string,
  verificationCode: string,
  password: string,
  name: string
) => {
  try {
    const response = await customFetch("/api/v1/auth/sign-up", {
      method: "POST",
      body: {
        email,
        email_verification_code: verificationCode,
        password,
        name,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to sign up:", error);
    throw new Error(`Failed to sign up: ${error}`);
  }
};

const GetUserById = async (id: string): Promise<User> => {
  try {
    const response = await customFetch<User>(`/api/v1/user/${id}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw new Error("Не удалось получить данные пользователя");
  }
};

const FetchUserPermissions = async (id: string): Promise<string[]> => {
  try {
    const permissions = await customFetch<string[]>(
      `/api/v1/user/${id}/permisson`,
      {
        method: "GET",
      }
    );

    return permissions;
  } catch (error) {
    console.error("Ошибка при получении прав пользователя:", error);
    throw error;
  }
};

export const apiClient = {
  FetchTest,
  FetchTestById,
  FetchTestsList,
  SignInUser,
  FetchAuthUser,
  GetUserById,
  FetchUserPermissions,
  SignUpUser,
};
