import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerComponent } from "ngx-spinner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('E-commerce');
  private readonly id = inject(PLATFORM_ID);
  constructor(private spinner: NgxSpinnerService) {}

  //Dom ,Bom ---------window ,documet.localStorage ->runs on browser

  /*
  AfterRender     once time afterviewinit
  AfterEveryNextRender    multi time afterviewcheck         ->runs on browser
  */
  /*
  
   */

  ngOnInit() {

  }
  // ngOnInit(): void {
  //   // // if(typeof localStorage!='undefined'){
  //   // //   window.alert('hello')
  //   // // }
  //   // if (isPlatformServer(this.id)) {
  //   //   window.alert('heloo');
  //   // }
  // }

}