import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
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
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
