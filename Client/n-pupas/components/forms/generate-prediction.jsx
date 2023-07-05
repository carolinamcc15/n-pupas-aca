import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';
import Input from './inputs/text-input';
import { LockClosedIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';


const GeneratePredictionForm = ({ onSubmitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    onSubmitHandler(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 items-center justify-center w-full sm:px-4'>
        <div className='flex flex-col gap-5 items-center justify-center w-full sm:px-4'>
            <p className='text-center gap-5 mb-10'>
                El reporte de proyeccion de ventas segun el historial de ventas de la sucursal selecionada será generado en un archivo de formato PDF
            </p>
            <PrimaryButton text='Generar reportes' />
        
        </div>
    </form>
  );
  
};

export default GeneratePredictionForm;