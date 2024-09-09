"use client";
import React, { useState } from 'react';
import ObjectiveKeywords from './ObjectiveKeywords';
import { studyDetails } from '@/data';

export default function Keywords() {
  const [selectedGroup, setSelectedGroup] = useState(studyDetails.objectives[0].groupSpecific[0].groupName);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{studyDetails.studyName} Keywords</h2>
      {studyDetails.objectives.map((objective) => (
        <ObjectiveKeywords
          key={objective.id}
          objective={objective}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      ))}
    </div>
  );
}
