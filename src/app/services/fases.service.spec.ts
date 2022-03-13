import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Fase } from '../classes/fase';

import { FasesService } from './fases.service';

describe('FasesService', () => {
  let service: FasesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        FasesService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FasesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Servico instanciado', () => {
    expect(service).toBeTruthy();
  });

  it('Adicionando uma fase e retornando ela', () => {
    const fase: Fase = {
      dataInicio: '2021-11-05T17:34:15.138Z',
      datafim: '2021-11-05T17:34:15.138Z',
      descricao: 'Teste',
      id: 1
    }

    service.save(fase).subscribe(
      data => expect(data).toEqual(fase, 'deve retornar uma fase'),
      fail
    );

    const req = httpTestingController.expectOne(service.faseUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(fase);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Criado', body: fase });
    req.event(expectedResponse);
  })

  it('Atualizando uma fase e retornando ela', () => {
    const fase: Fase = {
      dataInicio: '2021-11-05T17:34:15.138Z',
      datafim: '2021-11-05T17:34:15.138Z',
      descricao: 'Teste',
      id: 2
    }

    service.update(fase).subscribe(
      data => expect(data).toEqual(fase, 'deve retornar uma fase'),
      fail
    );

    const req = httpTestingController.expectOne(service.faseUrl);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(fase);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Criado', body: fase });
    req.event(expectedResponse);
  })

  it('Retornar uma fase', () => {
    const fase: Fase = {
      dataInicio: '2021-11-05T17:34:15.138Z',
      datafim: '2021-11-05T17:34:15.138Z',
      descricao: 'Teste',
      id: 3
    }

    service.findPhase(fase.id).subscribe(
      fs => expect(fs).toEqual(fase, 'deve retornar a fase'),
      fail
    );

    const req = httpTestingController.expectOne(service.fasesUrl + '/3');
    expect(req.request.method).toEqual('GET');

    req.flush(fase);
  });

  it('deletar uma fase', () => {
    const fase: Fase = {
      dataInicio: '2021-11-05T17:34:15.138Z',
      datafim: '2021-11-05T17:34:15.138Z',
      descricao: 'Teste',
      id: 3
    }

    service.delete(3).subscribe((data: any) => {
      expect(data).toBe(3);
    });

    const req = httpTestingController.expectOne(service.faseUrl + '/3');
    expect(req.request.method).toBe('DELETE');

    req.flush(3);
  });
});
