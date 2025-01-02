import React from 'react';
import { Link } from 'react-router';

const Navigation = ({ user, handleLogout }) => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
      <div className="flex items-center">
        {user ? (
          <em className="mr-4">{user.name} logged in</em>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">
            login
          </Link>
        )}
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
          logout
        </button>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="text-gray-300 hover:text-white">
              blogs
            </Link>
          </li>
          <li>
            <Link to="/new" className="text-gray-300 hover:text-white">
              new blog
            </Link>
          </li>
          <li>
            <Link to="/creators" className="text-gray-300 hover:text-white">
              users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;