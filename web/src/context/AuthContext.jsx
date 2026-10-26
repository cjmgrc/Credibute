import { jsx as _jsx } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { USER } from "@/mocks/data";
const AuthContext = createContext(null);
const KEY = "credibute.session";
/** Mock session. Replace with the real session/cookie check when the backend exists. */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? "null");
    } catch {
      return null;
    }
  });
  const signIn = useCallback((email, name) => {
    const u = {
      name:
        name?.trim() ||
        (email === USER.email ? USER.name : email.split("@")[0]),
      email,
    };
    setUser(u);
    try {
      localStorage.setItem(KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
  }, []);
  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);
  const value = useMemo(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut],
  );
  return _jsx(AuthContext.Provider, { value: value, children: children });
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
export default AuthProvider;
