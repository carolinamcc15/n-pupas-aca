import useToggle from 'hooks/useToggle';

export const Tooltip = ({ children, text }) => {
  const [isTooltipVisible, toggleTooltip] = useToggle();

  return (
    <div className='relative'>
      <div onMouseEnter={() => toggleTooltip(true)} onMouseLeave={() => toggleTooltip(false)}>
        {children}
      </div>
      {isTooltipVisible && (
        <div
          className={`mt-2 p-1 absolute px-2.5 rounded-sm bg-black bg-opacity-75 z-40 font-normal text-white text-sm text-center`}
        >
          <div className='text-center absolute -top-2 left-2 border-b-8 border-x-transparent border-x-8 text-sm border-black opacity-75'></div>
          {text}
        </div>
      )}
    </div>
  );
};
