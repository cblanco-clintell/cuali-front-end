"use client";
import { SidebarLayout } from '@/components/common';
import React, { useState } from 'react';
import { studyDetails } from '@/data';
import TabLinks from "@/components/placeholders/summary/TabLinks";

// Component for general study information
const GeneralStudyInfo = () => {
  return (
    <div className="p-6 bg-gray-50 shadow-sm rounded-lg border border-solid border-zinc-300 w-full">
      <h3 className="text-xl font-semibold">Brief</h3>
      <p className="text-gray-600">{studyDetails.studyBrief}</p>
      <h3 className="text-xl font-semibold mt-6">Conclusion</h3>
      <p className="text-gray-600">{studyDetails.generalConclusion}</p>
    </div>
  );
};

// Component for displaying the collapsible objectives with group-specific filters
const ObjectiveDetails = ({ objective, selectedGroup, setSelectedGroup }: { objective: any, selectedGroup: string, setSelectedGroup: (group: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle collapsible card

  const toggleCollapse = () => setIsOpen(!isOpen);

  const selectedGroupData = objective.groupSpecific.find(group => group.groupName === selectedGroup);

  return (
    <div className="mb-4">
      {/* Collapsible card title with caret */}
      <button
        onClick={toggleCollapse}
        className="w-full text-left text-gray-900 font-semibold py-4 flex items-center justify-between border-b border-gray-300"
      >
        <span>{objective.title}</span>
        <span>{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div className="p-6 bg-white rounded-lg shadow-sm mt-4 border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column - General Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900">General Conclusion</h4>
              <p className="text-gray-600 mb-4">{objective.generalConclusion}</p>

              <h4 className="text-lg font-semibold text-gray-900">General Insights</h4>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {objective.insights.map((insight: string, index: number) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-gray-900">General Actions</h4>
              <ul className="list-disc list-inside text-gray-600">
                {objective.actions.map((action: string, index: number) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>

            {/* Right Column - Group-Specific Info with light background */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <select
                id="group-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              >
                {objective.groupSpecific.map((group: any, index: number) => (
                  <option key={index} value={group.groupName}>
                    {group.groupName}
                  </option>
                ))}
              </select>

              {selectedGroupData && (
                <>
                  <h4 className="text-lg font-semibold text-gray-900">Group Conclusion</h4>
                  <p className="text-gray-600 mb-4">{selectedGroupData.conclusion}</p>

                  <h4 className="text-lg font-semibold text-gray-900">Group Insights</h4>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {selectedGroupData.insights.map((insight: string, index: number) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-semibold text-gray-900">Group Actions</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedGroupData.actions.map((action: string, index: number) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Chatbot component that shrinks the content and has a close button
const Chatbot = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
  
    return (
      <div className="w-1/3 h-screen bg-gray-100 shadow-lg p-6 border-l border-solid border-zinc-300 flex flex-col justify-between -mt-4 -mr-4">
        {/* Message Container */}
        <div className="mt-[80vh] flex-1 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <p className="text-gray-800">
              <strong>Ali:</strong> Hi, I am Ali, your study analysis partner. Feel free to ask me any questions about the conclusions.
            </p>
          </div>
        </div>
  
        {/* Input Field and Send Button */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Ask Ali about these conclusions"
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    );
  };

export default function Page() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(true); // Track chatbot visibility
  const [selectedGroup, setSelectedGroup] = useState(studyDetails.objectives[0].groupSpecific[0].groupName); // Shared group state

  const tabs = [
    { name: "Summary", href: "#summary" },
    { name: "Emotions", href: "#dashboard" },
    { name: "Keywords", href: "#keywords" },
    { name: "Speakers", href: "#speakers" },
    { name: "Deliverables", href: "#deliverables" },
    { name: "Config", href: "#config" },
  ];

  return (
    <SidebarLayout>
      <div className="flex">
        {/* Main content, adjusts width when chatbot is open */}
        <div className={`container px-4 py-8 ${isChatbotOpen ? 'w-2/3' : 'w-full'}`}>
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

          {/* General Info Section */}
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <GeneralStudyInfo />
          </div>

          {/* Objectives Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Objectives</h2>
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

        {/* Chatbot taking 30% of the screen on the right */}
        <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      </div>
    </SidebarLayout>
  );
}
