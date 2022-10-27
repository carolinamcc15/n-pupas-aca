import { adminRole, employeeRole, roleCookie, tokenCookie } from 'constants/data';
import { adminRoutes, employeeRoutes, loginRoute } from 'routes/routes';
import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export const middleware = (req, res) => {
  let { pathname } = req.nextUrl;
  const token = getCookie(tokenCookie, { req, res });
  const role = getCookie(roleCookie, { req, res });

  if (token && role) {
    if (pathname.startsWith('/admin') && role !== adminRole) {
      const url = req.nextUrl.clone();
      url.pathname = employeeRoutes.home;
      return NextResponse.redirect(url);
    } else if (pathname.startsWith('/empleado') && role !== employeeRole) {
      const url = req.nextUrl.clone();
      url.pathname = adminRoutes.home;
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname.startsWith('/admin') || pathname.startsWith('/empleado')) {
      const url = req.nextUrl.clone();
      url.pathname = loginRoute;
      return NextResponse.redirect(url);
    }
  }
};
