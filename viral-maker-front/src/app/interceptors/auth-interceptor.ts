import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, switchMap, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');

        const authReq = token
            ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
            : req;

        return next.handle(authReq).pipe(
            catchError(err => {
                if (err.status === 401 && localStorage.getItem('refresh_token')) {
                    return this.http.post<any>('http://127.0.0.1:8000/refresh', {
                        refresh_token: localStorage.getItem('refresh_token')
                    }).pipe(
                        switchMap(res => {
                            console.log('Token refreshed successfully:', res);
                            localStorage.setItem('access_token', res.access_token);
                            const retryReq = req.clone({
                                setHeaders: { Authorization: `Bearer ${res.access_token}` }
                            });
                            return next.handle(retryReq);
                        }),
                        catchError(refreshErr => {
                            localStorage.clear();
                            this.router.navigate(['/login']);
                            return throwError(() => refreshErr);
                        })
                    );
                }
                return throwError(() => err);
            })
        );
    }
}
