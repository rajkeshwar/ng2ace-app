import {Ng2vTabsetConfig} from './tabset-config';

describe('ng2v-tabset-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vTabsetConfig();

    expect(config.type).toBe('tabs');
    expect(config.justify).toBe('start');
  });
});
