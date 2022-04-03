import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchAggregation, SearchMode} from "../../model/searchrequest.model";
import { MatDialog } from '@angular/material/dialog';
import {DefineTagDialogComponent} from "../tags/define-tag-dialog/define-tag-dialog.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm : string ="";
  timerHandle : any;

  constructor(public dialog: MatDialog, private searchService: SearchService) {
    // , public dialog: MatDialog
  }

  ngOnInit(): void {
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
    this.searchService.searchDocuments(this.searchTerm, 0, "", "", SearchAggregation.OR, SearchMode.FUZZY);
  }

  public openDefineTagsDialog() {
    this.dialog.open(DefineTagDialogComponent, {
      width: '90%'
         })
  }

}
