import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition">
            Portfolio
          </Link>
          
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className={`transition ${
                  isActive('/') 
                    ? 'text-blue-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`transition ${
                  isActive('/projects') 
                    ? 'text-blue-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`transition ${
                  isActive('/about') 
                    ? 'text-blue-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
