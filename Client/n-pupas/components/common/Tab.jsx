export const Tab = ({ tab, activeTab, handleTabClick }) => {
  return (
    <button
      className={`${
        activeTab === tab.id
          ? 'bg-primary-300 border-primary-300 border-2 rounded-md uppercase font-semibold px-3 py-2 bg-opacity-70'
          : 'border-primary-300 border-2 rounded-md uppercase px-3 py-2'
      }`}
      onClick={() => handleTabClick(tab.id)}
    >
      {tab.title}
    </button>
  );
};
