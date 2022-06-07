import {Injectable} from "@angular/core";
import {DocumentService} from "./document.service";
import {HttpClient} from "@angular/common/http";
import { Location, LocationStrategy } from '@angular/common';
import {SearchAggregation, SearchMode, SearchRequest} from "../model/searchrequest.model";
import {PDFDocument, SearchDocResult, Tag} from "../model/document.model";


@Injectable({providedIn: 'root'})
export class SearchService {

  lastSearchQuery : string ="";
  lastSearch! : SearchRequest;

  constructor(private location: Location, private documentService : DocumentService, private http: HttpClient) {
  }

  searchDocuments(searchQuery : string, tags : Tag[], skip : number, from : string, to : string, aggregation : string, mode : string) {
    const url = location.origin + "/dochausersrv/search";
    const req : SearchRequest = {
      aggregation: SearchAggregation[aggregation as keyof typeof SearchAggregation],
      mode: SearchMode[mode as keyof typeof SearchMode],
      skip : skip,
      from : from,
      to : to,
      queryTerms : searchQuery.split(" "),
      queryTags : tags
    };
    this.lastSearch = req;

    this.http.post<SearchDocResult>(url, req).subscribe(responseData => {
      console.log(responseData)
      this.documentService.setNewSearchResults(responseData, false);

      if (searchQuery !== this.lastSearchQuery) {
        this.lastSearchQuery = searchQuery;
      }
    });
  }

  pageSearchDocuments(skip: number) {
    const url = location.origin + "/dochausersrv/search";
    this.lastSearch.skip = skip;
    this.http.post<SearchDocResult>(url, this.lastSearch).subscribe(responseData => {
      console.log(responseData)
      this.documentService.setNewSearchResults(responseData, true);
    });
  }

}
