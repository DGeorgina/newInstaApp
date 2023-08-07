import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { IThumbnail } from "./thumbnails";

@Injectable({
    providedIn:'root'
})
export class ThumbnailService{
    constructor(private http:HttpClient){
    }

    private thumbnailUrl='https://jsonplaceholder.typicode.com/photos'


    getThumbnails(): Observable<IThumbnail[]> { 
        return this.http.get<IThumbnail[]>(this.thumbnailUrl);
    }

    getThumbnailById(id: number): Observable<IThumbnail | undefined> {
        return this.getThumbnails()
          .pipe(
            map((items: IThumbnail[]) => items.find(i => i.id === id))
          );
      }

      postThumbnail(thumbnail:IThumbnail): Observable<any>{
            return this.http.post('https://jsonplaceholder.typicode.com/photos',thumbnail);
            // return of(thumbnail);
      }



    //   postThumbnail(thumbnail:IThumbnail): Object{
    //    return fetch('https://jsonplaceholder.typicode.com/photos', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //          thumbnail
    //         }),
    //         headers: {
    //           'Content-type': 'application/json; charset=UTF-8',
    //         },
    //       })
    //         .then((response) => response.json())
    //         .then((json) => console.log(json));
    //   }

    deleteThumbnail(photo:IThumbnail):Observable<any>{
       return this.http.delete("https://jsonplaceholder.typicode.com/photos/"+photo.id); 
    }

    editThumbnail(photo:IThumbnail){
      return this.http.put("https://jsonplaceholder.typicode.com/photos/"+photo.id,photo);
    }
}