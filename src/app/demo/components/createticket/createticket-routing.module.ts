import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateTicketComponent } from './createticket.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CreateTicketComponent }
	])],
	exports: [RouterModule]
})
export class CreateTicketRoutingModule { }
