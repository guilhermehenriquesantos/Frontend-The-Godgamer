import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FasesComponent } from './components/fases/fases.component';
import { MissoesComponent } from './components/missoes/missoes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'missoes', component: MissoesComponent },
  { path: 'fases', component: FasesComponent },
  { path: 'usuario', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
