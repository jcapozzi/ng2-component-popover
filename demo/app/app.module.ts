import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PopoverModule } from "ng2-component-popover";

import { AppComponent } from "./app.component";

import { ZIHudPopoverComponent } from "./custom/zi-hud-popover.component";

@NgModule({
	imports: [
		PopoverModule, BrowserModule, BrowserAnimationsModule
	],
	declarations: [
		AppComponent, ZIHudPopoverComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
