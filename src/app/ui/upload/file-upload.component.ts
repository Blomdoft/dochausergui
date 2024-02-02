import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";
import {UploadService} from "../../services/upload.service";
import {HttpEventType} from "@angular/common/http";

enum ProgressIndicator {
  NOT_UPLOADED = "Waiting",
  IN_PROGRESS = "Uploading",
  FINISHED = "Done",
  ERROR = "Error"
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {


  selectedFiles: File[] = [];
  displayedColumns: string[] = ['Filename', 'Size', 'Status', 'Remove'];
  dataSource = [...this.selectedFiles];
  isUploading: boolean = false;

  progressFiles = new Map<File, string>();

  @ViewChild(MatTable) table: MatTable<File> | undefined;

  constructor(
    public dialogRef: MatDialogRef<FileUploadComponent>, private uploadService: UploadService ,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any)
  {
  }

  onFileSelected(event: any) {
    for (let file of event.target.files) {
      this.selectedFiles.push(file);
    }
    this.dataSource = [...this.selectedFiles];
    // @ts-ignore
    this.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close'});
  }

  getStatus(file : File) : string {
      let progress = this.progressFiles.get(file);
      if (progress === undefined) {
        return ProgressIndicator.NOT_UPLOADED;
      } else {
        return progress;
      }
  }

  removeFile(file : File) {
    let index = this.selectedFiles.findIndex(fileInList => fileInList === file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
    this.progressFiles.delete(file);
    this.dataSource = [...this.selectedFiles];
    this.table?.renderRows();
  }

  onUpload() {
    if (!this.isUploading) {
      this.isUploading = true;

      // add files to our uploading mechanism
      for (let file of this.selectedFiles) {
        if (!this.progressFiles.has(file)) {
          this.progressFiles.set(file, ProgressIndicator.NOT_UPLOADED);
        }
      }

      for (let key of this.progressFiles.keys()) {
        if (this.progressFiles.get(key) === ProgressIndicator.NOT_UPLOADED) {
          this.uploadService.uploadFile(key).subscribe({
            next: (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                // @ts-ignore
                const percentDone = Math.round(100 * event.loaded / event.total);
                // This is an upload progress event. Compute and show the % done:
                this.progressFiles.set(key, ProgressIndicator.IN_PROGRESS);
                this.table?.renderRows();
              } else if (event.type === HttpEventType.Response) {
                this.progressFiles.set(key, ProgressIndicator.FINISHED);
                this.table?.renderRows();
              }
            },
            error: (error) => {
              // Handle the error here
              console.error('Error uploading file:', error);
              this.progressFiles.set(key, ProgressIndicator.ERROR);
              this.table?.renderRows();
            },
            complete: () => {
            }
          });
        }
      }
      // wont work as this is asynchronous
      this.isUploading = false;
    }
  }

  isCurrentlyUploading() : boolean {
    // wont work as this is asynchronous
    return this.isUploading;
  }
}
