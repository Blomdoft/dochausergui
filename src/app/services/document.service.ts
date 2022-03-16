import {Injectable} from "@angular/core";
import {PDFDocument} from "../model/document.model";
import searchResult from './dummysearch.json';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class DocumentService {
  private archiveRoot : string = "";

  private _searchResult: BehaviorSubject<PDFDocument[]> = new BehaviorSubject(<PDFDocument[]>[]);
  public readonly searchResult: Observable<PDFDocument[]> = this._searchResult.asObservable();

  constructor() {
  }

  setNewSearchResults(searchResult : PDFDocument[]) {
    this._searchResult.next(searchResult);
  }

  getSearchResults() {
    return this.searchResult;
  }

}
