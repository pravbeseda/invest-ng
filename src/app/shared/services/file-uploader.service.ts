import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export interface FileUploadOptions {
  url?: string;
  dtoName?: string;
  type?: string;
  params?: { [key: string]: any };
  fileMinSize?: number;
  fileMaxSize?: number;
  multiple?: boolean;
  /**
   * Файлы которые можно выбрать, например
   * '.jpg, .jpeg, .png'
   */
  accept?: string;
  /**
   * Получить FileList, вместо FormData
   */
  asFileList?: boolean;
}

@Injectable()
export class FileUploaderService {
  private renderer: Renderer2;
  private hiddenElement: HTMLInputElement | undefined;
  private options: FileUploadOptions | undefined | null;
  private result: Subject<FormData | FileList> | undefined;
  private listener: (() => void) | undefined;
  private minSize = 10;

  constructor(private rendererFactory: RendererFactory2, private http: HttpClient, private toastr: ToastrService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  doUploadDocument(options: FileUploadOptions = {} as FileUploadOptions): Observable<FormData | FileList> {
    this.options = options;
    this.dtoName = options.dtoName || 'file';
    this.result = new Subject<FormData | FileList>();
    this.createHiddenElement().then(() => this.hiddenElement?.click());
    return this.result.asObservable().pipe(
      first(),
      finalize(() => {
        this.removeHiddenElement();
        this.options = null;
      })
    );
  }

  private fileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const formData = this.createFormData(files);
    if (this.isValid(formData)) {
      if (this.options?.url) {
        this.createFileUploadRequest(formData).subscribe(
          document => this.result.next(document),
          e => this.result.error(e)
        );
        // если док валиден, но ссылки нет, то сохраняем этот документ в памяти
      } else {
        this.result.next(this.options?.asFileList ? files : formData);
      }
    } else {
      this.result.error('Invalid file');
    }
  }

  isValid(formData) {
    const errors = [];
    const file = formData.get(this.dtoName) as File;
    if (file.size < (this.options?.fileMinSize || this.minSize)) {
      errors.push(`Размер файла слишком мал`);
    }
    if (!!this.options?.fileMaxSize && file.size > this.options.fileMaxSize) {
      errors.push(`Размер файла слишком большой`);
    }
    if (this.options?.type && !file.type.includes(this.options.type)) {
      errors.push(`Неверный формат файла`);
    }
    for (const error of errors) {
      this.toastr.error(error);
    }
    return !errors.length;
  }

  private createHiddenElement(): Promise<void> {
    this.hiddenElement = this.renderer.createElement('input');
    this.renderer.setProperty(this.hiddenElement, 'type', 'file');
    this.renderer.setProperty(this.hiddenElement, 'hidden', true);
    if (this.options?.multiple !== null) {
      this.renderer.setProperty(this.hiddenElement, 'multiple', this.options?.multiple);
    }
    if (this.options?.accept !== null) {
      this.renderer.setProperty(this.hiddenElement, 'accept', this.options?.accept);
    }
    // Фикс для IE, т.к. клик по инпуту происходит раньше, чем елемент вставляется в DOM.
    return new Promise<void>(resolve => {
      this.renderer.appendChild(document.body, this.hiddenElement);
      this.listener = this.renderer.listen(this.hiddenElement, 'change', event => this.fileChange(event));
      resolve();
    });
  }

  private removeHiddenElement() {
    this.renderer.removeChild(document.body, this.hiddenElement);
    this.listener();
  }

  private createFormData(files: FileList): FormData {
    const formData = new FormData();
    const { dtoName = this.dtoName, params = {} } = this.options;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      formData.append(dtoName, file, file.name);
    }
    Object.entries(params).forEach(([name, value]) => formData.append(name, value));
    return formData;
  }

}
