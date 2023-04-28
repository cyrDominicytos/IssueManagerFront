import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TicketsComponent }
	])],
	exports: [RouterModule]
})
export class TicketsRoutingModule { }
