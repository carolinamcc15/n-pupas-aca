import { crudActionTypes } from 'constants/strings';

const CrudButton = ({ actionType, onClickHandler }) => {
  let styleClass = 'uppercase text-sm mr-4 mt-2 hover:font-bold ';

  switch (actionType) {
    case crudActionTypes.create:
      styleClass += 'text-primary-500';
      break;
    case crudActionTypes.update:
      styleClass += 'text-gray-600';
      break;
    case crudActionTypes.delete:
      styleClass += 'text-red-600';
      break;
  }

  const handleOnClick = () => {
    onClickHandler();
  };

  return (
    <button type='button' className={styleClass} onClick={handleOnClick}>
      {actionType}
    </button>
  );
};

export default CrudButton;
