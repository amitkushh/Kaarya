import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="h-screen flex justify-center items-center px-5 sm:px-15 md:px-20 lg:px-32">
      <div className="flex flex-col items-center gap-5 bg-[#131313] p-10">
        <h1 className="text-xl font-semibold">Sign Up</h1>
        <form className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            required
            className="text-sm font-light py-2 px-4 border border-gray-600 text-gray-400"
          />
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="text-sm font-light py-2 px-4 border border-gray-600 text-gray-400"
          />
          <input
            type="password"
            placeholder="Enter your password"
            required
            className="text-sm font-light py-2 px-4 border border-gray-600 text-gray-400"
          />
        </form>
        <div className="text-center mt-2">
          <button className="py-2 px-4 bg-white text-black text-md hover:bg-white/80 cursor-pointer mb-2 w-full">
            Sign Up
          </button>
          <p className="text-sm font-light text-gray-400">
            Already have an account{" "}
            <Link to="/login">
              <span className="font-medium text-white">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
