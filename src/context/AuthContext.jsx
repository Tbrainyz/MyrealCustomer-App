import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return { ...initialState, token: null, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.me()
        .then(res => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: res.data.data, token },
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login(email, password);
    const { token, user } = res.data.data;
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user) => dispatch({ type: 'UPDATE_USER', payload: user });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}