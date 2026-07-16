import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <nav className="navbar">

      <h2>TaskFlow</h2>

      <div>

        <Link to="/dashboard">Dashboard</Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;