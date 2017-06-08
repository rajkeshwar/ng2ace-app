import {Ng2vAlertConfig} from './alert-config';

describe('ng2v-alert-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vAlertConfig();

    expect(config.dismissible).toBe(true);
    expect(config.type).toBe('warning');
  });
});
