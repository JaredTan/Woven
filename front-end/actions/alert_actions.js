export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const addAlert = (text) => {
  return {
    type: 'ADD_ALERT',
    text
  };
};

export const removeAlert = (id) => {
  return {
    type: 'REMOVE_ALERT',
    id
  };
};
