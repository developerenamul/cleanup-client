// import { useContext, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate(null);

//   const links = (
//     <>
//       <li>
//         <NavLink to={"/"}>Home</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/issues"}>Issues</NavLink>
//       </li>
//     </>
//   );

//   const handleLogout = async () => {
//     try {
//       await signOutUser();
//       setDropdownOpen(false);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       {/* Left side */}
//       <div className="navbar-start">
//         {/* Mobile Menu */}
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div>
//         <Link to="/" className="btn btn-ghost text-xl">
//           CleanUpHub
//         </Link>
//       </div>

//       {/* Center Menu */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>

//       {/* Right side */}
//       <div className="navbar-end flex items-center gap-3 relative">
//         {!user ? (
//           <>
//             <Link to={"/login"} className="btn btn-sm">
//               Login
//             </Link>
//             <Link to={"/register"} className="btn btn-sm">
//               Register
//             </Link>
//           </>
//         ) : (
//           <div className="relative">
//             <img
//               src={user?.photoURL || "/default-avatar.png"}
//               alt="User"
//               className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             />

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-3 bg-base-100 shadow-md rounded-md w-40 p-2 animate-fadeIn">
//                 <p className="px-2 py-1 text-sm font-medium text-gray-600 border-b">
//                   {user.displayName || "User"}
//                 </p>
//                 <Link
//                   to="/profile"
//                   className="block px-2 py-1 hover:bg-gray-100 rounded"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to="/all-issues">All Issues</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/issues">Issues</NavLink>
        </li>
      )}
      {user && (
        <>
          {/* <li>
            <NavLink to="/all-issues">All Issues</NavLink>
          </li> */}
          <li>
            <NavLink to="/add-issue">Add Issue</NavLink>
          </li>
          <li>
            <NavLink to="/my-contributions">My Contributions</NavLink>
          </li>
          <li>
            <NavLink to="/my-issues">My Issues</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogout = async () => {
    await signOutUser();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          CleanUpHub
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex gap-2">
        {!user && (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}

        {user && (
          <div className="relative">
            <img
              onClick={() => setDropdownOpen(!dropdownOpen)}
              src={user.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
            />
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg py-2 z-10">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile">Profile</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
