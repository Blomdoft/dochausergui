import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "../../../model/document.model";
import {TagsService} from "../../../services/tags.service";

@Component({
  selector: 'app-define-tag-dialog',
  templateUrl: './define-tag-dialog.component.html',
  styleUrls: ['./define-tag-dialog.component.css']
})
export class DefineTagDialogComponent implements OnInit {

  fromPage!: string;
  fromDialog!: string;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  tags : Tag[] = [];

  constructor(
    private tagsService: TagsService,
    public dialogRef: MatDialogRef<DefineTagDialogComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any)
  {
    tagsService.tagResult.subscribe(tagResult =>this.tags = Array.from(tagResult));
  }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
  }

  ngAfterViewInit() {
    this.tagsService.getTagsFromServer();
  }

  closeDialogCancel() {
    this.tags = this.tagsService.getLastTagResult();
    this.dialogRef.close({ event: 'close', data: this.fromDialog});
  }

  closeDialogSave() {
    this.tagsService.setTags(this.tags);
    this.dialogRef.close({ event: 'close', data: this.fromDialog});
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({tagname: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
