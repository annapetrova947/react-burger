import { BASE_URL } from "../utils/const";

type UserData = {
  email: string;
  password: string;
  name?: string;
};

type Ingredient = {
  _id: string;
};

type TokenData = {
  success: any;
  accessToken: string;
  refreshToken: string;
};

const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
};

export const refreshToken = async (): Promise<TokenData> => {
  const res = await fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  return checkResponse(res);
};

export const fetchWithRefresh = async (url: string, options: RequestInit): Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngreduents = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}ingredients`)
      .then(checkResponse)
      .then((jsonData) => {
        resolve(jsonData);
      })
      .catch(reject);
  });
};

export const orderRequest = (choosenIngredients: Ingredient[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const idsOfChoosenIngredients = choosenIngredients.map((ing) => ing._id);

    const url = `${BASE_URL}orders`;

    const data = {
      ingredients: idsOfChoosenIngredients,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then(checkResponse)
      .then((data) => {
        resolve(data);
      })
      .catch(reject);
  });
};

export const register = (userData: UserData): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${BASE_URL}auth/register`, options)
      .then(checkResponse)
      .then((jsonData) => {
        resolve(jsonData);
      })
      .catch(reject);
  });
};

export const login = (userData: UserData): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {
      email: userData.email,
      password: userData.password,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${BASE_URL}auth/login`, options)
      .then(checkResponse)
      .then((jsonData) => {
        if ("accessToken" in jsonData) {
          localStorage.setItem("accessToken", jsonData.accessToken);
        }
        if ("refreshToken" in jsonData) {
          localStorage.setItem("refreshToken", jsonData.refreshToken);
        }
        resolve(jsonData);
      })
      .catch(reject);
  });
};

export const forgotPassword = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${BASE_URL}password-reset`, options)
      .then(checkResponse)
      .then((jsonData) => {
        resolve(jsonData);
      })
      .catch(reject);
  });
};

export const resetPassword = (password: string, token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {
      password: password,
      token: token,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${BASE_URL}password-reset/reset`, options)
      .then(checkResponse)
      .then((jsonData) => {
        resolve(jsonData);
      })
      .catch(reject);
  });
};

export const getUserData = async (): Promise<any> => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken") || "",
    },
  };
  const url = `${BASE_URL}auth/user`;

  return await fetchWithRefresh(url, options);
};

export const updateUserData = async (userData: UserData): Promise<any> => {
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify(userData),
  };
  const url = `${BASE_URL}auth/user`;

  return await fetchWithRefresh(url, options);
};

export const logoutUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    };

    fetch(`${BASE_URL}auth/logout`, options)
      .then(checkResponse)
      .then((jsonData) => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        resolve(jsonData);
      })
      .catch(reject);
  });
};
