import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 text-white flex justify-between shadow-lg">
      <h1 className="text-2xl font-bold text-secondary">Intellica</h1>
      <div>
        <Link className="px-4 hover:text-secondary" to="/">Home</Link>
        <Link className="px-4 hover:text-secondary" to="/register">Register</Link>
        <Link className="px-4 hover:text-secondary" to="/login">Login</Link>
        <Link className="px-4 hover:text-secondary" to="/quiz">Quiz</Link>
        <Link className="px-4 hover:text-secondary" to="/learning-path">Learning Path</Link>
        <Link className="px-4 hover:text-secondary" to="/recommendations">Courses</Link>
        <Link className="px-4 hover:text-secondary" to="/youtube">YouTube</Link>
      </div>
    </nav>
  );
};

export default Navbar;
