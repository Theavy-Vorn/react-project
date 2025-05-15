import { actionTypes } from "../actions/actionType";

const secureStorage = {
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  },
};

// ✅ Get auth from secureStorage
const auth = secureStorage.getItem('auth');

// ✅ Initialize state based on auth presence
const initialState = auth
  ? { isLogin: true, auth: auth }
  : { isLogin: false, auth: null };

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOGIN:
      secureStorage.setItem('auth', payload); 
      return { ...state, isLogin: true, auth: payload };

    case actionTypes.LOGOUT:
      secureStorage.removeItem('auth'); 
      return { ...state, isLogin: false, auth: null };
    case actionTypes.LOGOUT:
      return { ...state,isLogin:false,auth:payload}
    default:
      return state;
  }
};
