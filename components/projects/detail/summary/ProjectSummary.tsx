import React from 'react';
import Card from '@/components/common/Card';
import { loremIpsum } from 'react-lorem-ipsum';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';

interface ProjectSummaryProps {}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
}) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className='max-w-[500px]'>
        <ObjectiveSelector/>
      </div>
      <div className="mt-4">
        <Card title='Summary'>
          <div className="px-4 py-3 mt-3 w-full bg-white rounded-lg">
            {loremIpsum({ p: 2 }).map(text => (
              <div className="text" key={text}>
                {text}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card title='Group Findings'>
          <div className="px-4 py-3 mt-3 w-full bg-white rounded-lg">
            {loremIpsum({ p: 2 }).map(text => (
              <div className="text" key={text}>
                {text}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card title='Actions'>
          <div className="px-4 py-3 mt-3 w-full bg-white rounded-lg">
            {loremIpsum({ p: 1 }).map(text => (
              <div className="text" key={text}>
                {text}
              </div>
            ))}
          </div>

          <div className="px-4 py-3 mt-3 w-full bg-white rounded-lg">
            {loremIpsum({ p: 1 }).map(text => (
              <div className="text" key={text}>
                {text}
              </div>
            ))}
          </div>

          <div className="px-4 py-3 mt-3 w-full bg-white rounded-lg">
            {loremIpsum({ p: 1 }).map(text => (
              <div className="text" key={text}>
                {text}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectSummary;