import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Missao } from 'src/app/classes/missao';
import { FasesService } from 'src/app/services/fases.service';
import { MissoesServiceService } from 'src/app/services/missoes-service.service';
import { MissoesComponent } from './missoes.component';


describe('MissoesComponent', () => {
  let component: MissoesComponent;
  let fixture: ComponentFixture<MissoesComponent>;
  let missoesService: MissoesServiceService;
  let fasesService: FasesService;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissoesComponent ],
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        MissoesServiceService,
        FasesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissoesComponent);
    component = fixture.componentInstance;
    missoesService = TestBed.get(MissoesServiceService)
    fasesService = TestBed.get(FasesService)
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('Componente Missoes criado', () => {
    expect(component).toBeTruthy();
  });

  it('buscaMissoes', fakeAsync(() => {
    const response: Missao[] = [{
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }]
    let spy = spyOn(missoesService, 'findAll').and.returnValue(of(response));
    let secondSpy = spyOn(missoesService.findAll(), 'subscribe');

    component.buscaMissoes();
    tick()
    expect(spy).toHaveBeenCalledBefore(secondSpy);
    expect(secondSpy).toHaveBeenCalled();
  }));

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

  it('putInToDo', () => {
    component.putInToDo('teste');
  });

  it('gotoMissoes', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.gotoMissoes();
    expect(navigateSpy).toHaveBeenCalledWith(['/missoes']);
  });

  it('deletarTarefaAFazer', () => {
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }
    component.deletarTarefaAFazer(missao);
  });

  it('deletarTarefaFazendo', () => {
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }
    component.deletarTarefaFazendo(missao);
  });

  it('deletarTarefaFeita', () => {
    let missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }
    component.deletarTarefaFeita(missao);
  });
});
