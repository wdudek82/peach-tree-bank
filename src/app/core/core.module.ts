import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

const modules = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
  ],
  imports: modules,
  exports: modules,
})
export class CoreModule {
}
