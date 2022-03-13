import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';


describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente Usuarios criado', () => {
    expect(component).toBeTruthy();
  });

  it('Testando applyFilter', () => {
    const event = { target: { value: 'hello' } } as any;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('hello');
  });
});
