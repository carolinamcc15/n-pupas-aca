import AddButton from 'components/buttons/add';

const PageHeading = ({ title, route }) => {
  return (
    <div className='flex flex-wrap gap-3 justify-between mb-2 items-center'>
      <h1 className='font-bold text-2xl sm:text-3xl'>{title}</h1>
      <AddButton route={route} />
    </div>
  );
};

export default PageHeading;