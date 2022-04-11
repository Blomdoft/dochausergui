import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Tag} from "../model/document.model";

@Injectable({providedIn: 'root'})
export class TagsService {

  private _tagsResult: BehaviorSubject<Tag[]> = new BehaviorSubject(<Tag[]>[]);
  public readonly tagResult: Observable<Tag[]> = this._tagsResult.asObservable();

  constructor(private location: Location, private http: HttpClient) {
    this.getTagsFromServer()
  }

  getTagResult() {
    return this.tagResult;
  }

  getLastTagResult() : Tag[] {
    return this._tagsResult.getValue();
  }

  getTagsFromServer() {
    const url = location.origin + "/dochausersrv/tag";
    this.http.get<Tag[]>(url).subscribe(responseData => {
      this._tagsResult.next(responseData);
    });
  }

  addTag(tag: Tag) {
    const url = location.origin + "/dochausersrv/tag/" + tag.tagname;
    this.http.put(url, "").subscribe();
  }

  removeTag(tag: Tag) {
    const url = location.origin + "/dochausersrv/tag/" + tag.tagname;
    this.http.delete(url).subscribe();
  }

  setTags(tags: Tag[]) {
    const url = location.origin + "/dochausersrv/tag";
    this.http.put(url, tags).subscribe();
    this._tagsResult.next(tags);
  }

}
