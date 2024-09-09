import { FiSmile, FiTag, FiUsers } from 'react-icons/fi'; // Importing Feather icons
import Link from 'next/link'; // Importing Link from next/link (for client-side navigation in Next.js)

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex gap-3 w-full">
      {/* Emotion Analysis Button */}
      <Link href="/projects/emotions" passHref>
        <button
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <FiSmile className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
          Emotion Analysis
        </button>
      </Link>

      {/* Adjectives, Nouns & Verbs Button */}
      <Link href="/projects/keywords" passHref>
        <button
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <FiTag className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
          Adjectives, Nouns & Verbs
        </button>
      </Link>

      {/* Speakers Button */}
      <Link href="/projects/speakers" passHref>
        <button
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <FiUsers className="-ml-0.5 mr-1.5 h-5 w-5" />
          Speakers
        </button>
      </Link>
    </div>
  );
};

export default ButtonGroup;