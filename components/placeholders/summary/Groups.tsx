"use client";
import React, { useState } from 'react';
import { FiFile, FiChevronDown, FiChevronUp, FiMoreVertical, FiFolderPlus } from "react-icons/fi";

const initialGroups = [
  {
    groupName: 'Tech enthusiasts',
    audios: ['audio1.mp3', 'audio2.mp3'],
    isOpen: false,
    language: 'English',
    files: [
      { name: 'audio1.mp3', size: '3.5 MB' },
      { name: 'audio2.mp3', size: '2.8 MB' },
    ]
  },
  {
    groupName: 'Music lovers',
    audios: ['audio3.mp3'],
    isOpen: false,
    language: 'Spanish',
    files: [
      { name: 'audio1.mp3', size: '3.5 MB' },
      { name: 'audio2.mp3', size: '2.8 MB' },
    ]
  },
  {
    groupName: 'Podcast fans',
    audios: [],
    isOpen: false,
    language: 'French',
    files: [
      { name: 'audio1.mp3', size: '3.5 MB' },
    ]
  },
];

export default function GroupsComponent() {
  const [groups, setGroups] = useState(initialGroups);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupLanguage, setNewGroupLanguage] = useState('English'); // Default language to 'English'

  // Toggle the visibility of group items
  const toggleGroup = (index: number) => {
    setGroups((prevGroups) => 
      prevGroups.map((group, i) => 
        i === index ? { ...group, isOpen: !group.isOpen } : group
      )
    );
  };

  // Handle audio file upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, groupIndex: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setGroups((prevGroups) => {
        const newGroups = [...prevGroups];
        newGroups[groupIndex].files.push({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        });
        newGroups[groupIndex].audios.push(file.name);
        return newGroups;
      });
    }
  };

  // Toggle dropdown menu for group actions
  const toggleGroupMenu = (groupIndex: number) => {
    setActiveGroupIndex(activeGroupIndex === groupIndex ? null : groupIndex);
  };

  // Open the "Create New Group" popup
  const openPopup = () => {
    setNewGroupName('');
    setNewGroupLanguage('English'); // Reset to default language
    setIsPopupOpen(true);
  };

  // Close the popup without saving
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Add new group
  const addNewGroup = () => {
    if (!newGroupName || !newGroupLanguage) {
      alert('Please fill in both group name and language');
      return;
    }

    setGroups([
      ...groups,
      {
        groupName: newGroupName,
        audios: [],
        isOpen: false,
        language: newGroupLanguage,
        files: [],
      },
    ]);
    closePopup(); // Close the popup after adding the group
  };

  return (
    <div className="w-full space-y-4">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4 border border-gray-300 rounded-lg relative">
          {/* Group Header with Toggle and Actions */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => toggleGroup(groupIndex)}
              className="text-left text-gray-900 font-semibold flex items-center"
            >
              {group.isOpen ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
              <span>{group.groupName}</span>
            </button>

            {/* Button to open group menu */}
            <button
              onClick={() => toggleGroupMenu(groupIndex)}
              className="text-gray-500 hover:text-gray-900"
            >
              <FiMoreVertical className="w-6 h-6" />
            </button>

            {/* Dropdown menu for group actions */}
            {activeGroupIndex === groupIndex && (
              <div className="absolute right-4 top-12 z-10 bg-white border rounded shadow-md py-2 w-40">
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  Rename
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  Delete
                </button>
              </div>
            )}
          </div>

          {group.isOpen && (
            <div className="p-6 bg-white rounded-b-lg shadow-sm mt-0 border-t">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Left Column */}
                <div className="w-full md:w-1/2">
                  <p className="text-gray-600 mb-4">Language: {group.language}</p>
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    {group.files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <FiFile aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">{file.name}</span>
                            <span className="flex-shrink-0 text-gray-400">{file.size}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    {/* File input for uploading audio */}
                    <label
                      htmlFor={`audio-upload-${groupIndex}`}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                    >
                      <FiFolderPlus className="-ml-0.5 mr-1.5 h-5 w-5" />
                      Upload Audio
                      <input
                        id={`audio-upload-${groupIndex}`}
                        type="file"
                        className="hidden"
                        accept="audio/*"
                        onChange={(e) => handleUpload(e, groupIndex)}
                      />
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor={`dropzone-file-${groupIndex}`}
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">MP3, WAV, or OGG (MAX. 10MB)</p>
                      </div>
                      <input
                        id={`dropzone-file-${groupIndex}`}
                        type="file"
                        className="hidden"
                        accept="audio/*"
                        onChange={(e) => handleUpload(e, groupIndex)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Create New Group Button */}
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={openPopup}
        >
          <FiFolderPlus className="-ml-0.5 mr-1.5 h-5 w-5" />
          Add Group
        </button>
      </div>

      {/* New Group Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Create New Group</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Language</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newGroupLanguage}
              onChange={(e) => setNewGroupLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={addNewGroup}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
