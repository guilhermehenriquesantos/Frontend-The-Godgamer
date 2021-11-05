import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fase } from 'src/app/classes/fase';
import { Missao } from 'src/app/classes/missao';
import { ActivatedRoute, Router } from '@angular/router';
import { MissoesServiceService } from 'src/app/services/missoes-service.service';
import { FasesService } from 'src/app/services/fases.service';

@Component({
	selector: 'app-fases',
	templateUrl: './fases.component.html',
	styleUrls: ['./fases.component.scss']
})
export class FasesComponent implements OnInit {

	missoes: Missao[] = [];
	disponivel: Missao[] = [];
	tarefasFase: Missao[] = [];
	quantidadeFases: Fase[] = [];

	constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute,
		private router: Router, private missaoService: MissoesServiceService, private faseService: FasesService) { }

	ngOnInit(): void {
		this.buscaMissoes();
		this.faseService.findAll().subscribe(data => {
			this.quantidadeFases = data;
		})
	}

	drop(event: CdkDragDrop<Missao[]>, tipoArray: string) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);

			var missao: Missao = event.container.data[event.currentIndex];
			missao.status = tipoArray
			this.buscaAtualizaMissao(missao);
		}
	}

	buscaMissoes() {
		this.missaoService.findAll().subscribe(data => {
			this.missoes = data;
			if (this.missoes.length > 0) {
				for (let i = 0; i < this.missoes.length; i++) {
					if (this.missoes[i].status == 'disponivel') {
						this.disponivel.push(this.missoes[i]);
					} else
						if (this.missoes[i].status == 'todo' || this.missoes[i].status == 'doing')
							this.tarefasFase.push(this.missoes[i]);
				}
			}
		});
	}

	buscaAtualizaMissao(missao: Missao) {
		this.missaoService.findAll().subscribe(data => {
			this.missoes = data

			for (let i = 0; i < this.missoes.length; i++) {
				if (this.missoes[i].descricao == missao.descricao) {
					var id = this.missoes[i].id;
					missao.id = id
					this.missaoService.update(missao).subscribe(result => this.gotoFases);
				}
			}
		})
	}

	buscaDeletaMissao(missao: Missao) {
		this.missaoService.findAll().subscribe(data => {
			this.missoes = data

			for (let i = 0; i < this.missoes.length; i++) {
				if (this.missoes[i].descricao == missao.descricao) {
					var id = this.missoes[i].id;
					missao.id = id
					this.missaoService.delete(missao.id).subscribe(result => this.gotoFases);
				}
			}
		})
	}

	putInDisponivel(descricao: string) {
		let quantidadeMissoes = this.missoes.length
		let idMissao: number = 0;
		if (quantidadeMissoes > 0)
			for (let i = 0; i < this.missoes.length; i++) {
				idMissao = this.missoes[i].id
				if (this.missoes[i].id > idMissao)
					idMissao = this.missoes[i].id
			}

		if (descricao != '') {
			var novaMissao: Missao;
			novaMissao = {
				descricao: descricao,
				estimativa: 0,
				faseId: 0,
				id: idMissao,
				status: 'disponivel'
			};
			this.disponivel.push(novaMissao)
			this.missaoService.save(novaMissao).subscribe(result => this.gotoFases);
			this._snackBar.open("Missão '" + descricao + "' cadastrada com sucesso!", "Fechar");
		}
	}

	gotoFases() {
		this.router.navigate(['/fases']);
	}

	deletarTarefaDisponivel(tarefa: Missao) {
		for (let i = 0; i < this.disponivel.length; i++) {
			if (this.disponivel[i].descricao == tarefa.descricao) {
				this.buscaDeletaMissao(this.disponivel[i])
				this.disponivel.splice(i, 1)
			}
		}
	}

	deletarTarefaFase(tarefa: Missao) {
		for (let i = 0; i < this.tarefasFase.length; i++) {
			if (this.tarefasFase[i].descricao == tarefa.descricao) {
				this.buscaDeletaMissao(this.tarefasFase[i])
				this.tarefasFase.splice(i, 1)
			}
		}
	}

	cadastrarFase() {
		let novaFase: Fase;
		let quantidade = this.quantidadeFases.length
		let descricao
		if (quantidade == 0) {
			descricao = '1'
		} else
			descricao = String(quantidade)

		novaFase = {
			dataInicio: '2021-11-05T17:34:15.138Z',
			datafim: '2021-11-05T17:34:15.138Z',
			descricao: descricao,
			id: 0
		}

		this.quantidadeFases.push(novaFase)
		this.faseService.save(novaFase).subscribe(result => this.gotoFases);
		this._snackBar.open("Fase " + descricao + " cadastrada!", "Fechar");
	}

}
