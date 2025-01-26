// components/Navbar.jsx

const Navbar = () => (
  <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <h1 className="text-xl font-bold">LOGO</h1>
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border rounded-md"
      />
      <img
        src="https://via.placeholder.com/30"
        alt="Admin User"
        className="ml-4 rounded-full"
      />
    </div>
  </div>
);

export default Navbar;
