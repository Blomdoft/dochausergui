import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchAggregation, SearchMode} from "../../model/searchrequest.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm : string ="";
  timerHandle : any;

  constructor(private searchService: SearchService) {
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
    this.searchService.searchDocuments(this.searchTerm, "", "", SearchAggregation.OR, SearchMode.FUZZY);
  }

}
