const PurchaseTableRow = ({ purchase }) => {
  return (
    <tr className='bg-white border-b'>
      <th
        scope='row'
        className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
      >
        {purchase.concept}
      </th>
      <td className='px-6 py-4 font-bold'>${purchase.amount.toFixed(2)}</td>
    </tr>
  );
};

export default PurchaseTableRow;
