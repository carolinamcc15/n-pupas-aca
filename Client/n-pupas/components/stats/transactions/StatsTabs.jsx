import React from 'react';

import { RadioButton } from 'components/common/RadioButton';
import { Tab } from 'components/common/Tab';

const StatsTab = ({
  tabContent,
  activeTab,
  selectedOption,
  handleTabClick,
  handleOptionChange,
}) => {
  return (
    <div className='w-full flex justify-between items-center flex-wrap gap-2'>
      <div className='flex gap-2'>
        {tabContent.map(tab => (
          <Tab key={tab.id} tab={tab} activeTab={activeTab} handleTabClick={handleTabClick} />
        ))}
      </div>
      <div className='flex gap-6'>
        {tabContent[activeTab].options.map(option => (
          <RadioButton
            key={option}
            option={option}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsTab;