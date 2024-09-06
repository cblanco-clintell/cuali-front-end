"use client";
import React, { useState } from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';  // Import the reusable layout
import { studyDetails } from '@/data';
import ObjectiveDetails from '@/components/placeholders/summary/ObjectiveDetails';

// Component for general study information
const GeneralStudyInfo = () => {
  return (
    <div className="p-6 w-full">
      <p className="text-gray-600">{studyDetails.generalConclusion}</p>
    </div>
  );
};

export default function Page() {
  const [selectedGroup, setSelectedGroup] = useState(studyDetails.objectives[0].groupSpecific[0].groupName); // Shared group state

  // Content component that includes the GeneralStudyInfo and Objectives section
  const content = (
    <div>
      <GeneralStudyInfo />
      <div>
        <h2 className="text-xl font-bold mb-2">Objectives</h2>
        {studyDetails.objectives.map((objective) => (
          <ObjectiveDetails
            key={objective.id}
            objective={objective}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        ))}
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Summary"  // Title below the tabs
      content={content}  // Pass the content component here
    />
  );
}
