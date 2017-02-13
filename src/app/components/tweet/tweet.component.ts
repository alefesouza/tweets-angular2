import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Tweet } from './../../shared/models/tweet.model';

@Component({
  moduleId: module.id,
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: [ './tweet.component.css' ]
})

export class TweetComponent implements OnInit {
  @Input()
  tweet: Tweet;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  openTweet(tweet : Tweet) : void {
    window.open("https://twitter.com/" + tweet.screen_name + "/status/" + tweet.id);
  }

  user(tweet : Tweet) : void {
    window.open("https://twitter.com/intent/user?screen_name=" + tweet.screen_name);
  }

  reply(tweet : Tweet) : void {
    window.open("https://twitter.com/intent/tweet?in_reply_to=" + tweet.id);
  }

  like(tweet : Tweet) : void {
    window.open("https://twitter.com/intent/like?tweet_id=" + tweet.id);
  }

  retweet(tweet : Tweet) : void {
    window.open("https://twitter.com/intent/retweet?tweet_id=" + tweet.id);
  }
}