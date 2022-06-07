import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PDFDocument} from "../../model/document.model";
import {DocumentService} from "../../services/document.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: PDFDocument[] = [];
  hitCount = 0;
  columns: number = 2;

  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;
  @ViewChild('box', {static: true}) box!: ElementRef;

  constructor(private documentService: DocumentService, private searchService: SearchService) {
  }

  setColumns() {
    this.columns = Math.floor(this.box.nativeElement.clientWidth / 270);
  }

  ngOnInit(): void {
    this.documentService.getSearchResults().subscribe(searchResult => {
      this.documents = searchResult;
    });

    this.documentService.getTotalHits().subscribe(hitCount => {
      this.hitCount = hitCount;
    });

    this.documentService.newSearchParams.subscribe(newPage => {
      if (newPage) {
        this.paginator.firstPage();
      }
    });

    console.log(this.documents);
    this.setColumns();
  }

  handlePage($event: PageEvent) {
    if ($event.previousPageIndex != $event.pageIndex) {
      this.searchService.pageSearchDocuments($event.pageIndex*100);
    }
  }

}
