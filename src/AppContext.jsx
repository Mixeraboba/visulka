import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [actionCount, setActionCount] = useState(0);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    setActionCount((c) => c + 1);
  };

  const incActions = () => setActionCount((c) => c + 1);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, actionCount, incActions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}