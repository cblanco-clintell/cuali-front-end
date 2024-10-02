import React from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';
import Deliverables from '@/components/placeholders/summary/Deliverables';

interface ProjectDeliverablesProps {}

const ProjectDeliverables: React.FC<ProjectDeliverablesProps> = ({
}) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <Deliverables/>
    </div>
  );
};

export default ProjectDeliverables;