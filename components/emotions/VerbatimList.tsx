interface VerbatimListProps {
  verbatim: { group: string; text: string }[];
}

const VerbatimList: React.FC<VerbatimListProps> = ({ verbatim }) => {
  return (
    <div className="mt-5">
      <h3 className="text-gray-900 font-semibold text-sm">Verbatim</h3>
      <div className="mt-3">
        {verbatim?.map((item, index) => (
          <div key={index} className="mb-4 p-3 bg-white rounded-lg">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{item.group}</span>
            <div className="text-gray-700 text-sm">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerbatimList;