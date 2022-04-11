import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentPanelComponent } from './document-list/document-panel/document-panel.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import { DefineTagDialogComponent } from './tags/define-tag-dialog/define-tag-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatChipsModule} from "@angular/material/chips";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DocumentListComponent,
    DocumentPanelComponent,
    DefineTagDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    MatInputModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MatMenuModule,
    MatDialogModule,
    MatChipsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
