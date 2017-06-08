import {Ng2vTooltipConfig} from './tooltip-config';

describe('ng2v-tooltip-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vTooltipConfig();

    expect(config.placement).toBe('top');
    expect(config.triggers).toBe('hover');
    expect(config.container).toBeUndefined();
  });
});
