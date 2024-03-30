import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosAdminComponent } from './alunos-admin.component';

describe('AlunosAdminComponent', () => {
  let component: AlunosAdminComponent;
  let fixture: ComponentFixture<AlunosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlunosAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
