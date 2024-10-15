'use client';

import { useAppDispatch, useAppSelector,  } from '@/redux/hooks';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { selectSelectedProject, selectSelectedObjectiveIndex, selectSelectedQuestionIndex } from '@/redux/features/projects/projectSelectors';
import { setSelectedObjective, setSelectedQuestion } from '@/redux/features/projects/projectSlice';

const ObjectiveSelector: React.FC = () => {

  const dispatch = useAppDispatch();

  // Get the selected project and selected objective index from Redux
  const selectedProject = useAppSelector(selectSelectedProject);
  const selectedQuestionIndex = useAppSelector(selectSelectedQuestionIndex);
  
  // If no project or objectives, don't render the selector
  if (!selectedProject || !selectedProject.questions || selectedProject.questions.length === 0) {
    return <div>No questions available for this project.</div>;
  }

  const questions = selectedProject.questions;

  const handleSelectionChange = (index: number) => {
    dispatch(setSelectedQuestion(index));
  };

  return (
    <Listbox value={selectedQuestionIndex ?? 0} onChange={handleSelectionChange}>
      <Label className="block text-sm text-slate-700">Select your objective</Label>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{questions[selectedQuestionIndex ?? 0].objective_text}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {questions.map((question, index) => (
            <ListboxOption
              key={index}
              value={index}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {question.objective_text}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default ObjectiveSelector;