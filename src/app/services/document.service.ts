import {Injectable} from "@angular/core";
import {PDFDocument, SearchDocResult} from "../model/document.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class DocumentService {

  private _searchResult: BehaviorSubject<PDFDocument[]> = new BehaviorSubject(<PDFDocument[]>[]);
  public readonly searchResult: Observable<PDFDocument[]> = this._searchResult.asObservable();

  private _totalHits: BehaviorSubject<number> = new BehaviorSubject(<number>0);
  public readonly totalHits: Observable<number> = this._totalHits.asObservable();

  currentHitSkip : number = 0;

  constructor() {
  }

  setNewSearchResults(searchResult : SearchDocResult, paging: boolean) {
    this._searchResult.next(searchResult.documents);
    this._totalHits.next(searchResult.hitCount);
    if (paging) this.resetHitSkip();
  }

  getSearchResults() {
    return this.searchResult;
  }

  getTotalHits() {
    return this.totalHits;
  }

  resetHitSkip() {
    this.currentHitSkip = 0;
  }

  setHitSkip(skip : number) {
    this.currentHitSkip = skip;
  }

}
