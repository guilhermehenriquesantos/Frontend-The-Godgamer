import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Missao } from '../classes/missao';

import { MissoesServiceService } from './missoes-service.service';

describe('MissoesServiceService', () => {
  let service: MissoesServiceService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        MissoesServiceService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MissoesServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Servico instanciado', () => {
    expect(service).toBeTruthy();
  });

  it('Adicionando uma missao e retornando ela', () => {
    const missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }

    service.save(missao).subscribe(
      data => expect(data).toEqual(missao, 'deve retornar uma missao'),
      fail
    );

    const req = httpTestingController.expectOne(service.missaoUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(missao);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Criado', body: missao });
    req.event(expectedResponse);
  })

  it('Atualizando uma missao e retornando ela', () => {
    const missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }

    service.update(missao).subscribe(
      data => expect(data).toEqual(missao, 'deve retornar uma missao'),
      fail
    );

    const req = httpTestingController.expectOne(service.missaoUrl);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(missao);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Criado', body: missao });
    req.event(expectedResponse);
  })

  it('Retornar uma missao', () => {
    const missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }

    service.findMission(missao.id).subscribe(
      fs => expect(fs).toEqual(missao, 'deve retornar a missao'),
      fail
    );

    const req = httpTestingController.expectOne(service.missoesUrl + '/0');
    expect(req.request.method).toEqual('GET');

    req.flush(missao);
  });

  it('deletar uma missao', () => {
    const missao: Missao = {
      descricao: '',
      estimativa: 0,
      faseId: 0,
      id: 0,
      status: ''
    }

    service.delete(0).subscribe((data: any) => {
      expect(data).toBe(0);
    });

    const req = httpTestingController.expectOne(service.missaoUrl + '/0');
    expect(req.request.method).toBe('DELETE');

    req.flush(0);
  });
});
