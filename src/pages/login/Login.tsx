import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate("/features");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="mb-6 font-bold text-gray-800 text-2xl text-center">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <FiMail className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
            <input
              id="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="py-2 pr-3 pl-10 border focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block mb-1 font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <FiLock className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
            <input
              id="password"
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter your password"
              className="py-2 pr-3 pl-10 border focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg w-full font-semibold text-white transition"
        >
          Login
        </button>

        <div className="flex justify-between mt-4 text-gray-500 text-sm">
          <a href="/forgot-password" className="hover:text-blue-600 transition">
            Forgot Password?
          </a>
          <a href="/register" className="hover:text-blue-600 transition">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
