export const ADD_SUCCESS = 'ADD_SUCCESS';
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS';

export const addSuccess = (text) => {
  return {
    type: 'ADD_SUCCESS',
    text
  };
};

export const removeSuccess = (id) => {
  return {
    type: 'REMOVE_SUCCESS',
    id
  };
};
