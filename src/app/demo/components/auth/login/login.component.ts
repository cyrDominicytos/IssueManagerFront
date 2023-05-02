import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { User } from 'src/app/demo/api/User';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    email: String ="";
    valCheck: string[] = ['remember'];
    password!: string;
    findError: boolean = false;
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router) { }

    submit(){
            const data = {
                "email": this.email,
                "password": this.password
              };
          
            this.userService.login(data).subscribe((data: any) =>{
                const user = data as  User; 
                     if(user!= null && user.id > 0 )   
                     {
                        sessionStorage.setItem('user', JSON.stringify(data));
                        this.goToTicketListRoute();
                        //login success !
                     } else{
                        //no error but credentiels incorrects
                        this.findError = true;
                        console.log("finderror")
                     }
            },
            (error) => {
                  // error and credentiels incorrects
              console.error(error);
              this.findError = true;
            })
          
                       
        }
        
        goToTicketListRoute() {
            this.router.navigate(['/tickets']);
        }

   
}
