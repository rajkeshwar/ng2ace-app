import {Ng2vTypeaheadConfig} from './typeahead-config';

describe('ng2v-typehead-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vTypeaheadConfig();

    expect(config.editable).toBeTruthy();
    expect(config.focusFirst).toBeTruthy();
    expect(config.showHint).toBeFalsy();
  });
});
