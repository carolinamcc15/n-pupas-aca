import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { confirmAlert } from 'react-confirm-alert';
import BranchCard from 'components/cards/branch';
import { adminPages } from 'constants/strings';
import { useState, useEffect } from 'react';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';
import useAuthContext from 'context/AuthContext';
import TaskCard from 'components/cards/task-card';

const pupuseriaApi = new PupuseriaApi();

const TaskPage = ({ allTasks }) => {
  const [tasks, setTasks ] = useState(allTasks);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    const getAllTasks = async () => {
      const tasks = await pupuseriaApi.getAllTasks(token);
      setTasks(tasks);
    };
    getAllTasks();
  }, [deleteToggle]);

  const deleteTask = async id => {
    try{
        const deleted = await pupuseriaApi.deleteTask(token, id);
        if(deleted){
            setDeleteToggle(!deleteToggle);
            toast.success('Tarea elminada');
        }else{
            toast.error('No se pudo eliminar la tarea!');
        }
    }catch(e){
        toast.error('Ocurrio un error interno!');
    }
  };

  const onDeleteHandler = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={() => deleteTask(id)}
            text={`¿Segura/o que quieres eliminar la tarea "${id}"?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 sm:px-10 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.task}</title>
      </Head>
      <PageHeading
        title={adminPages.task}
        route={adminRoutes.newTask}
        text='Agregar Tarea'
      />
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {tasks.length > 0 &&
          tasks.map(task => {
            return (
              <TaskCard 
                task={task}
                key={task.id}
                onDeleteHandler={() => onDeleteHandler(task.id)}
              />
            );
          })}
      </div>
    </main>
  );
};

export default TaskPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const allTasks = await pupuseriaApi.getAllTasks(token);
    return {
      props: {
        allTasks: allTasks,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/500',
      },
    };
  }
}
