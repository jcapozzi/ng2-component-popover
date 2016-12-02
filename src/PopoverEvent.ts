import { Type } from '@angular/core';

import { PopoverComponent } from './PopoverComponent';

import { PopoverConfiguration } from './PopoverConfiguration';

export class PopoverEvent {
	public action: Action;
	public component: Type<PopoverComponent>;
	public configuration: PopoverConfiguration;

	constructor( action: Action );
	constructor( action: Action, component: Type<PopoverComponent> );
	constructor( action: Action, component: Type<PopoverComponent>, configuration: PopoverConfiguration );
	constructor( action: Action, component?: Type<PopoverComponent>, configuration?: PopoverConfiguration ) {
		this.action = action;
		this.component = component;
		this.configuration = configuration;
	}

}

export enum Action {
	OPEN, CLOSE
}
