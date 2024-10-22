import React from 'react';
import StudioSelector from '@/components/common/StudioSelector';
import GrammarSection from '@/components/grammar/GrammarSection';

const ProjectGrammar: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className="mb-4">
        <StudioSelector/>
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5'>
        <GrammarSection />
      </div>
    </div>
  );
};

export default ProjectGrammar;
