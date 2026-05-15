import type { ActiveTab } from "./ui/Navbar";
import { IconHandLoveYou } from "@tabler/icons-react";

type HeaderProps = {
  tab: ActiveTab;
};

function Header({ tab }: HeaderProps) {

  return (
    <header className="app-header">
      {tab === "home" && 
      <div>
        <h1 className="text-lg font-bold">Welcome </h1>
        <IconHandLoveYou stroke={2} />
      </div>}
      {tab === "todo" && <h1 className="text-lg font-bold">Tasks</h1>}
      {tab === "notes" && <h1 className="text-lg font-bold">Notes</h1>}
      {tab === "settings" && <h1 className="text-lg font-bold">Settings</h1>}
    </header>
  );
}

export default Header;