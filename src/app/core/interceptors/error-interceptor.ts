import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  if (req.url.includes('/auth')&&req.url.includes('/cart')) {
    return next(req);
  } else {
    return next(req).pipe(
      catchError((err) => {
        toaster.error(err.error.message);
        return throwError(() => err);
      })
    );
  }
};
