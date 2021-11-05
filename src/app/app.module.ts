import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FasesComponent } from './components/fases/fases.component';
import { MenuComponent } from './components/menu/menu.component';
import { MissoesComponent } from './components/missoes/missoes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MissoesServiceService } from './services/missoes-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FasesService } from './services/fases.service';

@NgModule({
  declarations: [
    AppComponent,
    FasesComponent,
    MissoesComponent,
    UsuariosComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [
    MissoesServiceService,
    FasesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
