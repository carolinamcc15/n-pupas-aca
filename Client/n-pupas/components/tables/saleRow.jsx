const SaleTableRow = ({ sale }) => {
  return (
    <tr className='bg-white border-[1px] border-primary-300'>
      <th className='text-center px-3 py-3  whitespace-nowrap border-r-[1px] font-normal border-primary-300 truncate'>
        {sale.product.name}
      </th>
      <td className='text-center px-3 py-3 whitespace-nowrap border-r-[1px] border-primary-300 truncate'>
        {sale.soldAmount}
      </td>
      <td className='text-center px-3 py-3 whitespace-nowrap border-r-[1px] border-primary-300 truncate'>
        ${(sale.product.price * sale.soldAmount).toFixed(2)}
      </td>
    </tr>
  );
};

export default SaleTableRow;
