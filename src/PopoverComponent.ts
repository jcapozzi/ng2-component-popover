import { ElementRef } from '@angular/core';

import { PopoverConfiguration } from './PopoverConfiguration';

export interface PopoverComponent {
	configuration: PopoverConfiguration;
	target: ElementRef;
	show: boolean;
	contains( elementRef: ElementRef )
}