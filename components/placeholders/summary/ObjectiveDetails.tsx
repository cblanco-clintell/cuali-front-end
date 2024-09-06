import React, { useState } from 'react';
import EmotionDots from './EmotionDots';
import ButtonGroup from './ButtonGroup';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type ObjectiveDetailsProps = {
    objective: any;
    selectedGroup: string;
    setSelectedGroup: (group: string) => void;
};

const ObjectiveDetails: React.FC<ObjectiveDetailsProps> = ({ objective, selectedGroup, setSelectedGroup }) => {
    const [isOpen, setIsOpen] = useState(false); // Toggle collapsible card
    const [showMore, setShowMore] = useState(false); // Toggle "View More"

    const toggleCollapse = () => setIsOpen(!isOpen);
    const toggleShowMore = () => setShowMore(!showMore);

    const selectedGroupData = objective.groupSpecific.find((group: any) => group.groupName === selectedGroup);

    // Example data for adjectives, nouns, verbs, and speakers
    const adjectives = [
        { word: "Innovative", percentage: 80 },
        { word: "Fast", percentage: 65 },
        { word: "Reliable", percentage: 50 },
    ];

    const nouns = [
        { word: "Camera", percentage: 85 },
        { word: "Battery", percentage: 75 },
        { word: "Screen", percentage: 60 },
    ];

    const verbs = [
        { word: "Capture", percentage: 90 },
        { word: "Record", percentage: 70 },
        { word: "Charge", percentage: 55 },
    ];

    const speakers = [
        { name: "John Doe", percentage: 60 },
        { name: "Jane Smith", percentage: 40 },
    ];

    return (
        <div className="mb-4 border border-gray-300 rounded-lg shadow-sm">
            {/* Collapsible card title with caret, always inside border */}
            <button
                onClick={toggleCollapse}
                className="w-full text-left text-gray-900 font-semibold py-4 flex items-center px-4"
            >
                {isOpen ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
                <span>{objective.title}</span>
            </button>

            {/* Collapsible content */}
            {isOpen && (
                <div className="p-6 bg-white border-t border-gray-300">
                    {/* Grid layout for the table-like structure */}
                    <div className="grid grid-cols-[1fr,3fr,3fr] gap-4">
                        {/* First Row: Labels */}
                        <div className="font-medium text-gray-900"></div>
                        <div className="font-medium text-gray-900 text-sm mt-2">General</div>
                        <div className="font-medium text-gray-900">
                            <select
                                id="group-select"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className="w-full p-2 mb-2 border rounded-md text-xs"
                            >
                                {objective.groupSpecific.map((group: any, index: number) => (
                                    <option key={index} value={group.groupName}>
                                        {group.groupName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <hr className="col-span-3 mb-4" />

                        {/* Second Row: Conclusion */}
                        <div className="text-gray-700 font-semibold text-sm">Conclusion</div>
                        <div className="text-gray-600 text-sm">{objective.generalConclusion}</div>
                        <div className="text-gray-600 text-sm">{selectedGroupData?.conclusion}</div>

                        <hr className="col-span-3 my-4" />

                        {/* Third Row: Insights */}
                        <div className="text-gray-700 font-semibold text-sm">Insights</div>
                        <div className="text-gray-600">
                            <ul className="list-disc list-inside text-sm">
                                {objective.insights.map((insight: string, index: number) => (
                                    <li key={index}>{insight}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-gray-600">
                            <ul className="list-disc list-inside text-sm">
                                {selectedGroupData?.insights.map((insight: string, index: number) => (
                                    <li key={index}>{insight}</li>
                                ))}
                            </ul>
                        </div>

                        <hr className="col-span-3 my-4" />

                        {/* Fourth Row: Actions */}
                        <div className="text-gray-700 font-semibold">Actions</div>
                        <div className="text-gray-600">
                            <ul className="list-disc list-inside text-sm">
                                {objective.actions.map((action: string, index: number) => (
                                    <li key={index}>{action}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-gray-600">
                            <ul className="list-disc list-inside text-sm">
                                {selectedGroupData?.actions.map((action: string, index: number) => (
                                    <li key={index}>{action}</li>
                                ))}
                            </ul>
                        </div>

                        {showMore && (
                            <>
                                <hr className="col-span-3 my-4" />

                                {/* Adjectives */}
                                <div className="text-gray-700 font-semibold">Adjectives</div>
                                <div className="text-gray-600">
                                    <ul>
                                        {adjectives.map((adj, index) => (
                                            <li key={index}>{adj.word} - {adj.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-gray-600">
                                    <ul>
                                        {adjectives.map((adj, index) => (
                                            <li key={index}>{adj.word} - {adj.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>

                                <hr className="col-span-3 my-4" />

                                {/* Nouns */}
                                <div className="text-gray-700 font-semibold">Nouns</div>
                                <div className="text-gray-600">
                                    <ul>
                                        {nouns.map((noun, index) => (
                                            <li key={index}>{noun.word} - {noun.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-gray-600">
                                    <ul>
                                        {nouns.map((noun, index) => (
                                            <li key={index}>{noun.word} - {noun.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>

                                <hr className="col-span-3 my-4" />

                                {/* Verbs */}
                                <div className="text-gray-700 font-semibold">Verbs</div>
                                <div className="text-gray-600">
                                    <ul>
                                        {verbs.map((verb, index) => (
                                            <li key={index}>{verb.word} - {verb.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-gray-600">
                                    <ul>
                                        {verbs.map((verb, index) => (
                                            <li key={index}>{verb.word} - {verb.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>

                                <hr className="col-span-3 my-4" />

                                {/* Speakers */}
                                <div className="text-gray-700 font-semibold">Speakers</div>
                                <div className="text-gray-600">
                                    <ul>
                                        {speakers.map((speaker, index) => (
                                            <li key={index}>{speaker.name} - {speaker.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-gray-600">
                                    <ul>
                                        {speakers.map((speaker, index) => (
                                            <li key={index}>{speaker.name} - {speaker.percentage}%</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>

                    <hr className="col-span-3 my-4" />
                    <div><ButtonGroup /></div>    
                </div>
            )}
        </div>
    );
};

export default ObjectiveDetails;
