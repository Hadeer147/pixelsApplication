import { Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { BrowseComponent } from './Public/pages/browse/browse.component';
import { HomeComponent } from './Public/pages/home/home.component';
import { NewreleaseComponent } from './Public/pages/newrelease/newrelease.component';
import { NotFoundComponent } from './Public/pages/not-found/not-found.component';
import { PagesComponent } from './Public/pages/pages.component';
import { PlayingComponent } from './Public/pages/playing/playing.component';
import { PlaylistComponent } from './Public/pages/playlist/playlist.component';
import { ProfileComponent } from './Public/pages/profile/profile.component';
import { SinglemusicComponent } from './Public/pages/singlemusic/singlemusic.component';
import { LoginComponent } from './Public/users/login/login.component';
import { SettingProfileComponent } from './Public/users/setting-profile/setting-profile.component';
import { SignupComponent } from './Public/users/signup/signup.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      {
      path: 'home',
      component: HomeComponent
      },
      {
        path: 'browse',
        component: BrowseComponent,
        children: [
          {
            path: 'browse/all',
            component: AllComponent
          }
        ]
      },
      {
        path: 'single/:id',
        component: SinglemusicComponent
      },
      {
        path: 'newrel',
        component: NewreleaseComponent
      },
      {
        path: 'newrel',
        component: NewreleaseComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      { 
        path: 'playlist/:id', 
        component: PlaylistComponent
      },
      { 
        path: 'playing', 
        component: PlayingComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {path:'Settingprofile' , component:SettingProfileComponent},

  ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: '**', component: NotFoundComponent  }
];

export default routes;


