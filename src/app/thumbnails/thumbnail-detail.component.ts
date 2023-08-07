import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IThumbnail } from './thumbnails';
import { ThumbnailService } from './thumbnail.service';


@Component({
  templateUrl: './thumbnail-detail.component.html',
  styleUrls: ['./thumbnail-detail.component.css']
})
export class ThumbnailDetailComponent implements OnInit {
  pageTitle = 'Thumbnail Detail';
  errorMessage = '';
  thumbnail: IThumbnail | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private thumbnailService: ThumbnailService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getThumbnail(id);
    }
  }

  getThumbnail(id: number): void {
    this.thumbnailService.getThumbnailById(id).subscribe({
      next: thumbnail => this.thumbnail = thumbnail,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/thumbnails']);
  }

  onDelete(thumbnail:IThumbnail|undefined){
    if(thumbnail!=undefined){
      if(confirm("Are you sure to delete "+thumbnail.title+ "?")){
        this.thumbnailService.deleteThumbnail(thumbnail).subscribe({
            next: result => {
                console.log('success: ', result);
              } ,    
             error: error => console.log('error: ', error)
            })
    }
    }

    console.log("in onDelete");
    this.router.navigate(['/thumbnails'])


  }
}