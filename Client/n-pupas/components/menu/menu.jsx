import { adminMenuOptions, adminMenuStatsOptions, employeeMenuOptions } from 'constants/data';
import MenuOption from './option';

const HomeMenu = ({ isAdmin = false }) => {
  const options = isAdmin ? adminMenuOptions : employeeMenuOptions;
  if (isAdmin == true) {
    return (
      <div className='flex flex-col items-center gap-8 py-6'>
        <h2 className='md:text-center text-lg sm:text-xl md:text-2xl font-bold text-primary-500'>
          ¿Qué deseas gestionar?
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 px-5 sm:px-8 '>
          {options.map(option => {
            return <MenuOption key={option.route} option={option} />;
          })}
          {isAdmin ? (
            <div className='flex flex-col gap-5'>
              {adminMenuStatsOptions?.map(option => {
                return <MenuOption key={option.route} option={option} horizontal={true} />;
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-8 py-6'>
        <h2 className='md:text-center pb-5 text-lg sm:text-xl md:text-2xl font-medium text-primary-500'>
          ¿Qué deseas visualizar?
        </h2>
        <div className='grid grid-cols-1 gap-4 w-full px-8'>
          {options.map(option => {
            return <MenuOption key={option.route} option={option} horizontal={true} />;
          })}
        </div>
      </div>
    );
  }
};

export default HomeMenu;