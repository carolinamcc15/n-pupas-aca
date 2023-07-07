import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  calculateAllSalesTotal,
  calculateSaleTotal,
  calculateSoldProducts,
  calculateTodayExpenses,
} from './utils';
import React from 'react';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import toast from 'react-hot-toast';


export const generatePDFpred = (projections) => {
    
    const fetchapi = async () =>{
        try{
              
              const salesColumns = ['ID', 'Sucursal', 'Mes', 'Total'];
              const salesRows = [];
              
              salesRows.push([projections.id, projections.sucursal, projections.mes, projections.monto]);
            
            const doc = new jsPDF('p', 'pt');
        
            const header = () => {
            doc.setFontSize(16);
            doc.text('Proyeccion de Ventas', 40, 50);
            doc.setFontSize(12);
            };
        
            doc.setFontSize(14);
        
            doc.text('Detalle de Proyeccion de Ingresos (ventas)', 40, doc.autoTableEndPosY() + 40);
            doc.autoTable(salesColumns, salesRows, {
            startY: doc.autoTableEndPosY() + 50,
            pageBreak: 'auto',
            margin: { horizontal: 40, top: 10, bottom: 20 },
            beforePageContent: header,
            });
        

            doc.save(`reporte.pdf`);
            window.open(doc.output('bloburl'));

        }catch(error){
            toast.error('Ocurrió un error interno');
        };
    }

    fetchapi();

}

export default generatePDFpred;

