import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { authAPI } from '../api';

// ─── Role constants (mirrors backend) ────────────────────────────────────────
export const ROLES = {
  ADMIN:              'admin',
  INVENTORY_MANAGER:  'inventory_manager',
  FINANCE_MANAGER:    'finance_manager',
  MESSAGING_MANAGER:  'messaging_manager',
};

// Which routes each role can access
export const ROLE_ACCESS = {
  admin:              ['*'],
  inventory_manager:  ['/inventory', '/stock-movements', '/dashboard', '/settings'],
  finance_manager:    ['/invoices', '/expenses', '/cashflow', '/dashboard', '/settings'],
  messaging_manager:  ['/contacts', '/compose', '/scheduled', '/templates', '/logs', '/dashboard', '/settings'],
};

export const ROLE_LABELS = {
  admin:              'Administrator',
  inventory_manager:  'Inventory Manager',
  finance_manager:    'Finance Manager',
  messaging_manager:  'Messaging Manager',
};

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

const initialState = {
  user:            null,
  token:           localStorage.getItem('token'),
  isAuthenticated: false,
  loading:         true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { ...initialState, token: null, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.me()
        .then(res => dispatch({ type: 'LOGIN_SUCCESS', payload: { user: res.data.data, token } }))
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
    return user;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback((user) => dispatch({ type: 'UPDATE_USER', payload: user }), []);

  // ── Role helpers ────────────────────────────────────────────────────────────
  const isAdmin = state.user?.role === ROLES.ADMIN;

  // canAccess('/invoices') → true/false
  const canAccess = useCallback((path) => {
    const role = state.user?.role;
    if (!role) return false;
    if (role === ROLES.ADMIN) return true;
    const allowed = ROLE_ACCESS[role] || [];
    return allowed.some(p => path.startsWith(p));
  }, [state.user]);

  // hasRole('finance_manager') or hasRole(['finance_manager','admin'])
  const hasRole = useCallback((...roles) => {
    const role = state.user?.role;
    return roles.flat().includes(role);
  }, [state.user]);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      updateUser,
      isAdmin,
      canAccess,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
