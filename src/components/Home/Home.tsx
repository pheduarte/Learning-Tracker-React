import Dashboard from "../MainDashboard";
import type { ActiveTab } from "../ui/Navbar";

type HomeProps = {
  onNavigate: (tab: ActiveTab) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  return (
    <main>
      <Dashboard onNavigate={onNavigate} />
    </main>
  );
}
