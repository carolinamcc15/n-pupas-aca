import AddButton from 'components/buttons/add';

const PageHeading = ({ title, route, text }) => {
  return (
    <div className='flex flex-wrap gap-3 justify-between mb-2 items-center'>
      <h1 className='font-bold text-2xl sm:text-3xl text-primary-500'>{title}</h1>
      <AddButton route={route} text={text} />
    </div>
  );
};

export default PageHeading;
