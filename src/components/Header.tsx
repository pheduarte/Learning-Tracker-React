// Header component: A simple, stateless component that displays the app's main header
// This component doesn't receive any props and doesn't manage state
// It's a good example of a simple, reusable component
function Header() {
  return (
    <header>
      {/* Main application title */}
      <h1>Learning Tracker</h1>
      {/* Subtitle explaining the app's purpose */}
      <p>This app will help you track your learning progress.</p>
    </header>
  );
}

// Export this component so other files can import and use it
export default Header;
