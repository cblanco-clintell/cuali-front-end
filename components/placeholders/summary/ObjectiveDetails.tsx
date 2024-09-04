import React, { useState } from 'react';
import EmotionDots from './EmotionDots';

type ObjectiveDetailsProps = {
    objective: any;
    selectedGroup: string;
    setSelectedGroup: (group: string) => void;
};

const ObjectiveDetails: React.FC<ObjectiveDetailsProps> = ({ objective, selectedGroup, setSelectedGroup }) => {
    const [isOpen, setIsOpen] = useState(false); // Toggle collapsible card

    const toggleCollapse = () => setIsOpen(!isOpen);

    const selectedGroupData = objective.groupSpecific.find((group: any) => group.groupName === selectedGroup);

    return (
        <div className="mb-4">
            {/* Collapsible card title with caret */}
            <button
                onClick={toggleCollapse}
                className="w-full text-left text-gray-900 font-semibold py-4 flex items-center justify-between border-b border-gray-300"
            >
                <span>{objective.id}- {objective.title}</span>
                <EmotionDots />
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
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                {objective.actions.map((action: string, index: number) => (
                                    <li key={index}>{action}</li>
                                ))}
                            </ul>

                            {/* Add buttons below the general information */}
                            <div className="space-y-4 mt-4">
                                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                    View Emotions
                                </button>
                                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                                    View Adjectives, Verbs and Nouns
                                </button>
                                <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                                    Ask Ali About this objective
                                </button>
                            </div>
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

export default ObjectiveDetails;