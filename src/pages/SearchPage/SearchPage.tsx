import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import useGeoCoding from '../../hooks/useGeoCoding';

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];
export default function SearchPage() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');
  const { trigger } = useGeoCoding();

  console.log(query);

  useEffect(() => {
    trigger({ q: 'London' });
  }, []);

  return (
    <div className="mx-auto flex h-full w-1/3 flex-col items-center">
      <Combobox value={''}>
        <Combobox.Input
          className="input h-auto w-full bg-white p-1"
          placeholder="Search country, or city here..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Options className="mt-1 w-full rounded-md bg-white p-1">
          {people.map((person) => (
            <Combobox.Option
              key={person}
              value={person}
              className="ui-active:bg-blue-200 rounded-sm p-1 text-black"
            >
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
