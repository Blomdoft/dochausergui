import {Component, Input, OnInit} from '@angular/core';
import {PDFDocument} from "../../../model/document.model";

@Component({
  selector: 'app-document-panel',
  templateUrl: './document-panel.component.html',
  styleUrls: ['./document-panel.component.css']
})
export class DocumentPanelComponent implements OnInit {

  @Input() document: PDFDocument;
  currentPreviewPage: number = 0;

  constructor() {
    // proper init of empty document makes this safer
    this.document = {
      id: "", name: "", directory: "", text: "", timestamp: "", origin: "",   thumbnails: [],
      tags: []};

  }

  ngOnInit(): void {
  }

  getNumberOfPages() : number {
    return this.document.thumbnails.length;
  }

  advancePreviewPage() : void {
    this.currentPreviewPage = this.currentPreviewPage+1 % this.getNumberOfPages();
  }

  getCurrentPreviewPage() : number {
    return this.currentPreviewPage;
  }

  getPreviewPageURL() : string {
    return this.document.thumbnails[this.currentPreviewPage].imdirectory+this.document.thumbnails[this.currentPreviewPage].imgname;
  }

  getFullDocumentURL() : string {
    return this.document.directory + this.document.name;
  }

}
