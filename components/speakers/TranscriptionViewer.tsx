import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import SpeakerTranscriptions from './SpeakerTranscriptions';
import FullTranscription from './FullTranscription';

interface TranscriptionViewerProps {
  selectedStudioId: number | null;
  renamedSpeakers: Record<string, string>;
}

const TranscriptionViewer: React.FC<TranscriptionViewerProps> = ({ selectedStudioId, renamedSpeakers }) => {
  const [viewMode, setViewMode] = useState<'bySpeaker' | 'full'>('bySpeaker');
  const selectedProject = useAppSelector(selectSelectedProject);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);

  const studioDocuments = selectedProject?.studios
    .find(studio => studio.id === selectedStudioId)
    ?.studio_documents || [];

  return (
    <div className='bg-white rounded-lg p-3'>
      <div className="mb-4">
        <button
          onClick={() => setViewMode('bySpeaker')}
          className={`mr-2 px-4 py-2 rounded ${viewMode === 'bySpeaker' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          View by Speaker
        </button>
        <button
          onClick={() => setViewMode('full')}
          className={`px-4 py-2 rounded ${viewMode === 'full' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Full Transcription
        </button>
      </div>
      <div className="mb-4">
        <select
          value={selectedDocumentId || ''}
          onChange={(e) => setSelectedDocumentId(Number(e.target.value) || null)}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a document</option>
          {studioDocuments.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>
      {viewMode === 'bySpeaker' ? (
        <SpeakerTranscriptions selectedDocumentId={selectedDocumentId} renamedSpeakers={renamedSpeakers} />
      ) : (
        <FullTranscription selectedDocumentId={selectedDocumentId} renamedSpeakers={renamedSpeakers} />
      )}
    </div>
  );
};

export default TranscriptionViewer;
