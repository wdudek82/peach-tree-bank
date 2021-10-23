import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";

const modules = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
];

@NgModule({
  declarations: [
  ],
  imports: modules,
  exports: modules,
})
export class CoreModule {
}
