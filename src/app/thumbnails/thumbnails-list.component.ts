// import { Component } from '@angular/core';

// @Component({
  
//   templateUrl: './thumbnails-list.component.html',
//   styleUrls: ['./thumbnails-list.component.css']
// })
// export class ThumbnailsListComponent {
//   title = 'newInstaApp';
// }


import { Component, OnInit } from "@angular/core";
import { IThumbnail } from "./thumbnails";
import { ThumbnailService } from "./thumbnail.service";
@Component({
    selector: 'thumbnail-list', 
    templateUrl:'./thumbnails-list.component.html',
    styleUrls: ['./thumbnails-list.component.css']
})

export class ThumbnailsListComponent implements OnInit{

    pageTitle: string = 'Instagram';

    thumbnails: IThumbnail[]=[];
    p:any;
    constructor(private thumbnailService: ThumbnailService){}

    ngOnInit(): void {
        this.thumbnailService.getThumbnails().subscribe({
            next: photos => {
                this.thumbnails = photos;
            },
         });   
    }

    onDelete(thumbnail:IThumbnail){
        
        console.log("in onDelete");
        if(confirm("Are you sure to delete "+thumbnail.title+ "?")){
            this.thumbnailService.deleteThumbnail(thumbnail).subscribe(
                result => {
                    console.log('success: ', result);
                  } ,    
                  error => console.log('error: ', error)
            )
        }
    }
    
}
