import "../../index.css";

export default function InputForm() {
  return (
    <form className="flex flex-col gap-5 text-left">
      <label className="flex flex-col">
        <p className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200">
          Email Address
        </p>
        <input className="input-custom" placeholder="you@example.com" type="email" />
      </label>

      <label className="flex flex-col">
        <p className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200">
          Password
        </p>
        <div className="input-password-container">
          <input className="input-password" placeholder="Enter your password" type="password" />
          <div className="input-password-toggle">
            <span className="material-symbols-outlined text-2xl">visibility_off</span>
          </div>
        </div>
      </label>

      <div className="flex justify-end">
        <a className="text-sm font-medium leading-normal text-(--primary) hover:underline" href="#">
          Forgot Password?
        </a>
      </div>

      <button type="submit" className="button-primary">
        Log In
      </button>
    </form>
  );
}
