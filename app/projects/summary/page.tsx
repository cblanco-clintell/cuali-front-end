"use client";
import { SidebarLayout } from '@/components/common';
import React, { useState } from 'react';
import { studyDetails } from '@/data';
import TabLinks from "@/components/placeholders/summary/TabLinks";
import ChatBot from "@/components/placeholders/summary/ChatBot";
import ObjectiveDetails from "@/components/placeholders/summary/ObjectiveDetails";

// Component for general study information
const GeneralStudyInfo = () => {
  return (
    <div className="p-6 bg-gray-50 shadow-sm rounded-lg border border-solid border-zinc-300 w-full">
      <p className="text-gray-600">{studyDetails.generalConclusion}</p>
    </div>
  );
};

export default function Page() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(true); // Track chatbot visibility
  const [selectedGroup, setSelectedGroup] = useState(studyDetails.objectives[0].groupSpecific[0].groupName); // Shared group state

  const tabs = [
    { name: "Summary", href: "#summary" },
    { name: "Emotions", href: "#emotions" },
    { name: "Keywords", href: "#keywords" },
    { name: "Speakers", href: "#speakers" },
    { name: "Deliverables", href: "#deliverables" },
    { name: "Config", href: "#config" },
  ];

  return (
    <SidebarLayout>
      <div className="flex">
        {/* Main content, adjusts width when chatbot is open */}
        <div className={`px-4 py-8 ${isChatbotOpen ? 'w-2/3' : 'w-full'}`}>
          {/* Full-width row with "Back to All Projects" link and Project Title */}
          <div className="w-full mb-8">
            <a href="/projects" className="text-blue-500 underline">
              &larr; All Projects
            </a>
            <div className="mt-4">
              <h1 className="text-3xl font-bold">{studyDetails.studyName}</h1>
            </div>
          </div>

          {/* Tabs Navigation */}
          <TabLinks tabs={tabs} defaultActiveTab="Summary" />
          <div className='overflow-y-auto' style={{ height: 'calc(100vh - 200px)' }}>
            {/* General Info Section */}
            <div className="my-4">
              <h2 className="text-xl font-bold mb-1">Summary</h2>
              <GeneralStudyInfo />
            </div>

            {/* Objectives Section */}
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
        </div>

        {/* Chatbot taking 30% of the screen on the right */}
        {isChatbotOpen ? (
          <ChatBot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
        ) : (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg"
          >
            Open Chatbot
          </button>
        )}
      </div>
    </SidebarLayout>
  );
}