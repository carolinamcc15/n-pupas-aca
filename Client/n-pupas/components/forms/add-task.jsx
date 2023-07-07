import { useForm } from 'react-hook-form';
import { useRef } from 'react';

import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';
import DropdownInput from './inputs/dropdown';
import { CurrencyDollarIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { SolidCalendarIcon } from 'components/icons/SolidCalendarIcon';


const AddTaskForm = ({ onSubmitHandler, taskEmployee = false }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();
  
    const onSubmit = data => {
      onSubmitHandler(data);
    };
  
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:max-w-[900px] mx-auto flex flex-col gap-2'
      >
        <section className='flex flex-col gap-5 mb-5 px-0 sm:px-3'>
          <Input
            id='taskDescription'
            label='Descripcion de la Tarea'
            defaultValue={taskEmployee ? taskEmployee.taskDescription : ''}
            placeholder='Ej. Lavar Platos'
            icon={<UserCircleIcon className='text-primary-500 w-5' />}
            error={errors?.taskDescription?.message}
            register={{
              ...register('taskDescription', {
                required: 'Descripcion Requerida!',
                minLength: {
                  value: 8,
                  message: 'El mínimo de caracteres es 8',
                },
                maxLength: {
                  value: 80,
                  message: 'El máximo de caracteres es 80',
                },
              }),
            }}
          />
          <div className='flex flex-col gap-5 md:grid md:grid-cols-2'>
            <Input
              type='date'
              id='initDate'
              defaultValue={taskEmployee ? taskEmployee.initDate : ''}
              label='Fecha de Inicio'
              placeholder='12/10/2020'
              icon={<SolidCalendarIcon />}
              error={errors?.initDate?.message}
              register={{ ...register('initDate', { required: 'Fecha requerida' }) }}
            />
            <Input
              type='date'
              id='finishDate'
              defaultValue={taskEmployee ? taskEmployee.finishDate : ''}
              label='Fecha de Finalizacion'
              placeholder='12/10/2020'
              icon={<SolidCalendarIcon />}
              error={errors?.finishDate?.message}
              register={{ ...register('finishDate', { required: 'Fecha requerida' }) }}
            />
            <DropdownInput
              id='taskStatus'
              label='Estado de la Tarea'
              defaultValue={taskEmployee ? taskEmployee.taskStatus : ''}
              options={['PENDIENTE', 'RETRASADA', 'FINALIZADA']}
              error={errors?.taskStatus?.message}
              register={{ ...register('taskStatus', { required: 'Estado Requerido!' }) }}
            />
            <Input
              type='number'
              id='idAdmin'
              defaultValue={taskEmployee ? taskEmployee.idAdmin : ''}
              label='ID Admin'
              placeholder='1'
              icon={<SolidCalendarIcon />}
              error={errors?.idAdmin?.message}
              register={{ ...register('idAdmin', { required: 'Id Admin Requerido', min: { value: 1, message: 'Id mayor a cero'}, }), }}
            />
            <Input
              type='number'
              id='idEmployee'
              defaultValue={taskEmployee ? taskEmployee.idEmployee : ''}
              label='ID Empleado'
              placeholder='1'
              icon={<SolidCalendarIcon />}
              error={errors?.idEmployee?.message}
              register={{ ...register('idEmployee', { required: 'Id Empleado Requerido', min: { value: 1, message: 'Id mayor a cero'}, }), }}
            />
          </div>
        </section>
        <div className='m-auto'>
          <PrimaryButton text={taskEmployee ? 'Actualizar Tarea' : 'Agregar Tarea'} />
        </div>
      </form>
    );
  };
  export default AddTaskForm;
  