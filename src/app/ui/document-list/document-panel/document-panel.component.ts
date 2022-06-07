import {Component, Input, OnInit} from '@angular/core';
import {PDFDocument, Tag} from "../../../model/document.model";
import {Location} from "@angular/common";
import {copyArrayItem, moveItemInArray} from "@angular/cdk/drag-drop";
import {TagsService} from "../../../services/tags.service";
import {DocumentService} from "../../../services/document.service";

@Component({
  selector: 'app-document-panel',
  templateUrl: './document-panel.component.html',
  styleUrls: ['./document-panel.component.css']
})
export class DocumentPanelComponent implements OnInit {

  @Input() document: PDFDocument;
  currentPreviewPage: number = 0;
  markedTag! : string;

  constructor(private location: Location, private documentService : DocumentService) {
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
    this.currentPreviewPage = (this.currentPreviewPage+1) % this.getNumberOfPages();
  }

  getCurrentPreviewPage() : number {
    return this.currentPreviewPage;
  }

  getPreviewPageURL() : string {
    return location.origin+"/"+this.document.thumbnails[this.currentPreviewPage].imgdirectory+this.document.thumbnails[this.currentPreviewPage].imgname;
  }

  getFullDocumentURL() : string {
    return location.origin+"/"+this.document.directory + this.document.name;
  }

  getDisplayDate() : string {
    let year: string = this.document.timestamp.substring(0, 4);
    let month: string = this.document.timestamp.substring(4, 6);
    let day: string = this.document.timestamp.substring(6, 8);
    let hour: string = this.document.timestamp.substring(9, 11);
    let minute: string = this.document.timestamp.substring(11, 13);
    return day + "-"+month+"-"+year + " " +hour+":"+minute;
 }

  getTags() : Tag[] {
    return this.document.tags;
  }

  drop(event: any) {
    // Copy the data to my-variable
    const prev_idx = event.previousIndex;
    // this.my-variable = event.previousContainer.data[prev_idx];
    console.log("Dropping " + event.item.element.nativeElement.innerText);
    const newTag = {
      tagname : event.item.element.nativeElement.innerText
    }
    this.documentService.addTag(this.document, newTag);

    const tagAlreadyPresent : boolean = this.document.tags.some(arrTag => {
      return newTag.tagname === arrTag.tagname;
    });
    if (!tagAlreadyPresent) {
      this.document.tags.push(newTag);
    }
  }

  tagClicked(tagname: string) {
    if (this.markedTag == tagname) {
      this.markedTag = "";
    } else {
      this.markedTag = tagname;
    }
  }

  tagMarkedForDeletion(tagname: string) : boolean {
    return (this.markedTag === tagname);
  }

  removeTag(tagname: string)  {
    this.documentService.removeTag(this.document, {tagname: tagname});

    const index = this.document.tags.map(e => e.tagname).indexOf(tagname);
    if (index > -1) {
      this.document.tags.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

}

