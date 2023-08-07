import { Component, OnInit } from '@angular/core';
import { IThumbnail } from './thumbnails';
import { ThumbnailService } from './thumbnail.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  title = "Thumbnail settings";
  defaultThumbnail:IThumbnail={
    title: '',
    albumId: null,
    id: 0,
    url: '',
    thumbnailUrl: ''
  }
  thumbnail!: IThumbnail;
  errorMessage = '';
  editFlag: boolean = false;

  constructor(private thumbnailService: ThumbnailService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.thumbnail=this.defaultThumbnail;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.editFlag = true;
      this.getThumbnail(id);
    }
  }

  getThumbnail(id: number): void {
    this.thumbnailService.getThumbnailById(id).subscribe({
      next: thumbnail => {
        if (thumbnail != undefined)
          this.thumbnail = thumbnail
      },
      error: err => this.errorMessage = err
    });
  }

  onSubmit(form: NgForm) {
    console.log('in OnSubmit() , form.valid= ' + form.valid);
    console.log("editFlag= " + this.editFlag);

    if (this.editFlag) 
      this.thumbnailService.editThumbnail(this.thumbnail).subscribe(
        {next: result => this.nextFunc(result),error: error => this.errorFunc(error) })
    else 
      this.thumbnailService.postThumbnail(this.thumbnail).subscribe(
        {next: result => this.nextFunc(result),error: error => this.errorFunc(error)})
    
  }
  nextFunc(result:any){
    console.log('success: ', result);
    this.router.navigate(['/thumbnails'])
  }
  errorFunc(error:any){
    console.log('error: ', error)
  }

  onCancel(){
    this.router.navigate(['/thumbnails']);
  }

  onReset(){
    if(this.editFlag)
      this.thumbnail.title='';
    else
      this.thumbnail=this.defaultThumbnail;
  }
}