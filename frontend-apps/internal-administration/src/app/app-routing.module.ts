import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './components/bill/bill.component';
import { OcrComponent } from './components/ocr/ocr.component';

const routes: Routes = [
  { path: '', redirectTo: '/bill', pathMatch: 'full' },
  { path: 'bill', component: BillComponent },
  { path: 'ocr', component: OcrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
