import {Injectable} from "@angular/core";
import {PDFDocument} from "../model/document.model";
import searchResult from './dummysearch.json';

@Injectable({providedIn: 'root'})
export class DocumentService {
  private searchResult: PDFDocument[] = [];
  private archiveRoot : string = "";

  constructor() {
    let jsonSearchResults: any = searchResult;
    this.searchResult = <PDFDocument[]> jsonSearchResults;
  }

  setNewSearchResults(searchResult : PDFDocument[]) {
    this.searchResult = searchResult
  }

  getSearchResults() {
    return this.searchResult;
  }

}
