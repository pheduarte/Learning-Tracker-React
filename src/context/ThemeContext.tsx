import { ThemeContext, type Theme } from "./theme";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>("app-theme", "light");

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app app--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
