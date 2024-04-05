export const getIngreduents = () => {
  return new Promise((resolve, reject) => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => {

          if (res.ok) {

            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((jsonData) => {
          resolve(jsonData)
        })
        .catch(e=> {
          return e
        })
      })
}


export const orderRequest = (choosenIngredients) => {
  return new Promise((resolve, reject) => {

    const idsOfChoosenIngredients = choosenIngredients.map( ing => ing._id)


    const url = 'https://norma.nomoreparties.space/api/orders';

  const data = {
    "ingredients": idsOfChoosenIngredients
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data)
  };

  // Выполняем запрос
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json(); // Распарсим JSON из ответа
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    });
  })
}
