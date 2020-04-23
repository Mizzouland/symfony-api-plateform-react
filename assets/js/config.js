// export const API_URL = "http://127.0.0.1:8000/api/";
export const API_URL = process.env.API_URL;

export const CUSTOMER_API = API_URL + "customers";
export const CUSTOMER_API_2 = API_URL + "clients";
export const INVOICES_API = API_URL + "invoices";
export const USERS_API = API_URL + "users";
export const LOGIN_API = API_URL + "login_check";