import { useTheme } from "../context/useTheme";
import Button from "./ui/Button";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="settings">
      <p>Settings coming soon!</p>

      <Button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </Button>
    </section>
  );
}

export default Settings;
