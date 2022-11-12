import { Tooltip } from 'components/common/Tooltip';

const ActionButton = ({ actionElements, onClickHandler }) => {
  const handleOnClick = () => {
    onClickHandler();
  };

  return (
    <Tooltip text={actionElements.tooltip}>
      <button
        type='button'
        className='rounded-full p-2'
        style={{ backgroundColor: actionElements.color }}
        onClick={handleOnClick}
      >
        {actionElements.icon}
      </button>
    </Tooltip>
  );
};

export default ActionButton;
