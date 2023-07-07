export const RadioButton = ({ option, selectedOption, handleOptionChange }) => {
  return (
    <label className={`${selectedOption === option ? 'font-semibold' : ''}`}>
      <input
        type='radio'
        value={option}
        className='mr-1'
        checked={selectedOption === option}
        onChange={handleOptionChange}
      />
      {option}
    </label>
  );
};
