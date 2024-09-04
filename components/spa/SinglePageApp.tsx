import React, { useState } from 'react';

interface NavItem {
  name: string;
  url: string;
  component: React.ReactNode;
}

interface Section {
  title: string;
  items: NavItem[];
}

interface SinglePageAppProps {
  sections: Section[];
}

const SinglePageApp: React.FC<SinglePageAppProps> = ({ sections }) => {
  const [activeItem, setActiveItem] = useState<NavItem>(sections[0]?.items[0]);

  const renderActiveComponent = () => {
    return activeItem?.component || null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 h-full">
      <aside className="flex flex-col w-[18%] pr-4 border-gray-200 border-r">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8">
            <span className="block text-xs leading-5 text-zinc-400">{section.title}</span>
            <nav className="space-y-2 mt-2">
              {section.items.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className={`block px-2 py-2 rounded-lg border border-white cursor-pointer text-sm ${
                    item.name === activeItem.name ? 'bg-purple-100 border-purple-100 text-violet-700' : 'text-slate-600'
                  }`}
                  onClick={() => setActiveItem(item)}
                  style={{ transition: 'background-color 0.3s' }} // Add transition style
                >
                  {item.name}
                </span>
              ))}
            </nav>
          </div>
        ))}
      </aside>
      {/* Main Content Area */}
      <section className="flex flex-col w-full md:w-[82%]">
        {renderActiveComponent()}
      </section>
    </div>
  );
};

export default SinglePageApp;
