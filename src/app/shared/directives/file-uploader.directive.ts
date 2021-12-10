import { Directive, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {FileUploaderService, FileUploadOptions} from '../services/file-uploader.service';

@UntilDestroy()
@Directive({
  selector: '[fileUploader]',
})
export class FileUploaderDirective implements OnDestroy {
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onUpload: EventEmitter<FormData | FileList> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<any> = new EventEmitter();

  @Input()
  private fileUploadOptions: FileUploadOptions = {};

  constructor(private fileUploader: FileUploaderService) {}

  ngOnDestroy() {}

  @HostListener('click')
  onClick() {
    this.fileUploader
      .doUploadDocument(this.fileUploadOptions)
      .pipe(untilDestroyed(this))
      .subscribe(
        result => this.onUpload.next(result),
        error => this.onError.next(error)
      );
  }
}
