import { TweetsAngular2Page } from './app.po';

describe('tweets-angular2 App', function() {
  let page: TweetsAngular2Page;

  beforeEach(() => {
    page = new TweetsAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
