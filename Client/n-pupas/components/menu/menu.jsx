import { adminMenuOptions, employeeMenuOptions } from 'constants/data';
import MenuOption from './option';

const HomeMenu = ({ isAdmin = false }) => {
  const options = isAdmin ? adminMenuOptions : employeeMenuOptions;

  return (
    <div className='grid grid-cols-2 gap-4'>
      {options.map(option => {
        return <MenuOption key={option.route} option={option} />;
      })}
    </div>
  );
};

export default HomeMenu;
