import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageListComponent } from './messagelist.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MessageListComponent }
	])],
	exports: [RouterModule]
})
export class MessageListRoutingModule { }
