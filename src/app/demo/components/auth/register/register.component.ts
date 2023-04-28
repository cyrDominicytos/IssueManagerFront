import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    grads: any[] = [];
    selectedGrad: any  = {};
    showClear: boolean = false;
    isAdminOrSupport: boolean = false;
    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService) { }
}
