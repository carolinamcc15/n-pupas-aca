import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  calculateAllSalesTotal,
  calculateSaleTotal,
  calculateSoldProducts,
  calculateTodayExpenses,
} from './utils';

export const generatePDF = (purchases, sales, dates) => {
  const doc = new jsPDF('p', 'pt');

  const purchasesColumns = ['ID', 'Concepto', 'Fecha', 'Monto'];
  const purchasesRows = [];

  const salesColumns = ['ID', 'Productos vendidos', 'Fecha', 'Total'];
  const salesRows = [];

  purchases.forEach(purchase => {
    const purchaseData = [
      purchase.id,
      purchase.concept,
      purchase.purchaseDate,
      `$${purchase.amount.toFixed(2)}`,
    ];
    purchasesRows.push(purchaseData);
  });

  sales.forEach(sale => {
    const saleData = [
      sale.id,
      calculateSoldProducts(sale.details),
      sale.saleDate,
      `$${calculateSaleTotal(sale.details).toFixed(2)}`,
    ];
    salesRows.push(saleData);
  });

  purchasesRows.push(['', '', '', `$${calculateTodayExpenses(purchases)}`]);
  salesRows.push(['', '', '', `$${calculateAllSalesTotal(sales).toFixed(2)}`]);

  const header = () => {
    doc.setFontSize(16);
    doc.text('Reporte de ingresos y egresos', 40, 50);
    doc.setFontSize(12);
    doc.text(`Desde ${dates.initialDate} hasta ${dates.finalDate}`, 40, 70);
  };

  doc.setFontSize(14);
  doc.text('Detalle de egresos (compras)', 40, 110);
  doc.autoTable(purchasesColumns, purchasesRows, {
    startY: 120,
    pageBreak: 'auto',
    margin: { horizontal: 40, top: 80, bottom: 10 },
  });

  doc.text('Detalle de ingresos (ventas)', 40, doc.autoTableEndPosY() + 40);
  doc.autoTable(salesColumns, salesRows, {
    startY: doc.autoTableEndPosY() + 50,
    pageBreak: 'auto',
    margin: { horizontal: 40, top: 10, bottom: 10 },
    beforePageContent: header,
  });

  const date = Date().split(' ');
  const dateStr = date[0] + date[1] + date[2] + date[3];
  doc.save(`reporte_${dateStr}.pdf`);
  window.open(doc.output('bloburl'));
};

export default generatePDF;
