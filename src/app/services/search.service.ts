import {Injectable} from "@angular/core";
import {DocumentService} from "./document.service";
import {HttpClient} from "@angular/common/http";
import { Location, LocationStrategy } from '@angular/common';
import {SearchAggregation, SearchMode, SearchRequest} from "../model/searchrequest.model";
import {PDFDocument} from "../model/document.model";


@Injectable({providedIn: 'root'})
export class SearchService {


  constructor(private location: Location, private documentService : DocumentService, private http: HttpClient) {
  }

  searchDocuments(searchQuery : string, from : string, to : string, aggregation : string, mode : string) {
    const url = location.origin + "/dochausersrv/search";


    const req : SearchRequest = {
      aggregation: SearchAggregation[aggregation as keyof typeof SearchAggregation],
      mode: SearchMode[mode as keyof typeof SearchMode],
      from : from,
      to : to,
      queryTerms : searchQuery.split(" ")
    };

    console.log(req);
    this.http.post<PDFDocument[]>(url, req).subscribe(responseData => {
      console.log(responseData)
      this.documentService.setNewSearchResults(responseData);
    });


    console.log(url);

  }

}
