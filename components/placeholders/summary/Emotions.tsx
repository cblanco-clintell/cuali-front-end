"use client";
import React, { useState } from 'react';
import { studyDetails } from '@/data';
import ObjectiveEmotions from './ObjectiveEmotions';
import CategoryFilterComponent from './CategoryFilterComponent';


export default function Emotions() {
  const [selectedGroup, setSelectedGroup] = useState(studyDetails.objectives[0].groupSpecific[0].groupName);
  return (
    <div>
        <h2 className="text-xl font-bold mb-2">Objectives</h2>
        {studyDetails.objectives.map((objective) => (
          <ObjectiveEmotions
            key={objective.id}
            objective={objective}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        ))}
        <CategoryFilterComponent />
      </div>
  );
}
