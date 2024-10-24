'use client'
import React, { useState } from 'react';
import { FiFile, FiChevronDown, FiChevronUp, FiUpload, FiEdit2, FiTrash2, FiXCircle } from "react-icons/fi";
import { StudioModel } from '@/types/studios'; // Adjust the import path as needed
import { useUploadStudioDocumentMutation } from '@/redux/features/studios/studioApiSlice';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';

interface StudioCardProps {
  studio: StudioModel;
  onEdit: () => void;
  onDelete: () => void;
}

const StudioCard: React.FC<StudioCardProps> = ({ studio, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [uploadStudioDocument, { isLoading: isUploading }] = useUploadStudioDocumentMutation();

  const toggleOpen = () => setIsOpen(!isOpen);
  const selectedProject = useSelector(selectSelectedProject);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewFile(file); // Update state to show new file before uploading
    }
  };

  const handleUpload = async () => {
    console.log('Studio Id', studio.id);
    if (newFile) {
      await uploadStudioDocument({ 
        projectId: selectedProject?.id,
        studioId: studio.id, 
        file: newFile 
      });
      setNewFile(null); // Clear the new file after upload
    }
  };

  const cancelUpload = () => {
    setNewFile(null); // Remove the selected file without uploading
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center p-3">
        <button
          onClick={toggleOpen}
          className="text-left text-gray-900 font-semibold flex items-center text-sm"
        >
          {isOpen ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
          <span>{studio.name}</span>
        </button>

        <div className="flex space-x-2">
          <label
            htmlFor={`audio-upload-${studio.id}`}
            className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            <FiUpload className="w-4 h-4" />
            <input
              id={`audio-upload-${studio.id}`}
              type="file"
              className="hidden"
              accept="audio/*"
              onChange={handleFileSelection}
            />
          </label>
          <button
            onClick={onEdit}
            className="hover:text-blue-800"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="hover:text-red-800"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-3 bg-white rounded-b-lg shadow-sm mt-0 border-t">
          <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {studio.studio_documents?.map((document: any) => (
              <li key={document.id} className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <FiFile aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-xs">{document.name}</span>
                  </div>
                </div>
              </li>
            ))}
            {newFile && (
              <li className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <FiFile aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-xs">{newFile.name}</span>
                    <button onClick={handleUpload} className="text-green-500 hover:text-green-700">Upload</button>
                    <button onClick={cancelUpload} className="text-red-500 hover:text-red-700">
                      <FiXCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>

          <div className="mt-2">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={`dropzone-file-${studio.id}`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-6 h-6 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">MP3, WAV, or OGG (MAX. 10MB)</p>
                </div>
                <input
                  id={`dropzone-file-${studio.id}`}
                  type="file"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileSelection}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudioCard;
