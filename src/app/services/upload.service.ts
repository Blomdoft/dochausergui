import {Injectable} from "@angular/core";
import { Location } from '@angular/common';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UploadService {

  constructor(private location: Location, private http: HttpClient) {
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const url = location.origin + "/dochausersrv/import";

    formData.append('file', file);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true, // for tracking the progress of the upload
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
