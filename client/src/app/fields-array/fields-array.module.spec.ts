import { FieldsArrayModule } from './fields-array.module';

describe('FieldsArrayModuleModule', () => {
  let fieldsArrayModuleModule: FieldsArrayModule;

  beforeEach(() => {
    fieldsArrayModuleModule = new FieldsArrayModule();
  });

  it('should create an instance', () => {
    expect(fieldsArrayModuleModule).toBeTruthy();
  });
});
