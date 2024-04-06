import { Outlet } from 'react-router-dom';

export default function RootPage() {
  console.log('root page');
  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-white">
        <label className="input input-bordered mx-auto flex w-1/3 items-center gap-2 border-none bg-white">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </nav>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
