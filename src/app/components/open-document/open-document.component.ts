import { Component, OnInit, ElementRef } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { ProveitService } from '../../services/proveit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'proveit-open-document',
  templateUrl: './open-document.component.html',
  styleUrls: ['./open-document.component.scss']
})
export class OpenDocumentComponent implements OnInit {

  finished = false;

  constructor(
    private proveIt: ProveitService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  processFile(file: File) {
    console.log(file.name, file.size);
    let reader = new FileReader();
    reader.onload = async (event: {target}) => {
      const data = event.target.result;
      const hash = SHA256(data);
      try {
        const response = await this.proveIt.store(hash).toPromise();
        if (response === 'SUCCESS') {
          this.snackBar.open('File registered successfully!', 'Success', { duration: 5000 });
        }
        this.finished = true;
      } catch (error) {
        console.log(error);
      }
    };
    reader.readAsBinaryString(file);
  }

  reset() {
    this.finished = false;
  }

}