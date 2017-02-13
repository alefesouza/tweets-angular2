import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { TweetComponent } from './components/tweet/tweet.component';

import { TweetsService } from './components/tweets/services/tweets.service';

import { AppRoutingModule }  from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TweetsComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  providers: [TweetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
