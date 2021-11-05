import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Missao } from 'src/app/classes/missao';
import { MissoesServiceService } from 'src/app/services/missoes-service.service';

@Component({
	selector: 'app-missoes',
	templateUrl: './missoes.component.html',
	styleUrls: ['./missoes.component.scss']
})
export class MissoesComponent implements OnInit {

	missoes: Missao[] = [];

	todo: Missao[] = [];
	doing: Missao[] = [];
	done: Missao[] = [];

	constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute,
		private router: Router, private missaoService: MissoesServiceService) {

	}

	ngOnInit(): void {
		this.buscaMissoes();
	}

	drop(event: CdkDragDrop<Missao[]>, tipoArray: string) {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

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
					if (this.missoes[i].status == 'todo') {
						this.todo.push(this.missoes[i]);
					} else
						if (this.missoes[i].status == 'doing') {
							this.doing.push(this.missoes[i]);
						} else
							if (this.missoes[i].status == 'done') {
								this.done.push(this.missoes[i]);
							}
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
					this.missaoService.update(missao).subscribe(result => this.gotoMissoes);
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
					this.missaoService.delete(missao.id).subscribe(result => this.gotoMissoes);
				}
			}
		})
	}

	putInToDo(descricao: string) {
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
				status: 'todo'
			};
			this.todo.push(novaMissao)
			this.missaoService.save(novaMissao).subscribe(result => this.gotoMissoes);
			this._snackBar.open("Missão '" + descricao + "' cadastrada com sucesso!", "Fechar");
		}
	}

	gotoMissoes() {
		this.router.navigate(['/missoes']);
	}

	deletarTarefaAFazer(tarefa: Missao) {
		for (let i = 0; i < this.todo.length; i++) {
			if (this.todo[i].descricao == tarefa.descricao) {
				this.buscaDeletaMissao(this.todo[i])
				this.todo.splice(i, 1)
			}
		}
	}

	deletarTarefaFazendo(tarefa: Missao) {
		for (let i = 0; i < this.doing.length; i++) {
			if (this.doing[i] == tarefa) {
				this.doing.splice(i, 1)
				this.missaoService.delete(tarefa.id).subscribe(result => this.gotoMissoes);
			}
		}
	}

	deletarTarefaFeita(tarefa: Missao) {
		for (let i = 0; i < this.done.length; i++) {
			if (this.done[i] == tarefa) {
				this.done.splice(i, 1)
				this.missaoService.delete(tarefa.id).subscribe(result => this.gotoMissoes);
			}
		}
	}

}


