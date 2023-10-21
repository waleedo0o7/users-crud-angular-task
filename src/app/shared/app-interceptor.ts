import { SharedService } from 'src/app/shared/shared.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.sharedService.loading$.next(true);
    let modifiedRequest: any;

    if (request.url === `${this.sharedService.apiURL}login`) {
      modifiedRequest = request.clone();
    } else {
      const accessToken = localStorage.getItem('authToken');

      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    //Pass the modified request to the next interceptor or the HTTP handler
    return next.handle(modifiedRequest).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.sharedService.loading$.next(false);
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.sharedService.loading$.next(false);
          }
        }
      )
    );
}
  }
