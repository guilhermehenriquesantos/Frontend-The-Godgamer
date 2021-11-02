import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fases',
  templateUrl: './fases.component.html',
  styleUrls: ['./fases.component.scss']
})
export class FasesComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  quantidadeFases = [
    1,
    2,
    3,
    4
  ]

  tarefasFase = [
    'Design de interfaces',
    'Sequenciar DNA',
    'Criar suffixo array',
    'Utilizar RMQ para consulta',
    'Auditoria do software',
    'Pentest',
    'Arquitetura do sistema',
    'Prototipação em papel',
    'Análise de preferência do usuário',
    'Conversar com gestor',
    'Reunião diária',
    'Gincana de equipe'
  ];

  disponivel = [
    'Criar nova fase',
    'Exemplo de tarefa a fazer',
    'Testar softwares',
    'Conversar com equipe',
    'Implementar diagramas de sequencia',
    'Reunião planejamento',
    'Reunião de review'
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

  putInDisponivel(descricao: string) {
    if (descricao != ''){
      this.disponivel.push(descricao);
      this._snackBar.open("Missão '" + descricao + "' cadastrada com sucesso!", "Fechar");
    }
  }

  deletarTarefaDisponivel(tarefa: string) {
    for (let i = 0; i < this.disponivel.length; i++) {
      if (this.disponivel[i] == tarefa) {
        this.disponivel.splice(i, 1)
      }
    }
  }

  deletarTarefaFase(tarefa: string) {
    for (let i = 0; i < this.tarefasFase.length; i++) {
      if (this.tarefasFase[i] == tarefa) {
        this.tarefasFase.splice(i, 1)
      }
    }
  }

  cadastrarFase(){
    let quantidade = this.quantidadeFases.length
    this.quantidadeFases.push(quantidade + 1)
  }

  openSnackBar() {
    let quantidade = this.quantidadeFases.length
    this._snackBar.open("Fase " + quantidade + " cadastrada!", "Fechar");
  }
}
