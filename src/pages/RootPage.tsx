import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectedGeoAtom } from '../atoms/selectedGeoAtom';
import IconLocation from '../components/icons/IconLocation';
import IconSearch from '../components/icons/IconSearch';

export default function RootPage() {
  const navigate = useNavigate();
  const selectedGeo = useAtomValue(selectedGeoAtom);

  const onSearchIconClick = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  const onLocationIconClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-white">
        <label className="input input-bordered mx-auto flex w-1/3 min-w-[300px] items-center gap-2 border-none bg-white px-0">
          <IconLocation
            className="cursor-pointer fill-black"
            onClick={onLocationIconClick}
          />
          <input
            disabled
            value={selectedGeo?.name}
            type="text"
            className="grow text-black"
            placeholder="Search"
          />
          <IconSearch
            className="cursor-pointer fill-black"
            onClick={onSearchIconClick}
          />
        </label>
      </nav>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
