import { Component, OnInit } from '@angular/core';
import { readFileSync, readFile } from 'fs';

@Component({
  selector: 'app-utleverans',
  templateUrl: './utleverans.component.html',
  styleUrls: ['./utleverans.component.scss']
})
export class UtleveransComponent implements OnInit {
  testFile: string = 'Hej'

  constructor() { }

  ngOnInit() {
    console.log(this.testFile)
  }
  



}
