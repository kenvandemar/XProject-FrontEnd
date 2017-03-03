//Author: Duy Khanh
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BookService } from '../book.service';
import { SlugService } from '../../../services/slug.service';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';
import { Story } from '../../../model/story.model';
import { Chapters } from '../../../model/chapters.model';
import { Author } from '../../../model/author.model';
import { ApiService } from '../../../services/api.service';
import { Genre } from '../../../model/genre.model';
import { UploadService } from '../../review/review-edit/upload.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  
})
export class BookCreateComponent implements OnInit, OnDestroy {

     bookInfo: any[];
     slug: string;
     storyId: number;
     sub: any;
      
   filesToUpload: Array<File>;
  imageName:string;
   authors: Author[] = [];
   genres: Genre[] = [];
   bookForm: FormGroup;
   Id: number;
   genreId: number;
   private _bookIndex: number;
   private _book: Story;
   private _subscription: Subscription;
   private _isNew = true;
   userInfo: any = JSON.parse(localStorage.getItem('profile'));
  constructor(private _bookService: BookService,
              private _slug: SlugService,
              private _http: Http,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _route: ActivatedRoute,
              private _api: ApiService,
              private _uploadService: UploadService) { 
                this.slug = _route.snapshot.params['Slug']
              }

  ngOnInit() {
    // this._subscription = this._route.params.subscribe(
    //   (params: any) => {
    //     if(params.hasOwnProperty('StoryId')){
    //       this._isNew = false;
    //       this._bookIndex =  +params['StoryId'];
    //       this._book = this._bookService.getBook(this._bookIndex);
    //     } else {
    //       this._isNew = true;
    //       this._book = null;
    //     }
        
    //   }
    // )
     this.sub = this._route.params.subscribe(params => {
      this.slug = params['slug'];
      this.getBookInfo(this.slug);
      // this.getListChap(this.start, this.slug);
    });
    this.initForm();

//Init Author and Genre for Dropdown
    this._subscription = this._route.params.subscribe(params => {
      this.Id = params['Id'];
      this.getAuthor();
      console.log(this.Id);
    })
    
    this._subscription = this._route.params.subscribe(params => {
      this.genreId = params['Id'];
      this.getGenre();
      console.log(this.genreId);
    })
  }
 getBookInfo(bookSlug:string){
    // Author: Linh Ho
    this._api.getApi("http://api.xtale.net/api/Stories/name/"+bookSlug)
              .subscribe(data =>{
              this.bookInfo = data; 
             console.log(data);         
          },
       error => this.bookInfo = <any>error);
  }

// Submit form
  onSubmit() {
      const newBook = this.bookForm.value;
      if(this._isNew) {
        this._bookService.addBook(newBook);
      } else {
        this._bookService.updateBook(this._book);
      }
      console.log(newBook);
  }

 // Handle UploadService
  fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
     upload() {    
        this._uploadService.makeFileRequest('http://api.xtale.net/api/FileUpload',[], this.filesToUpload)
                            .then((results) => {
                              console.log(results);
                              this.imageName = "http://api.xtale.net/imageupload/"+results.ImageUrl;
                              console.log(this.imageName);
                            }, (error) => {
                            console.error(error);
                          })                        
        console.log('sent');
        
     }

// GetAuthor

getAuthor() {
  return this._api.getApi("http://api.xtale.net/api/authors/")
                    .subscribe(data => this.authors = data,
                     error => this.authors = <any>error);
}
getGenre(){
  return this._api.getApi("http://api.xtale.net/api/genres")
                  .subscribe(data => this.genres = data,
                  error => this.authors = <any>error)
}

// Init Genres
  initGenres(){
    return this._formBuilder.group({
      GenreId: [1],
      GenreName: [''],
      GenreStatus: [3],
      Slug: ['']
    })
  }

// Init Chapters
initChapters() {
  return this._formBuilder.group({
      ChapterId: [1],
      StoryId: [2],
      ChapterNumber: [3],
      ChapterTitle: [''],
  })
}

// Initialize form
  private initForm() {
      
   let StoryName =  '';
   let StoryProgress = 4;
   let StoryDescription = '';
   let StoryStatus = 1;
   let CreatedDate = new Date().toUTCString();
   let LastEditedDate = new Date().toUTCString();
   let UserId = this.userInfo.user_id;
   let Score = 0;
   let RateCount = 0;
  let ImageUrl = 'http://www.love-sites.com/wp-content/uploads/2016/04/xem-hinh-girl-xinh9x-11-500x300.jpg'; 
   let Slug = '';


   if(!this._isNew) {
      StoryName = this._book.StoryName;
      StoryProgress = this._book.StoryProgress;
      StoryDescription = this._book.StoryDescription;
      StoryStatus = this._book.StoryStatus;  
      CreatedDate = this._book.CreatedDate.toUTCString();
      LastEditedDate = this._book.LastEditedDate.toUTCString();
      UserId = UserId;
      Score = this._book.Score;
      RateCount = this._book.RateCount;
      ImageUrl = this._book.Image;
      Slug = this._slug.getSlug(StoryName);
   }

   //Book FormBuiler
   this.bookForm = this._formBuilder.group({
      StoryName: [StoryName],
      StoryProgress : [StoryProgress],
      StoryDescription : [StoryDescription],
      StoryStatus : [StoryStatus],
      CreatedDate: [CreatedDate],
      LastEditedDate: [LastEditedDate],
      UserId : [UserId],
      Score : [Score],
      RateCount : [RateCount],
      Image : [ImageUrl],
      Slug : [StoryName],
      
      Author: [''],
      Genres: this._formBuilder.array([
        this.initGenres()
      ]),
      Chapters: this._formBuilder.array([
          this.initChapters()
      ])  
   });
  }

 onCancel(){
      this._bookService.navigateBack();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
