import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Vernon Village</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        <Link className="mx-2" to="/announcements">Announcements</Link>
        <Link className="mx-2" to="/submit">Submit</Link>
        <Link className="mx-2" to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
