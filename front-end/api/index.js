// const API_URL = 'http://localhost:3000/v1';
const API_URL = 'https://damp-forest-12839.herokuapp.com/v1';
export const SIGNIN_URL = `${API_URL}/signin`;
export const SIGNUP_URL = `${API_URL}/signup`;
export const USERS_URL = (user_id) => `${API_URL}/users/${user_id}`;
export const TODOS_URL = (connectionId) => `${API_URL}/connections/${connectionId}/todos`;
export const TODO_URL = (connectionId, todo_id) => `${API_URL}/connections/${connectionId}/todos/${todo_id}`;
export const CONNECTION_URL = (connectionId) => `${API_URL}/connection/${connectionId}`;
export const PLANT_URL = (connectionId) => `${API_URL}/connection/${connectionId}/plant`;
