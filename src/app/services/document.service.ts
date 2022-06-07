import {Injectable} from "@angular/core";
import {PDFDocument, SearchDocResult, Tag} from "../model/document.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DocumentService {

  private _searchResult: BehaviorSubject<PDFDocument[]> = new BehaviorSubject(<PDFDocument[]>[]);
  public readonly searchResult: Observable<PDFDocument[]> = this._searchResult.asObservable();

  private _totalHits: BehaviorSubject<number> = new BehaviorSubject(<number>0);
  public readonly totalHits: Observable<number> = this._totalHits.asObservable();

  private _newSearchParams: BehaviorSubject<boolean> = new BehaviorSubject(<boolean>false);
  public readonly newSearchParams: Observable<boolean> = this._newSearchParams.asObservable();

  currentHitSkip : number = 0;

  constructor(private http: HttpClient) {
  }

  setNewSearchResults(searchResult : SearchDocResult, paging: boolean) {
    this._searchResult.next(searchResult.documents);
    this._totalHits.next(searchResult.hitCount);
    this._newSearchParams.next(!paging);
    if (!paging) this.resetHitSkip();
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

  addTag(document : PDFDocument, tag : Tag ) {
    const tagAlreadyPresent : boolean = document.tags.some(arrTag => {
      return tag.tagname === arrTag.tagname;
    });
    if (!tagAlreadyPresent) {
      const url = location.origin + "/dochausersrv/document/" + document.id + "/" + tag.tagname;
      this.http.put(url, "").subscribe();
    }
  }

  removeTag(document : PDFDocument, tag : Tag ) {
    const tagIsPresent : boolean = document.tags.some(arrTag => {
      return tag.tagname === arrTag.tagname;
    });
    if (tagIsPresent) {
      const url = location.origin + "/dochausersrv/document/" + document.id + "/" + tag.tagname;
      this.http.delete(url).subscribe();
    }
  }

}
