import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PDFDocument} from "../../model/document.model";
import {DocumentService} from "../../services/document.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: PDFDocument[] = [];

  columns: number = 2;

  // @ts-ignore
  @ViewChild('box', {static: true}) box: ElementRef;

  constructor(private documentService: DocumentService) {
  }

  setColumns() {
    this.columns = Math.floor(this.box.nativeElement.clientWidth / 300);
  }

  ngOnInit(): void {
    this.documents = this.documentService.getSearchResults();
    console.log(this.documents);
    this.setColumns();

  }

}
