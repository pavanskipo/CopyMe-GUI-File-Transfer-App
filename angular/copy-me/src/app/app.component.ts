import { Component } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService) { }

  public list_of_devices = [];
  public device_detail = {};
  public device_list = true;
  public files: NgxFileDropEntry[] = [];
  public file_progress = {};

  ngOnInit() {
    let url = window.location.href + 'api/getdevices';
    // let url = 'http://localhost:3000/' + 'api/getdevices';
    this.spinner.show();
    this.http.get<any>(url).subscribe((data) => {
      this.list_of_devices = data;
      this.spinner.hide();
    });
  }

  getDeviceDetails(ip) {
    let url = window.location.href + 'api/getdevicedetails';
    // let url = 'http://localhost:3000/' + 'api/getdevicedetails';
    this.spinner.show();
    this.http.get<any>(url).subscribe((data) => {
      this.device_detail = data;
      this.spinner.hide();
      this.device_list = false;
    });
  }

 
  public upload(data) {
    let uploadURL = window.location.href + 'api/upload';

    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.file_progress = {};

    for (const droppedFile of files) {
 
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          this.file_progress[droppedFile.relativePath] = 0;
          const formData = new FormData();
          formData.append('uploadData', file, droppedFile.relativePath)

          this.upload(formData).subscribe(data => {
            if(typeof data.message == 'number') {
              this.file_progress[droppedFile.relativePath] = data.message;
            }
          })
 
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

}
