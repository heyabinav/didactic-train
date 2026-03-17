import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [testConfig, setTestConfig] = useState({ mode: 'time', duration: 60, difficulty: 'medium', useAi: false });
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const login = (authPayload) => {
    setUser(authPayload.user);
    setToken(authPayload.token);
    localStorage.setItem('user', JSON.stringify(authPayload.user));
    localStorage.setItem('token', authPayload.token);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      user,
      token,
      login,
      logout,
      testConfig,
      setTestConfig,
      latestResult,
      setLatestResult
    }),
    [theme, user, token, testConfig, latestResult]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
