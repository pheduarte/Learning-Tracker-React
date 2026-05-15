import { useTheme } from "../../context/useTheme";
// import Button from "./ui/Button";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="settings">
      <p>Switch to {theme === "light" ? "dark" : "light"} mode </p>

      {/* <Button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </Button> */}

      <div className="relative inline-block w-11 h-5">
        <input
          checked={theme === "dark"}
          onChange={toggleTheme}
          id="switch-component-blue"
          type="checkbox"
          className="peer appearance-none w-11 h-5 bg-slate-300 rounded-full checked:bg-blue-600 cursor-pointer transition-colors duration-300"
        />
        <label
          htmlFor="switch-component-blue"
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-600 cursor-pointer"
        ></label>
      </div>
    </section>
  );
}

export default Settings;
