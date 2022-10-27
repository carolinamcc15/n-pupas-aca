const SaleTableRow = ({ sale }) => {
  return (
    <tr className='bg-white border-b'>
      <th
        scope='row'
        className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
      >
        {sale.product.name}
      </th>
      <td className='px-6 py-4 font-bold  border-r-[1px] border-gray-250'>{sale.soldAmount}</td>
      <td className='px-6 py-4 font-bold'>${(sale.product.price * sale.soldAmount).toFixed(2)}</td>
    </tr>
  );
};

export default SaleTableRow;
