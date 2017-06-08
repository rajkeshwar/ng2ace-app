import {Ng2vPopoverConfig} from './popover-config';

describe('ng2v-popover-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vPopoverConfig();

    expect(config.placement).toBe('top');
    expect(config.triggers).toBe('click');
    expect(config.container).toBeUndefined();
  });
});
