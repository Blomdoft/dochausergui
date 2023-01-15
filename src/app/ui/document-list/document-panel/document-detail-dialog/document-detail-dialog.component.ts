import {Component, Inject, OnInit, Optional} from '@angular/core';
import {TagsService} from "../../../../services/tags.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PDFDocument} from "../../../../model/document.model";
import {DocumentService} from "../../../../services/document.service";
import {SearchService} from "../../../../services/search.service";

@Component({
  selector: 'app-document-detail-dialog',
  templateUrl: './document-detail-dialog.component.html',
  styleUrls: ['./document-detail-dialog.component.css']
})
export class DocumentDetailDialogComponent implements OnInit {

  fromDialog!: string;
  document! : PDFDocument;

  constructor(
    private documentService: DocumentService,
    public dialogRef: MatDialogRef<DocumentDetailDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any)
  {
    this.document = mydata.dataKey;
  }

  ngOnInit(): void {
  }

  deleteDocument() {
    if(confirm("You really want to delete "+ this.document.name)) {
      this.documentService.deleteDocument(this.document);
      this.closeDialogSave();
    }
  }
  closeDialogSave() {
    this.dialogRef.close({event: 'close', data: this.fromDialog});
  }

  getFullDocumentURL() : string {
    return location.origin+"/"+this.document.directory + this.document.name;
  }

  getPreviewPageURL() : string {
    return location.origin+"/"+this.document.thumbnails[0].imgdirectory+this.document.thumbnails[0].imgname;
  }

  getDisplayDate() : string {
    let year: string = this.document.timestamp.substring(0, 4);
    let month: string = this.document.timestamp.substring(4, 6);
    let day: string = this.document.timestamp.substring(6, 8);
    let hour: string = this.document.timestamp.substring(9, 11);
    let minute: string = this.document.timestamp.substring(11, 13);
    return day + "-"+month+"-"+year + " " +hour+":"+minute;
  }

  getDocumentName() : string {
    return this.document.name;
  }
}
