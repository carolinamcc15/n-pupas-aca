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
  { title: employeePages.comments, route: employeeRoutes.comments },
  { title: employeePages.report, route: employeeRoutes.report },
];

export const adminMenuOptions = [
  { title: adminPages.sales, route: adminRoutes.sales },
  { title: adminPages.menu, route: adminRoutes.menu },
  { title: adminPages.employees, route: adminRoutes.employees },
  { title: adminPages.purchases, route: adminRoutes.purchases },
  { title: adminPages.reports, route: adminRoutes.reports },
  { title: adminPages.branches, route: adminRoutes.branches },
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
