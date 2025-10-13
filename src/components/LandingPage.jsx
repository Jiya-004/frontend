import { useNavigate } from "react-router-dom";
import "../css/Landing.css";
// NOTE: Make sure the path to your image is correct!
import landingImage from '../assets/LandingImage.png'; 

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      
      <div className="landing-container-split">
        
        {/* LEFT COLUMN: The White Content Box */}
        <div className="content-panel">
          <h1>Welcome to our page!</h1>
          <p>Creativity delivered to your doorstep ✨📦</p>
          <div className="landing-buttons">
            <button onClick={() => navigate("/signup")}>Signup</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Image Panel */}
        <div className="image-panel">
          <img 
            src={landingImage} 
            alt="Creativity and Flowers" 
            className="split-image" 
          />
        </div>

      </div>
    </div>
  );
}

export default Landing;