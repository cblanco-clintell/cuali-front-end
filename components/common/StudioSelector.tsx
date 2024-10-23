import React from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectSelectedProject, selectSelectedStudioIds } from '@/redux/features/projects/projectSelectors';
import { setSelectedStudios } from '@/redux/features/projects/projectSlice';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const ALL_GROUPS_VALUE = 'all';

interface StudioSelectorProps {
  showAllOption?: boolean;
}

const StudioSelector: React.FC<StudioSelectorProps> = ({ showAllOption = true }) => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const selectedStudioIds = useAppSelector(selectSelectedStudioIds);
  const dispatch = useAppDispatch();

  if (!selectedProject) return null;

  const handleStudioSelect = (value: string | number) => {
    if (value === ALL_GROUPS_VALUE) {
      dispatch(setSelectedStudios([])); // Select all groups
    } else {
      dispatch(setSelectedStudios([value as number]));
    }
  };

  // Set selectedValue to 'all' if no specific studio is selected and showAllOption is true
  const selectedValue = selectedStudioIds.length === 0 && showAllOption ? ALL_GROUPS_VALUE : selectedStudioIds[0];

  // Handle the label for "All Groups" or a specific studio
  const selectedStudio = selectedStudioIds.length === 0 
    ? null 
    : selectedProject.studios.find(studio => studio.id === selectedStudioIds[0]);

  const selectedLabel = selectedStudio ? selectedStudio.name : (showAllOption ? 'All Groups' : 'Select a Group');

  return (
    <Listbox value={selectedValue} onChange={handleStudioSelect}>
      <Label className="block text-sm text-slate-700">Select Group</Label>
      <div className="relative mt-1">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selectedLabel}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {showAllOption && (
            <ListboxOption
              value={ALL_GROUPS_VALUE}
              className={({ active }) =>
                `${active ? 'bg-primary text-white' : 'text-gray-900'}
                  relative cursor-default select-none py-2 pl-3 pr-9`
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                    All Groups
                  </span>
                  {selected && (
                    <span
                      className={`${active ? 'text-white' : 'text-primary'}
                        absolute inset-y-0 right-0 flex items-center pr-4`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          )}

          {selectedProject.studios.map((studio) => (
            <ListboxOption
              key={studio.id}
              value={studio.id}
              className={({ active }) =>
                `${active ? 'bg-primary text-white' : 'text-gray-900'}
                  relative cursor-default select-none py-2 pl-3 pr-9`
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                    {studio.name}
                  </span>
                  {selected && (
                    <span
                      className={`${active ? 'text-white' : 'text-primary'}
                        absolute inset-y-0 right-0 flex items-center pr-4`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default StudioSelector;
