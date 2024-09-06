"use client";
import React, { useState } from 'react';
import { SidebarLayout } from '@/components/common';
import TabLinks from "@/components/placeholders/summary/TabLinks";
import ChatBot from "@/components/placeholders/summary/ChatBot";
import { studyDetails } from '@/data';  // Import project details

interface PageLayoutProps {
  title: string;       // The title below the tabs
  content: React.ReactNode;  // The component to render
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, content }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);  // Track chatbot visibility

  return (
    <SidebarLayout>
      <div className="flex">
        {/* Main content, adjusts width when chatbot is open */}
        <div
          className={`pb-8 mx-auto ${isChatbotOpen ? 'w-2/3' : 'max-w-screen-2xl w-9/12 mx-auto'} transition-all`}
        >
          {/* Full-width row with "Back to All Projects" link and Project Title */}
          <div className="w-full mb-4">
            <a href="/projects" className="text-blue-500 underline text-xs">
              &larr; All Projects
            </a>
            <div className="mt-4">
              {/* Project title */}
              <h1 className="text-xl font-bold">{studyDetails.studyName}</h1>
            </div>
          </div>

          {/* Tabs Navigation */}
          <TabLinks defaultActiveTab={title} />

          <div className={`overflow-y-auto ${isChatbotOpen ? 'px-10' : ''}`} style={{ height: 'calc(100vh - 200px)' }}>
            {/* Group Title below the Tabs */}
            <div className="my-4">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              {/* Render content */}
              {content}
            </div>
          </div>
        </div>

        {/* Chatbot taking 1/3 of the screen on the right when open */}
        {isChatbotOpen && (
          <div className="w-1/3">
            <ChatBot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
          </div>
        )}

        {/* Button to open chatbot */}
        {!isChatbotOpen && (
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
};

export default PageLayout;