import {Injectable}from '@angular/core';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class UploadService {
filesToUpload: Array<File>;

constructor() {
    this.filesToUpload = [];
}

 makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    return new Promise((resolve, reject) => {
        let formData: any = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);         
        }

        xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

        xhr.open('POST', url, true);
        xhr.send(formData);
    });
}
}