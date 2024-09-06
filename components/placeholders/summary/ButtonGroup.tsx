import { FiSmile, FiTag, FiUsers } from 'react-icons/fi'; // Importing Feather icons

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex gap-3 w-full">
      {/* Emotion Analysis Button */}
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <FiSmile className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
        Emotion Analysis
      </button>

      {/* Adjectives, Nouns & Verbs Button */}
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <FiTag className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
        Adjectives, Nouns & Verbs
      </button>

      {/* Speakers Button */}
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <FiUsers className="-ml-0.5 mr-1.5 h-5 w-5" />
        Speakers
      </button>
    </div>
  );
};

export default ButtonGroup;