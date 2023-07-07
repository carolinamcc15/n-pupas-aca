const BranchSelect = ({ onChangeHandler, branches, value }) => {
  const handleOnChange = e => {
    onChangeHandler(Number(e.target.value));
  };

  return (
    <select
      name='branch'
      value={value ? value : ''}
      onChange={handleOnChange}
      className='rounded-xl pb-px-8 bg-purple-100 border border-gray-50 w-full py-3 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500 '
    >
      {branches.length > 0 &&
        branches.map(branch => {
          return (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          );
        })}
    </select>
  );
};

export default BranchSelect;
