import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
 
    getAll(searchCondition: any) {
        return this.http.post(`${environment.apiUrl}/accounts/list`, searchCondition);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: any) {
        return this.http.post(`${environment.apiUrl}/accounts/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/accounts/update`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/accounts/delete/` + id);
    }
}