import { Combobox } from '@headlessui/react';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import useGeoCoding, { GeoCodingResponse } from '../../hooks/useGeoCoding';

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];
export default function SearchPage() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<GeoCodingResponse[]>([]);
  const { trigger, data, isMutating } = useGeoCoding();

  useEffect(() => {
    trigger({ q: 'London' });
  }, [trigger]);

  const onInputChange = async (value: string) => {
    setInputValue(value);
    setOptions([]);
    setError(null);

    try {
      const result = await trigger({ q: value });
      if (result.length > 0) {
        setOptions(result);
      } else {
        setError('Invalid country or city');
      }
    } catch (error) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="mx-auto flex h-full w-1/3 flex-col items-center">
      <Combobox value={inputValue}>
        <Combobox.Input
          className="input h-auto w-full bg-white p-1"
          placeholder="Search country, or city here..."
          onChange={debounce((event) => onInputChange(event.target.value), 500)}
        />
        {error && <span className="text-red-500">{error}</span>}
        {options.length > 0 && (
          <Combobox.Options className="mt-1 w-full rounded-md bg-white p-1">
            {options.map((opt) => (
              <Combobox.Option
                key={opt.name}
                value={opt.lat + ',' + opt.lon}
                className="ui-active:bg-blue-200 rounded-sm p-1 text-black"
              >
                {opt.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
}
