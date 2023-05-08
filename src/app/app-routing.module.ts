import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/tickets/tickets.module').then(m => m.TicketsModule)  },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    
                    { path: 'users', loadChildren: () => import('./demo/components/user-list/user-list.module').then(m => m.UserListModule) },
                    { path: 'tickets', loadChildren: () => import('./demo/components/tickets/tickets.module').then(m => m.TicketsModule) },
                    { path: 'tickets/:id', loadChildren: () => import('./demo/components/messagelist/messagelist.module').then(m => m.MessageListModule) },
                    { path: 'addTicket', loadChildren: () => import('./demo/components/createticket/createticket.module').then(m => m.CreateTicketModule) },
                    { path: 'updateTicket/:id', loadChildren: () => import('./demo/components/createticket/createticket.module').then(m => m.CreateTicketModule) },
                    { path: 'messages', loadChildren: () => import('./demo/components/messagelist/messagelist.module').then(m => m.MessageListModule) }

                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
