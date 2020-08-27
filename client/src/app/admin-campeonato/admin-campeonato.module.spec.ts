import { AdminCampeonatoModule } from './admin-campeonato.module';

describe('AdminCampeonatoModule', () => {
  let adminCampeonatoModule: AdminCampeonatoModule;

  beforeEach(() => {
    adminCampeonatoModule = new AdminCampeonatoModule();
  });

  it('should create an instance', () => {
    expect(adminCampeonatoModule).toBeTruthy();
  });
});
