import { useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { geoHistoryAtom } from '../../../../atoms/geoHistoryAtom';
import { selectedGeoAtom } from '../../../../atoms/selectedGeoAtom';
import Paper from '../../../../components/Paper/Paper';
import IconSearch from '../../../../components/icons/IconSearch';
import IconTrash from '../../../../components/icons/IconTrash';
import { GeoCodingResponse } from '../../../../hooks/useGeoCoding';

export default function SearchHistory() {
  const [history, setHistory] = useAtom(geoHistoryAtom);
  const setSelectedGeo = useSetAtom(selectedGeoAtom);
  const navigate = useNavigate();

  const onSelectGeo = useCallback(
    (item: GeoCodingResponse) => {
      setSelectedGeo(item);
      navigate('/');
    },
    [navigate, setSelectedGeo],
  );

  const onDeleteHistory = useCallback(
    (item: GeoCodingResponse) => {
      setHistory((prev) => prev.filter((i) => i.name !== item.name));
    },
    [setHistory],
  );

  return (
    <div className="mt-5 flex w-full flex-col">
      <span className="font-medium text-black"> Search History</span>
      <Paper className="mt-3 max-h-[450px] overflow-auto p-0">
        {history.length === 0 && (
          <span className="p-2 text-black">No history</span>
        )}
        {history.map((item, index) => {
          return (
            <div
              key={index}
              className="flex cursor-pointer items-center justify-between p-2"
            >
              <span className="text-black">{item.name}</span>
              <div className="flex gap-3">
                <IconSearch
                  className="fill-black"
                  width={20}
                  height={20}
                  onClick={() => onSelectGeo(item)}
                />
                <IconTrash
                  className="fill-black"
                  width={20}
                  height={20}
                  onClick={() => onDeleteHistory(item)}
                />
              </div>
            </div>
          );
        })}
      </Paper>
    </div>
  );
}
