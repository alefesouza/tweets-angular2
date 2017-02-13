import { Component, OnInit } from '@angular/core';

import { Tweet } from './../../shared/models/tweet.model';
import { TweetsService } from './services/tweets.service';

@Component({
  moduleId: module.id,
  providers: [TweetsService],
  selector: 'tweets',
  templateUrl: './tweets.component.html'
})

export class TweetsComponent implements OnInit {
  tweets : Tweet[];
  myTweets : Tweet[];

  constructor(
    private tweetsService: TweetsService) {
  }

  getTweets(): void {
    this.tweetsService.getTweets().then(tweets => { this.tweets = tweets; });
    this.tweetsService.getMyTweets().then(myTweets => { this.myTweets = myTweets; });
  }

  ngOnInit(): void {
    this.getTweets();
  }
}