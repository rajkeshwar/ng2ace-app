import {Ng2vCarouselConfig} from './carousel-config';

describe('ng2v-carousel-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vCarouselConfig();

    expect(config.interval).toBe(5000);
    expect(config.keyboard).toBe(true);
    expect(config.wrap).toBe(true);
  });
});
