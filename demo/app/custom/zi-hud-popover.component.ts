import { Component, Renderer, ElementRef, ViewChild, Input, trigger, state, style, transition, animate } from '@angular/core';

import { PopoverComponent, PopoverService } from 'ng2-component-popover';

import { HudPopoverConfiguration } from './HudPopoverConfiguration';

@Component({
	selector: 'zi-hud-popover',
	template: `
		<div class="hud-title">
			<ng-content></ng-content>
		</div>
		<div class="hud-content" *ngIf="content" [@easeIn]="content" [innerHTML]="content" #hudContent></div>
	`,
	animations: [
		trigger( 'easeIn', [
			state( 'void', style( { maxHeight: 0 } ) ),
			state( '*', style( { maxHeight: 400 } ) ),
			transition( 'void => *', animate( '.75s ease-in' ) )
		])
	],
	styles: [`
		:host {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			margin: 0 -15px;
			opacity: .85;
			background-color: lightgrey;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}

		.hud-title {
			height: 25px;
			width: 25%;
			text-align: center;
			background-color: lightgrey;
			font-weight: bold;
			flex: 0;
			order: 2;
		}

		.hud-content {
			width: 100%;
			background-color: lightgrey;
			text-align: center;
			order: 1;
			overflow: hidden;
		}

	`]
})
export class ZIHudPopoverComponent implements PopoverComponent {
	public content: any;

	private _configuration: HudPopoverConfiguration;
	private _target: ElementRef;
	public _show: boolean = false;

	@ViewChild( 'hudContent' )
	private hudContentRef: ElementRef;

	constructor( private thisElementRef: ElementRef, private renderer: Renderer ) {}

	@Input( 'configuration' )
	public set configuration( configuration: HudPopoverConfiguration ) {
		this._configuration = configuration;
		Object.assign( this, configuration ); // apply configuration properties
	}

	@Input( 'target' )
	public set target( target: ElementRef ) {
		this._target = target;
	}

	public get show() {
		return this._show;
	}

	@Input( 'show' )
	public set show( show: boolean ) {
		this._show = show;
		if ( show ) {
			this.content = this._configuration.content;
		} else {
			this.content = null;
		}
	}

	public contains( elementRef: ElementRef ) {
		if ( this.thisElementRef.nativeElement.contains( elementRef ) ) {
			return true;
		}
		for ( let sibling of this._configuration.siblings.toArray() ) {
			if ( sibling.nativeElement.contains( elementRef ) )
				return true;
		} 
		return false;
	}

}
