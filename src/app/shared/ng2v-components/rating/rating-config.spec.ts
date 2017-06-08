import {Ng2vRatingConfig} from './rating-config';

describe('ng2v-rating-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vRatingConfig();

    expect(config.max).toBe(10);
    expect(config.readonly).toBe(false);
    expect(config.resettable).toBe(false);
  });
});
