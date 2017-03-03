import { XFrontPage } from './app.po';

describe('xfront App', function() {
  let page: XFrontPage;

  beforeEach(() => {
    page = new XFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
