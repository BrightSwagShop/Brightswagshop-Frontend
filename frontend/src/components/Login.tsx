import logo from "../assets/Brightest-logo's/logo.png";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { login } from "../services/userService";
import { useAuth } from "../hooks/useAuth";

type LoginProps = {
  handleLogin: () => void;
};

type LoginFormValues = {
  username: string;
  password: string;
};

const validationSchema = Yup.object({
  username: Yup.string().required("Gebruikersnaam is verplicht"),
  password: Yup.string().required("Wachtwoord is verplicht"),
});

const Login = ({ handleLogin }: LoginProps) => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      const data = await login(values.username, values.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuthUser({
        id: data.user.id,
        username: data.user.username,
        favorites: data.user.favorites ?? [],
      });

      navigate("/");
    } catch {
      setStatus("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div>
          <img
            src={logo}
            alt="Brightest logo"
            data-testid="login-logo"
            className="h-60 w-auto mb-4 -mt-10"
          />
        </div>

        <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white px-16 py-12 flex flex-col items-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form className="w-full max-w-sm space-y-6">
                  <div>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Gebruikersnaam"
                      data-testid="login-username-input"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-yellow-400 py-2 bg-transparent font-semibold"
                    />
                    <ErrorMessage
                      name="username"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Wachtwoord"
                      data-testid="login-password-input"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-yellow-400 py-2 bg-transparent font-semibold"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {status && (
                    <p className="text-red-500 text-sm font-semibold">
                      {status}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="login-submit-button"
                    className="w-full bg-[#F4C709] font-semibold hover:scale-102 transition-all duration-300 ease-in-out rounded-md py-2 text-[#3C3C3B] font-ttnorms cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? "Bezig..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="my-6 text-black font-bold">of</div>

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
