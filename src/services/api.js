import { BASE_URL } from "./../utils/const";
import { checkResponse } from "./../utils/checkResponse";

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
