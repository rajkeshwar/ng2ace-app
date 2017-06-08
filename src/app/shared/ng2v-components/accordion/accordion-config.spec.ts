import {Ng2vAccordionConfig} from './accordion-config';

describe('ng2v-accordion-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vAccordionConfig();

    expect(config.closeOthers).toBe(false);
    expect(config.type).toBeUndefined();
  });
});
