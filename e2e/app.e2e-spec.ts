import { FacebookLoginAppPage } from './app.po';

describe('facebook-login-app App', function() {
  let page: FacebookLoginAppPage;

  beforeEach(() => {
    page = new FacebookLoginAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
