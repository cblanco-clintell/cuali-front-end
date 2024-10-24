import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import SpeakerTranscriptions from '@/components/speakers/SpeakerTranscriptions';
import SpeakerTime from '@/components/speakers/SpeakerTime';
import SpeakerRename from '@/components/speakers/SpeakerRename';
import SpeakerKeywords from '@/components/speakers/SpeakerKeywords';
import StudioSelector from '@/components/common/StudioSelector';
import TranscriptionViewer from '@/components/speakers/TranscriptionViewer';
import Card from '@/components/common/Card';

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
    <div className="max-w-screen-xl mx-auto my-5">
      <div className="mb-4">
        <StudioSelector showAllOption={false} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Card title="Speakers" className="mt-5">
        <SpeakerTime
          renamedSpeakers={renamedSpeakers}
          onRenameSpeaker={handleRenameSpeaker}
          />
        </Card>
        <Card title="Speaker Keywords" className="mt-5">
          <SpeakerKeywords selectedStudioId={selectedStudioId} renamedSpeakers={renamedSpeakers} />
        </Card>
        <Card title="Transcriptions" className="mt-5">
          <TranscriptionViewer selectedStudioId={selectedStudioId} renamedSpeakers={renamedSpeakers} />
        </Card>
      </div>
    </div>
  );
};

export default ProjectSpeakers;
