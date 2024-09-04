"use client";
import { SidebarLayout } from '@/components/common';
import React, { useState } from 'react';
import { studyDetails } from '@/data';
import TabLinks from "@/components/placeholders/summary/TabLinks";
import ChatBot from "@/components/placeholders/summary/ChatBot";
import Config from "@/components/placeholders/summary/Config";



export default function Page() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(true); // Track chatbot visibility
  const [selectedGroup, setSelectedGroup] = useState(studyDetails.objectives[0].groupSpecific[0].groupName); // Shared group state

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
          <TabLinks defaultActiveTab="Config" />
        
            <div className='overflow-y-auto' style={{ height: 'calc(100vh - 200px)' }}>
            {/* General Info Section */}
            <Config />

            </div>
        </div>
        
        {/* Chatbot taking 30% of the screen on the right */}
        <ChatBot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      </div>
    </SidebarLayout>
  );
}
