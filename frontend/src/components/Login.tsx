import logo from "../assets/Brightest-logo's/logo.png";
import { FaMicrosoft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type LoginProps = {
  handleLogin: () => void;
};
const Login = ({ handleLogin }: LoginProps) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
      const res = await fetch("http://localhost:5076/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Logged in:", data);
         navigate("/");
      } else {
        console.log("Login failed");
      }
    };
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center">

        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Brightest logo"
            data-testid="login-logo"
            className="h-60 w-auto mb-4 -mt-10"
          />
        </div>

        {/* Card */}
        <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">

          {/* Form section */}
          <div className="bg-white px-16 py-12 flex flex-col items-center">
            <form className="w-full max-w-sm space-y-6">

              <input
                type="text"
                placeholder="Gebruikersnaam"
                value={username}
                data-testid="login-username-input"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-yellow-400 py-2 bg-transparent font-semibold"
                 onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Wachtwoord"
                data-testid="login-password-input"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-yellow-400 py-2 bg-transparent font-semibold"
              />

              { <button
                type="button"
                data-testid="login-submit-button"
                 onClick={handleSubmit}
                className="w-full bg-[#F4C709] font-semibold hover:scale-102 transition-all duration-300 ease-in-out rounded-md py-2 font-medium text-[#3C3C3B] font-ttnorms cursor-pointer"
              >
                Login
              </button> }
               

            </form>

            <div className="my-6 text-black font-bold">of</div>
                {/*  data-testid="microsoft-login-button" */}
            <button
              type="button"
              onClick={handleLogin}
              data-testid="microsoft-login-button"
              className="flex items-center gap-2 border px-4 py-2 rounded-md bg-white cursor-pointer shadow-sm font-ttnorms hover:scale-105 transition-transform duration-200"
            >
              <FaMicrosoft />
              Sign in with Microsoft
            </button>

          </div>

          {/* Bottom section */}
          <div className="bg-gray-800 text-white px-16 py-8 flex justify-between text-sm">
            <div>
              <p className="font-semibold mb-2">Publieke gebruikersnaam:</p>
              <p>standaard_gebruiker</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Publiek wachtwoord:</p>
              <p>Pass123!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;