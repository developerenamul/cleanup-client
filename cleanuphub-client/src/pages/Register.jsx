import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const Register = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  // ✅ Password validation conditions
  const conditions = [
    {
      id: 1,
      text: "Must have an Uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      id: 2,
      text: "Must have a Lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      id: 3,
      text: "Length must be at least 6 characters",
      valid: password.length >= 6,
    },
  ];

  // 🔹 Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;

    if (!/[A-Z]/.test(password))
      return toast.error(
        "Password must include at least one uppercase letter!"
      );
    if (!/[a-z]/.test(password))
      return toast.error(
        "Password must include at least one lowercase letter!"
      );
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long!");

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName: name, photoURL: photo });

      // Optional: Save user in MongoDB
      const saveUser = { name, email, photoURL: photo };
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      toast.success("Registration successful!");
      form.reset();
      setPassword("");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const saveUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                name="name"
                required
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                required
              />
              <label className="label">Photo URL</label>
              <input
                type="text"
                className="input"
                placeholder="Photo URL"
                name="photo"
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* 🔹 Show conditions dynamically */}
              {password.length > 0 && (
                <ul className="mt-2 text-sm transition-all duration-300">
                  {conditions
                    .filter((c) => !c.valid)
                    .map((cond) => (
                      <li
                        key={cond.id}
                        className="text-red-500 flex items-center gap-1"
                      >
                        ⚠️ {cond.text}
                      </li>
                    ))}
                </ul>
              )}

              <button className="btn btn-neutral mt-4 w-full">Register</button>
            </fieldset>
          </form>

          <p className="text-center mt-2">OR</p>

          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] flex justify-center items-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center mt-3">
            Already Have Account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
