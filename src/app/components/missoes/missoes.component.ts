import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-missoes',
	templateUrl: './missoes.component.html',
	styleUrls: ['./missoes.component.scss']
})
export class MissoesComponent implements OnInit {

	constructor(private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
	}

	todo = [
		'Design de interfaces',
		'Sequenciar DNA',
		'Criar suffixo array',
		'Utilizar RMQ para consulta'
	];

	doing = [
		'Auditoria do software',
		'Pentest',
		'Arquitetura do sistema',
	];

	done = [
		'Prototipação em papel',
		'Análise de preferência do usuário',
		'Conversar com gestor',
		'Reunião diária',
		'Gincana de equipe'
	];

	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}

	putInToDo(descricao: string) {
		if (descricao != '') {
			this.todo.push(descricao);
			this._snackBar.open("Missão '" + descricao + "' cadastrada com sucesso!", "Fechar");
		}
	}

	deletarTarefaAFazer(tarefa: string) {
		for (let i = 0; i < this.todo.length; i++) {
			if (this.todo[i] == tarefa) {
				this.todo.splice(i, 1)
			}
		}
	}

	deletarTarefaFazendo(tarefa: string) {
		for (let i = 0; i < this.doing.length; i++) {
			if (this.doing[i] == tarefa) {
				this.doing.splice(i, 1)
			}
		}
	}

	deletarTarefaFeita(tarefa: string) {
		for (let i = 0; i < this.done.length; i++) {
			if (this.done[i] == tarefa) {
				this.done.splice(i, 1)
			}
		}
	}

}


