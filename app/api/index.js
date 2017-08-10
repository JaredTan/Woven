var API_URL = 'http://localhost:3000/v1';
// var API_URL = heroku app later.
export const SIGNIN_URL = `${API_URL}/signin`;
export const SIGNUP_URL = `${API_URL}/signup`;
export const USERS_URL = (user_id) => `${API_URL}/users/${user_id}`;
export const TODOS_URL = (user_id) => `${API_URL}/users/${user_id}/todos`;
export const TODO_URL = (user_id, todo_id) => `${API_URL}/users/${user_id}/todos/${todo_id}`;
export const CONNECTION_URL = (connection_id) => `${API_URL}/connection/${connection_id}`;
