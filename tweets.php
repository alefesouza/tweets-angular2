<?php
header('Access-Control-Allow-Origin: *');  

class Tweet {
    public $id, $date, $link, $text, $user_name, $screen_name, $photo, $media, $retweet_count, $favorite_count;
    public function __construct($id, $date, $link, $text, $user_name, $screen_name, $photo, $media, $retweet_count, $favorite_count) {
        $this->id = $id;
        $this->date = $date;
        $this->link = $link;
        $this->text = $text;
        $this->user_name = $user_name;
        $this->screen_name = $screen_name;
        $this->photo = $photo;
        $this->media = $media;
        $this->retweet_count = $retweet_count;
        $this->favorite_count = $favorite_count;
    }
}

class TwitterAPI {
    private $token;
    const api_base = "https://api.twitter.com/";
  
    const appKey = "";
    const appSecret = "";
    const twitterSearch = "@alefERROR -RT";
	const myTweets = "from:alefERROR";
  
    public function __construct($token) {
        $this->token = $token;
    }
  
    public static function getToken() {
        $bearer_token_creds = base64_encode(self::appKey.":".self::appSecret);
		
        $opts = array(
            "http" => array(
                "method" => "POST",
                "header" => "Authorization: Basic ".$bearer_token_creds."\r\n".
                        "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
                "content" => "grant_type=client_credentials"
            )
        );
        $context = stream_context_create($opts);
        $json = file_get_contents(self::api_base."oauth2/token", false, $context);
        $result = json_decode($json,true);
        return $result["access_token"];
    }
  
    public function getTweets($max_id) {
        $opts = array(
            "http" => array(
                "method" => "GET",
                "header" => "Authorization: Bearer ".$this->token
            )
        );
        if($max_id != "") {
            $max_id = "&max_id=".$max_id;
        }
        $context = stream_context_create($opts);
      
        if($_GET["my_tweets"] == "true") {
          $get_url =
              self::api_base."1.1/search/tweets.json?".
                  "count=30".
                  "&q=".urlencode(self::myTweets).
                  "&result_type=recent".
                  "&include_entities=true".
                  $max_id;
        } else {
          $get_url =
              self::api_base."1.1/search/tweets.json?".
                  "count=30".
                  "&q=".urlencode(self::twitterSearch).
                  "&result_type=recent".
                  "&include_entities=true".
                  $max_id;
        }
      
        $json = file_get_contents($get_url, false, $context);
        return $json;
    }
  
    public function makeAppJson($json) {
        $twitter_json = json_decode($json);
        foreach($twitter_json->statuses as $tweet) {
            $medias = array();

            $text = (string)$tweet->text;

            if(isset($tweet->extended_entities)) {
                if(count($tweet->extended_entities->media) > 0) {
                    foreach($tweet->extended_entities->media as $media) {
                        $medias[] = array("url" => $media->media_url);
                        $text = str_replace($media->url, $media->display_url, $text);
                    }
                }
            }

            if(count($tweet->entities->urls) > 0) {
                foreach($tweet->entities->urls as $media) {
                    $text = str_replace($media->url, $media->display_url, $text);
                }
            }

            $date = date("H:i d/m/Y", strtotime($tweet->created_at));
            $id = (string)$tweet->id_str;
            $date = (string)$date;
            $link = "http://twitter.com/".$tweet->user->screen_name."/status/".$tweet->id_str;
            $user_name = (string)$tweet->user->name;
            $screen_name = "@".$tweet->user->screen_name;
            $photo = str_replace("normal", "bigger", (string)$tweet->user->profile_image_url);
            $media = $medias;
            $retweet_count = (int)$tweet->retweet_count;
            $favorite_count = (int)$tweet->favorite_count;

            $new_tweet = new Tweet($id, $date, $link, $text, $user_name, $screen_name, $photo, $media, $retweet_count, $favorite_count);
            $tweets[] = $new_tweet;
        }
      
        $more_tweets = isset($tweets[10]);
        $max_id = isset($tweets[10]) ? $tweets[10]->id : "0";
        $returnTweets = array_slice($tweets, 0, 10);
        $returnJson = array(
            "more_tweets" => (bool)$more_tweets,
            "max_id" => $max_id,
            "tweets" => $returnTweets
        );
        return json_encode($returnJson);
    }
}

$token = TwitterAPI::getToken();

$api = new TwitterAPI($token);

$max_id = isset($_GET["max_id"]) ? $_GET["max_id"] : "";

$tweets = $api->getTweets($max_id);

echo $api->makeAppJson($tweets);
?>