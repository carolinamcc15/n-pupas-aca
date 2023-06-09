import { ChatBubbleBottomCenterIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ReportIcon } from 'components/icons/ReportIcon';
import { employeeRoutes, adminRoutes } from 'routes/routes';
import { homePageName, profilePageName } from './strings';
import { employeePages, adminPages } from './strings';

export const tokenCookie = 'token';
export const roleCookie = 'role';
export const branchCookie = 'branch';

export const adminRole = 'Admin';
export const employeeRole = 'Employee';

export const employeeMenuOptions = [
  {
    title: employeePages.report,
    route: employeeRoutes.report,
    img: '/informe.png',
    color: '#5C6EC9',
  },
  {
    title: employeePages.comments,
    route: employeeRoutes.comments,
    img: '/mensaje.png',
    color: '#5BB7D3',
  },
];

export const adminMenuOptions = [
  { title: adminPages.sales, route: adminRoutes.sales, img: '/ventas.png', color: '#4ABF47' },
  { title: adminPages.menu, route: adminRoutes.menu, img: '/menu.png', color: '#E0935B' },
  {
    title: adminPages.employees,
    route: adminRoutes.employees,
    img: '/trabajador.png',
    color: '#5C6EC9',
  },
  {
    title: adminPages.purchases,
    route: adminRoutes.purchases,
    img: '/compras.png',
    color: '#C35EB3',
  },
  {
    title: adminPages.branches,
    route: adminRoutes.branches,
    img: '/reportes.png',
    color: '#5BB7D3',
  },
];

export const adminMenuStatsOptions = [
  { title: adminPages.stats, route: adminRoutes.stats, img: '/stats.png', color: '#4A3957' },
  {
    title: adminPages.reports,
    route: adminRoutes.reports,
    img: '/reportes.png',
    color: '#4A3957',
  },
];

export const statsTimeOptions = {
  today: 'Este día',
  day: 'Un día',
  range: 'Rango',
};

export const statsRadioButtons = [
  statsTimeOptions.today,
  statsTimeOptions.day,
  statsTimeOptions.range,
];

export const statsTabs = [
  {
    id: 0,
    title: 'Ventas',
    options: statsRadioButtons,
  },
  {
    id: 1,
    title: 'Compras',
    options: statsRadioButtons,
  },
];

export const adminNav = [
  {
    name: `${homePageName}`,
    route: `${adminRoutes.home}`,
  },
  {
    name: `${profilePageName}`,
    route: `${adminRoutes.profile}`,
  },
];

export const employeeNav = [
  {
    name: `${homePageName}`,
    route: `${employeeRoutes.home}`,
  },
  {
    name: `${profilePageName}`,
    route: `${employeeRoutes.profile}`,
  },
];

export const actionButtons = {
  edit: {
    icon: <PencilIcon className='w-4 text-white' />,
    tooltip: 'Editar',
    color: '#6693D7',
  },
  delete: {
    icon: <TrashIcon className='w-4 text-white' />,
    tooltip: 'Eliminar',
    color: '#DB7777',
  },
  comment: {
    icon: <ChatBubbleBottomCenterIcon className='w-4 text-white' />,
    tooltip: 'Comentario',
    color: '#EEA96A',
  },
  reports: {
    icon: <ReportIcon />,
    tooltip: 'Reportes',
    color: '#92D450',
  },
};
