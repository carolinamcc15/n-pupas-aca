const BranchSelect = ({ onChangeHandler, branches, value }) => {
  const handleOnChange = e => {
    onChangeHandler(Number(e.target.value));
  };

  return (
    <select
      name='branch'
      value={value ? value : ''}
      onChange={handleOnChange}
      className='shadow border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
    >
      {branches.map(branch => {
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
