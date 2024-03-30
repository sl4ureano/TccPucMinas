import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargasAdminComponent } from './recargas-admin.component';

describe('RecargasAdminComponent', () => {
  let component: RecargasAdminComponent;
  let fixture: ComponentFixture<RecargasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecargasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecargasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
