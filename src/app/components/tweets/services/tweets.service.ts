import { Injectable } from '@angular/core';

import { Tweet } from './../../../shared/models/tweet.model';

import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TweetsService {
    private tweetsUrl = 'https://alefesouza.com/github/tweets.php';

    constructor(private http: Http) { }

    getTweets(): Promise<Tweet[]> {
        return this.http.get(this.tweetsUrl)
                .toPromise()
                .then(response => response.json().tweets as Tweet[])
                .catch(this.handleError);
    }

    getMyTweets(): Promise<Tweet[]> {
        return this.http.get(this.tweetsUrl + "?my_tweets=true")
                .toPromise()
                .then(response => response.json().tweets as Tweet[])
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}