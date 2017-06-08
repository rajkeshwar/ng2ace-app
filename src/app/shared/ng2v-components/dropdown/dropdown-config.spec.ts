import {Ng2vDropdownConfig} from './dropdown-config';

describe('ng2v-dropdown-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vDropdownConfig();

    expect(config.up).toBe(false);
    expect(config.autoClose).toBe(true);
  });
});
