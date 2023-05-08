import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from '../api/User';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

      getUsers() {
        return this.http.get(environment.apiBaseUrl+'users');

      }

      //save user
      addUser(data:any){
        return this.http.post(environment.apiBaseUrl+'users', data);
      }
      //update user
      updateUser(data:any, id:number){
        return this.http.put(environment.apiBaseUrl+'users/'+id, data);
      }
      //save support
      addSupport(data:any){
        return this.http.post(environment.apiBaseUrl+'supports', data);
      }
      //update support
      updateSupport(data:any, id:number){
        return this.http.put(environment.apiBaseUrl+'supports/'+id, data);
      }

      //log in user/support
      login(data:any){
        return this.http.post(environment.apiBaseUrl+'users/login', data).pipe(
          catchError(error => {
            throw new Error('Unable to login' +error);
          })
          );
      }

      get user(): User {
        let user = sessionStorage.getItem('user');
        if(user==null)
            return {"id":0,"name":"","email":"","role":"Visiteur","created_at":""};
        return  JSON.parse(user);
      }

      get isLoggedIn(): boolean {
        return  this.user.id==0 ? false : true;
      }

      get isSupport(): boolean {
        return  this.user.role ==="Support" ? true : false;
      }

      logout(){
        sessionStorage.removeItem('user');
      }

       //delete  user/support
       delete(id:number){
        return this.http.delete(environment.apiBaseUrl+'users/'+id);
      }
}
