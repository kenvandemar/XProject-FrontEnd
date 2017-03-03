import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewComponent } from './components/review/review.component';
import { AuthGuard } from './auth.guard';
import { RankingComponent } from './components/ranking/ranking.component';
import { GenreComponent } from './components/genre/genre.component';
import { BookInfoComponent } from './components/book/bookInfo.component';
import { ChapComponent } from './components/book/chap.component';
import { AuthorComponent } from './components/author/author.component';
import { ReviewEditComponent } from './components/review/review-edit/review-edit.component';
import { ReviewDetailComponent } from './components/review/reviewDetail.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';

import { ChapCreateComponent } from './components/book/chap-create/chap-create.component';
import { ChapEditComponent } from './components/book/chap-edit/chap-edit.component';

import { StoryManageComponent } from './components/mod/storyManage/storyManage.component';
import { StoryCensorshipComponent } from './components/mod/storyCensorship/storyCensorship.component';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    //** Review Routing Section
    {
        path: 'thao-luan',
        component: ReviewComponent
    },
    {  
        path: 'thao-luan/them-moi',
        component: ReviewEditComponent,
        canActivate: [AuthGuard]
    },   
    {  
        path: 'thao-luan/:slug',
        component: ReviewDetailComponent
    },
    {   
        path: 'thao-luan/:ReviewId/edit',
        component: ReviewEditComponent,
        canActivate: [AuthGuard]
    },
     //** End Review Routing Section
    {
        path: 'bang-xep-hang',
        component: RankingComponent 
    },
    {
        path: 'chuyen-muc/:slug',
        component: GenreComponent 
    },
    // **Chapter Routing Section
    {
        path:'sach/:slug/them-chap',
        component: ChapCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'sach/:slug/:chapnumber/sua-chap',
        component: ChapEditComponent,
        canActivate: [AuthGuard]
    },


    //** Book Routing Section
      {  
        path: 'sach/themsach',
        component: BookCreateComponent,
        canActivate: [AuthGuard]
    }, 
    {
        path: 'sach/:slug',
        component: BookInfoComponent 
    },
    {
        path: 'sach/:slug/:chap',
        component: ChapComponent 
    },
    // **End Book Routing Section
    //** Manage Routing Section
    {  
        path: 'quan-ly/sach',
        component: StoryManageComponent,
        canActivate: [AuthGuard]
    }, 
    {  
        path: 'quan-ly/sach/kiem-duyet',
        component: StoryCensorshipComponent,
        canActivate: [AuthGuard]
    }, 
    // **End Book Routing Section
    {
        path: 'tac-gia/:slug',
        component: AuthorComponent 
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full' 
    }
];
export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});