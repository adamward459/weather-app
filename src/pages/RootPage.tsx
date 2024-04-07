import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectedGeoAtom } from '../atoms/selectedGeoAtom';
import IconLocation from '../components/icons/IconLocation';
import IconSearch from '../components/icons/IconSearch';

export default function RootPage() {
  const navigate = useNavigate();
  const selectedGeo = useAtomValue(selectedGeoAtom);

  const onInputClick = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-white">
        <label className="input input-bordered mx-auto flex w-1/3 items-center gap-2 border-none bg-white px-0">
          <IconLocation className="fill-black" />
          <input
            value={selectedGeo?.name}
            type="text"
            className="grow text-black"
            placeholder="Search"
            onClick={onInputClick}
            onChange={() => {}}
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
