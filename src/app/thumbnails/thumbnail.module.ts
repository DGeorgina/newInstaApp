import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ThumbnailsListComponent } from "./thumbnails-list.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ThumbnailDetailComponent } from "./thumbnail-detail.component";
import { FormComponent } from "./form.component";
import { HttpClientModule } from "@angular/common/http";




@NgModule({
  declarations: [
    ThumbnailsListComponent,
    ThumbnailDetailComponent,
    FormComponent
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path:"thumbnails",component:ThumbnailsListComponent},
      {path:"thumbnails/:id",component:ThumbnailDetailComponent},
      {path:"form",component:FormComponent},
      {path:"edit/:id",component:FormComponent}
      
    ]),
    NgxPaginationModule,
    HttpClientModule,
    
  ],
  providers: [],
  
})
export class ThumbnailModule {
  

 }
