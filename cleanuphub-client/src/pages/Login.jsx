// import { useState, useContext } from "react";
// import { Link, useNavigate, useLocation } from "react-router";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { app } from "../firebase/firebase.init";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();
//   const navigate = useNavigate();
//   const location = useLocation(); // 🔹 get previous location
//   const { setUser } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 🔹 Determine redirect path after login
//   //   const from = location.state?.from?.pathname || "/";
//   const from = location.state?.from?.pathname || "/";
//   // navigate(from, { replace: true });
//   // 🔹 Email/Password login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       setUser(result.user);
//       toast.success("Login successful!");
//       navigate(from, { replace: true }); // redirect to original route
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // 🔹 Google login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);

//       // Optionally, save user to your MongoDB
//       const saveUser = {
//         name: result.user.displayName,
//         email: result.user.email,
//         photoURL: result.user.photoURL,
//       };
//       fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(saveUser),
//       });

//       toast.success("Google login successful!");
//       navigate(from, { replace: true }); // redirect to original route
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto mt-10">
//       <div className="card-body">
//         <form onSubmit={handleLogin}>
//           <fieldset className="fieldset">
//             <label className="label">Email</label>
//             <input
//               type="email"
//               className="input"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <label className="label">Password</label>
//             <input
//               type="password"
//               className="input"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <div>
//               <a className="link link-hover">Forgot password?</a>
//             </div>
//             <button type="submit" className="btn btn-neutral mt-4 w-full">
//               Login
//             </button>
//           </fieldset>
//         </form>

//         <p className="text-center mt-2">OR</p>

//         <button
//           onClick={handleGoogleLogin}
//           className="btn bg-white text-black border-[#e5e5e5] flex justify-center items-center gap-2 w-full mt-2"
//         >
//           <svg
//             aria-label="Google logo"
//             width="16"
//             height="16"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//           >
//             <g>
//               <path d="m0 0H512V512H0" fill="#fff"></path>
//               <path
//                 fill="#34a853"
//                 d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
//               ></path>
//               <path
//                 fill="#4285f4"
//                 d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
//               ></path>
//               <path
//                 fill="#fbbc02"
//                 d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
//               ></path>
//               <path
//                 fill="#ea4335"
//                 d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
//               ></path>
//             </g>
//           </svg>
//           Login with Google
//         </button>

//         <p className="mt-3 text-center">
//           Not Registered?{" "}
//           <Link to={"/register"} className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect after login
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto mt-10">
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            type="email"
            className="input mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Login
          </button>
        </form>

        <p className="text-center mt-2">OR</p>

        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5] flex justify-center items-center gap-2 w-full mt-2"
        >
          Login with Google
        </button>

        <p className="mt-3 text-center">
          Not Registered?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
