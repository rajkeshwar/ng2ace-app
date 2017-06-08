import {Ng2vProgressbarConfig} from './progressbar-config';

describe('ng2v-progressbar-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vProgressbarConfig();

    expect(config.max).toBe(100);
    expect(config.striped).toBe(false);
    expect(config.animated).toBe(false);
    expect(config.type).toBeUndefined();
    expect(config.showValue).toBe(false);
  });
});
