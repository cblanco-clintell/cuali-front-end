import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import SpeakerTranscriptions from '@/components/speakers/SpeakerTranscriptions';
import SpeakerTime from '@/components/speakers/SpeakerTime';
import SpeakerRename from '@/components/speakers/SpeakerRename';
import SpeakerKeywords from '@/components/speakers/SpeakerKeywords';
import StudioSelector from '@/components/common/StudioSelector';

interface ProjectSpeakersProps {}

const ProjectSpeakers: React.FC<ProjectSpeakersProps> = () => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const [selectedStudioId, setSelectedStudioId] = useState<number | null>(null);
  const [renamedSpeakers, setRenamedSpeakers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedProject && selectedProject.studios.length > 0) {
      setSelectedStudioId(selectedProject.studios[0].id);
    }
  }, [selectedProject]);

  const handleRenameSpeaker = (originalName: string, newName: string) => {
    setRenamedSpeakers(prev => ({ ...prev, [originalName]: newName }));
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className="mb-4">
        <StudioSelector
          selectedStudioId={selectedStudioId}
          onStudioSelect={setSelectedStudioId}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <SpeakerRename
          selectedStudioId={selectedStudioId}
          renamedSpeakers={renamedSpeakers}
          onRenameSpeaker={handleRenameSpeaker}
        />
        <div>
          <h2 className="text-xl font-bold mb-2">Speaker Times</h2>
          <SpeakerTime selectedStudioId={selectedStudioId} renamedSpeakers={renamedSpeakers} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Speaker Keywords</h2>
          <SpeakerKeywords selectedStudioId={selectedStudioId} renamedSpeakers={renamedSpeakers} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Transcriptions</h2>
          <SpeakerTranscriptions selectedStudioId={selectedStudioId} renamedSpeakers={renamedSpeakers} />
        </div>
      </div>
    </div>
  );
};

export default ProjectSpeakers;
