import { ElementRef, QueryList } from '@angular/core';

import { PopoverConfiguration } from 'ng2-component-popover';

export class HudPopoverConfiguration implements PopoverConfiguration {
	public key: string;
	public content: string;
	public siblings: QueryList<ElementRef>;

	constructor( key: string, content: string ) {
		this.key = key;
		this.content = content;
	}

	addSiblings( siblings: QueryList<ElementRef> ) {
		this.siblings = siblings;
	}

}
