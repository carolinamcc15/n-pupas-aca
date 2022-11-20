import { adminMenuOptions, employeeMenuOptions } from 'constants/data';
import MenuOption from './option';

const HomeMenu = ({ isAdmin = false }) => {
  const options = isAdmin ? adminMenuOptions : employeeMenuOptions;
if(isAdmin==true){
  return (
    <div>
      <h2 className="md:text-center pb-8 text-lg sm:text-xl md:text-2xl font-medium text-primary-500">
      ¿Qué deseas gestionar?
      </h2>
      <div className='grid grid-cols-3 gap-4'>
        {options.map(option => {
          return <MenuOption key={option.route} option={option} />;
        })}
      </div>
    </div>
  );}else{
    return (
      <div>
        <h2 className="md:text-center pb-8 text-lg sm:text-xl md:text-2xl font-medium text-primary-500">
        ¿Qué deseas visualizar?
        </h2>
        <div className='grid grid-cols-1 gap-2'>
          {options.map(option => {
            return <MenuOption key={option.route} option={option} />;
          })}
        </div>
      </div>
    );
  }

};

export default HomeMenu;
