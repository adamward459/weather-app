import { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import IconLocation from '../components/icons/IconLocation';
import IconSearch from '../components/icons/IconSearch';

export default function RootPage() {
  const navigate = useNavigate();

  const onInputClick = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-white">
        <label className="input input-bordered mx-auto flex w-1/3 items-center gap-2 border-none bg-white px-0">
          <IconLocation className="fill-black" />
          <input
            type="text"
            className="grow text-black"
            placeholder="Search"
            onClick={onInputClick}
          />
          <IconSearch className="fill-black" />
        </label>
      </nav>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
