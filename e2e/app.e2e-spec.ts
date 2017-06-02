import { Ng2aceAppPage } from './app.po';

describe('ng2ace-app App', () => {
  let page: Ng2aceAppPage;

  beforeEach(() => {
    page = new Ng2aceAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
