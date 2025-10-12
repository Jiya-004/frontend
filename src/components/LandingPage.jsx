import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to Our App 🚀</h1>
      <p>This is the landing page of your Laravel + React project.</p>

      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}
