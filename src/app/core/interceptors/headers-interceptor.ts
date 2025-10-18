import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  //Req
  //send headers in request
  const cookieService = inject(CookieService);
  if (
    req.url.includes('cart') ||
    req.url.includes('orders') ||
    req.url.includes('wishlist')
  ) {
    if (cookieService.check('token')) {
      req = req.clone({
        setHeaders: { token: cookieService.get('token') },
      });
    }
  }
  //if token not exist send old req as it
  return next(req).pipe(
    catchError((err) => {
      return throwError(()=> err);
    })
  );
  //next return observable so i can have pipe ops on it
  //catchError has callbackfunction
  //if i returned error direct will throw erorr cause HttpInterceptorFn expects observable   
  ///so throwError Creates an observable that will create an error instance
};
//function implemented from HttpInterceptorFn interface
// has two parameters
// req:hold req info and
// next :function send req to next intercepors
//to handle req before return
// to handle res in next
