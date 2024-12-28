import { ofetch } from "ofetch";
import { PaginatedTestsResponse, TestResponse, AuthResponse, SignInRequest, User } from "../../types/models/test";

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



const FetchAuthUser = async (token: string) => {
  const response = await fetch("http://localhost:8000/api/v1/auth", {
    method: "GET",
    headers: {
      "x-authorizaition": `Bearer ${token}`, 
    },
  });

  console.log('sd', token)
  if (!response.ok) {
    throw new Error(`Failed to fetch auth user: ${response.statusText}`);
  }

  return response.json();
};


async function SignInUser(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Failed to sign in: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


const SignUpUser = async (email: string, verificationCode: string, password: string, name: string) => {
  const response = await fetch("http://localhost:8000/api/v1/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      email_verification_code: verificationCode,
      password,
      name
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to sign up: ${response.statusText}`);
  }

  return response.json(); 
};




const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await ofetch(`http://localhost:8000/api/v1/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${id} `,
      },
    });

    return response;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw new Error("Не удалось получить данные пользователя");
  }
};




const fetchUserPermissions = async (id: string): Promise<string[]> => {
  try {
    const permissions = await ofetch<string[]>(`http://localhost:8000/api/v1/user/${id}/permisson`, {
      method: 'GET',
    });
    console.log('Права пользователя:', permissions);
    return permissions;
  } catch (error) {
    console.error('Ошибка при получении прав пользователя:', error);
    throw error;
  }
};


export const apiClient = {
  FetchTest,
  FetchTestById,
  FetchTestsList,
  SignInUser,
  FetchAuthUser,
  getUserById,
  fetchUserPermissions,
  SignUpUser
};
