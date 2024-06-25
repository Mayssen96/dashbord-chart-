import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);
    private isLoggedIn$ = this.authSubject.asObservable();
    token!: any;
    currentUser = {};
    endpoint: string = 'http://localhost:9090/users/';

    constructor(private http: HttpClient, private router: Router) {}

    signin(data: any) {
        {
            console.log('user signin ', data);
            return this.http.post(this.endpoint + 'login', data);
        }
    }

    register(data: any) {
        return this.http.post(this.endpoint , data);
    }

    logout() {
        window.localStorage.clear();
        this.updateLoggedInState(false);
        // this.router.navigateByUrl('/login');
        // window.location.reload();
    }

    getToken(): any {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    public updateLoggedInState(status: boolean) {
        this.authSubject.next(status);
    }

    public isAuthenticated(): Observable<boolean> {
        if (this.getToken()) {
            this.updateLoggedInState(true);
        }
        return this.isLoggedIn$;
    }

    public getRole() {
        return localStorage.getItem('role');
    }
    public getId(){
        return localStorage.getItem('id')
    }
    public getTracabilite(){
        return localStorage.getItem('tracabilite')
    }
    public getTracabiliteMap(){
        return localStorage.getItem('tracabiliteMap')
    }
    public getAnalyse(){
        return localStorage.getItem('analyse')
    }
    public getVisualisation(){
        return localStorage.getItem('visualisation')
    }
    public getimportCSV(){
        return localStorage.getItem('importCSV')
    }
    public isimportCSV() {
        const importCSV = this.getimportCSV();
        // console.log('hfgfghfg',importCSV)
        if(importCSV=='true'){
            return true;
        }

        return false;
    }
    public isAnalyse() {
        const analyse = this.getAnalyse();
        // console.log('hfgfghfg',analyse)
        if(analyse=='true'){
            return true;
        }

        return false;
    }
    public isTracabilite() {
        const tracabilite = this.getTracabilite();
        if(tracabilite=='true'){
            return true;
        }

        return false;
    }
    public isTracabiliteMap() {
        const tracabiliteMap = this.getTracabiliteMap();
        if(tracabiliteMap=='true'){
            return true;
        }

        return false;
    }
    public isVisualisation() {
        const visualisation = this.getVisualisation();
        if(visualisation=='true'){
            return true;
        }

        return false;
    }
    public isAdmin() {
        const userRole = this.getRole();
        if (userRole === 'ROLE_ADMIN') {
            return true;
        }
        return false;
    }
    getCurrentUserId(): number {
        // Implement the logic to get the current user's ID
        return 1; // Example: Replace with actual logic
      }
}
