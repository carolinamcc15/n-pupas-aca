export const ComparativeChartLabel = ({ name, value, isMoney }) => {
    return (
      <p className='text-xs flex flex-col font-normal text-[#2F5BB9]'>
        <span className='text-sm font-bold'>
          {isMoney ? '$' : ''}{value}
        </span>
        {name}
      </p>
    );
  };