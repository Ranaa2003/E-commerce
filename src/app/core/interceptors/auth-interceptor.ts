import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const protectedUrls = ['/cart', '/wishlist', '/orders'];
  const isProtected = protectedUrls.some((url) => req.url.includes(url));
  const hasToken = cookieService.check('token');

  if (isProtected && !hasToken) {
    return EMPTY;
  }

  return next(req);
};
