import { getIngreduents } from './../api.js';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export function getItems() {
    
    return function(dispatch) {
      dispatch({
        type: GET_ITEMS_REQUEST
      });
      getIngreduents()
      .then(res => {
        if (res) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      })
      .catch(e=>console.log(e));
    };
  }