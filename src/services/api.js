import { BASE_URL } from "./../utils/const";
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngreduents = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}ingredients`)
      .then(checkResponse)
      .then((jsonData) => {
        resolve(jsonData);
      });
  });
};

export const orderRequest = (choosenIngredients) => {
  return new Promise((resolve, reject) => {
    const idsOfChoosenIngredients = choosenIngredients.map((ing) => ing._id);

    const url = `${BASE_URL}orders`;

    const data = {
      ingredients: idsOfChoosenIngredients,
    };

    const options = {
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
      });
  });
};

export const register = (userData) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
    };

    const options = {
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
      });
  });
};

export const login = (userData) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: userData.email,
      password: userData.password,
    };

    const options = {
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
      });
  });
};

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
    };

    const options = {
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
      });
  });
};

export const resetPassword = (password, token) => {
  return new Promise((resolve, reject) => {
    const data = {
      password: password,
      token: token,
    };

    const options = {
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
      });
  });
};

export const getUserData = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  };
  const url = `${BASE_URL}auth/user`;

  return await fetchWithRefresh(url, options);
};
export const updateUserData = async (userData) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(userData),
  };
  const url = `${BASE_URL}auth/user`;

  return await fetchWithRefresh(url, options);
};

export const logoutUser = () => {
  return new Promise((resolve, reject) => {
    const options = {
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
      });
  });
};
