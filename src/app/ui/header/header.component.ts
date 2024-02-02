import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchAggregation, SearchMode} from "../../model/searchrequest.model";
import { MatDialog } from '@angular/material/dialog';
import {DefineTagDialogComponent} from "../tags/define-tag-dialog/define-tag-dialog.component";
import {TagsService} from "../../services/tags.service";
import {Tag} from "../../model/document.model";
import {MatChip} from "@angular/material/chips";
import {FileUploadComponent} from "../upload/file-upload.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  expandedHeader : boolean = false;
  searchTerm : string ="";
  timerHandle : any;
  tags! : Tag[];
  selectedTags : Tag[] = [];

  constructor(public dialog: MatDialog, private searchService: SearchService, private tagsService: TagsService) {
    // , public dialog: MatDialog
  }

  ngOnInit(): void {
    this.searchService.searchDocuments("", this.selectedTags, 0, "", "", SearchAggregation.OR, SearchMode.FUZZY);
    this.tagsService.tagResult.subscribe(tagResult => {
      this.tags = Array.from(tagResult);
      this.selectedTags = [];
    });
  }

  clearSearchTerm() {
    this.searchTerm = "";
    this.changeSearchTerm();
  }

  // Handling a slight timeout delay so that not every key stroke leads to a search
  changeSearchTerm() {
    // term was changed, reset entry timer
    clearTimeout(this.timerHandle);
    this.timerHandle = setTimeout(() => {
      this.executeSearch()} , 1000);
  }

  private executeSearch() {
    this.searchService.searchDocuments(this.searchTerm,  this.selectedTags, 0, "", "", SearchAggregation.OR, SearchMode.FUZZY);
  }

  public openDefineTagsDialog() {
    this.dialog.open(DefineTagDialogComponent, {
      width: '90%'
         })
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // handle the result, which includes selected files
    });
  }

  toggleExpandedHeader() {
    this.expandedHeader = !this.expandedHeader;
  }

  toggleTagSelection(c: MatChip) {
    c.toggleSelected();
    if (c.selected) {
      this.selectedTags.push({tagname: c.value});
    } else {
      const index = this.selectedTags.map(e => e.tagname).indexOf(c.value);
      if (index > -1) {
        this.selectedTags.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    this.changeSearchTerm();
  }

  isSelected(tagname: string) {
    return this.selectedTags.map(e => e.tagname).indexOf(tagname) != -1;
  }

}
