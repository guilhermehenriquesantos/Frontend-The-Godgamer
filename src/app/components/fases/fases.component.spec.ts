import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MissoesServiceService } from '../../services/missoes-service.service'
import { of } from 'rxjs';

import { FasesComponent } from './fases.component';
import { FasesService } from 'src/app/services/fases.service';
import { Missao } from 'src/app/classes/missao';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('FasesComponent', () => {
  let component: FasesComponent;
  let fixture: ComponentFixture<FasesComponent>;
  let missoesService: MissoesServiceService;
  let fasesService: FasesService;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FasesComponent],
      imports: [
        MatSnackBarModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    missoesService = new MissoesServiceService(httpClient)
    fasesService = new FasesService(httpClient)
    fixture = TestBed.createComponent(FasesComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente Fase criado', () => {
    expect(component).toBeTruthy();
  });

  // it('Testando drop', () => {
  //   const event = { target: { value: 'todo' } } as any;
  //   component.drop(event, 'todo');
  // });

  it('buscaMissoes', () => {
    const response: Missao[] = []

    spyOn(missoesService, 'findAll').and.returnValue(of(response));

    component.buscaMissoes();

    expect(component.missoes).toEqual(response);
  });

  it('buscaAtualizaMissao', () => {
    const response: Missao[] = []
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }

    spyOn(missoesService, 'findMission').and.returnValue(of(missao));

    component.buscaAtualizaMissao(missao);

    expect(component.missoes).toEqual(response);
  });

  it('buscaDeletaMissao', () => {
    const response: Missao[] = []
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }

    spyOn(missoesService, 'delete').and.returnValue(of(missao));

    component.buscaDeletaMissao(missao);

    expect(component.missoes).toEqual(response);
  });

  it('putInDisponivel', () => {
    component.putInDisponivel('teste');
  });

  it('gotoFases', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.gotoFases();
    expect(navigateSpy).toHaveBeenCalledWith(['/fases']);
  });

  it('deletarTarefaDisponivel', () => {
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }
    component.deletarTarefaDisponivel(missao);
  });

  it('deletarTarefaFase', () => {
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }
    component.deletarTarefaFase(missao);
  });

  it('cadastrarFase', () => {
    component.cadastrarFase();
  });
});
