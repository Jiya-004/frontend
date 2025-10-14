import LandingPage from "./Pages/LandingPage";
import SignUp from "./Pages/signup";
import Login from "./Pages/login";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
 


function App() {
  return (<>
  <Navbar></Navbar>
    <Router>
      <Routes>
         {/* Landing page will load first */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          

      </Routes>
    </Router>
    </>

  );
}

export default App;