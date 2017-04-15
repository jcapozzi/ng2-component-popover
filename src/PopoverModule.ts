import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PopoverService } from "./PopoverService";
import { ZIPopoverDirective } from "./zi-popover.directive";
import { ZIBootstrap3PopoverComponent } from "./component/index";

@NgModule({
	imports: [
		CommonModule, BrowserAnimationsModule
	],
	declarations: [
		ZIPopoverDirective, ZIBootstrap3PopoverComponent
	],
	exports: [
		ZIPopoverDirective, ZIBootstrap3PopoverComponent
	],
	entryComponents: [
		ZIBootstrap3PopoverComponent
	],
	providers: [
		PopoverService
	]
})
export class PopoverModule {}