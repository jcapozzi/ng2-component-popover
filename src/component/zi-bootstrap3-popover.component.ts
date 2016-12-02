import {
	Component, Renderer, ElementRef, ViewChild, Input, AfterViewChecked, Inject,
	ChangeDetectorRef, ChangeDetectionStrategy, HostBinding, HostListener
} from '@angular/core';

import { PopoverComponent } from '../PopoverComponent';

import { PopoverService } from '../PopoverService';

import { PopoverEvent, Action } from '../PopoverEvent';

import { PopoverConfiguration } from '../PopoverConfiguration';

import { Bootstrap3Configuration, Location } from './Bootstrap3Configuration';

@Component({
	selector: 'zi-bootstrap3-popover',
	template:`
		<div class="arrow"></div>
		<div class="popover-title" *ngIf="title">
			<b>{{ title }}</b>
		</div>
		<div class="popover-content">
			<ng-content></ng-content>
			{{ content }}
		</div>
		<div *ngIf="closer" class="popover-footer">
			<a class="btn btn-primary" (click)="close()">Close</a>
		</div>
	`,
	styles: [`
		:host {
			z-index: 10000;
			display: table;
			opacity: 0;
		}

		.popover-footer {
			padding: 4px 5px;
			text-align: right;
			border-top: 1px solid #ebebeb;
		}

	`]
})
export class ZIBootstrap3PopoverComponent implements PopoverComponent, AfterViewChecked {
	public title: string;
	public content: any;
	public closer: boolean;
	public location: Location;

	private _configuration: Bootstrap3Configuration;
	private _target: ElementRef;
	public _show: boolean = false;

	@HostBinding( 'class.popover' )
	@HostBinding( 'class.fade' )
	@HostBinding( 'class.in' )
	private hostBindings = true;

	@HostBinding( 'attr.role' )
	private role = 'popover';

	constructor( private popover: ElementRef, private popoverService:PopoverService,
					private renderer: Renderer, private cd: ChangeDetectorRef ) {}

	@Input( 'configuration' )
	public set configuration( configuration: Bootstrap3Configuration ) {
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
		if ( show ) {
			this._show = show;
			this.closeOnLeave = false;
			this.renderer.setElementStyle( this.popover.nativeElement, "display", "table" );
		} else {
			if ( !this.focused || this.closeOverride ) {
				this.closeOverride = false;
				this.renderer.setElementStyle( this.popover.nativeElement, "opacity", "0" );
				this.renderer.setElementStyle( this.popover.nativeElement, "display", "none" );
			} else {
				this.closeOnLeave = true;
			}
		}
		this.cd.markForCheck();
	}

	private focused = false;
	private closeOnLeave = false;
	private closeOverride = false;

	@HostListener( "focusout" )
	@HostListener( "mouseleave" )
	leave() {
		this.focused = false;
		if ( this.closeOnLeave ) {
			this.close();
		}
	}

	@HostListener( "focusin" )
	@HostListener( "mouseenter" )
	enter() {
		this.focused = true;
	}

	public contains( elementRef: ElementRef ) {
		return this.popover.nativeElement.contains( elementRef );
	}

	private position( targetRef: ElementRef ) {
		let x = targetRef.nativeElement.offsetLeft + targetRef.nativeElement.offsetWidth / 2;
		let y = targetRef.nativeElement.offsetTop + targetRef.nativeElement.offsetHeight / 2;
		let locationClass: string;

		switch ( this.location ) {
			case Location.TOP: {
				locationClass = 'top';
				x -= this.popover.nativeElement.offsetWidth / 2;
				y -= (targetRef.nativeElement.offsetHeight / 2) + this.popover.nativeElement.offsetHeight;
				break;
			}
			case Location.RIGHT: {
				locationClass = 'right';
				x += targetRef.nativeElement.offsetWidth / 2;
				y -= this.popover.nativeElement.offsetHeight / 2;
				break;
			}
			case Location.BOTTOM: {
				locationClass = 'bottom';
				x -= this.popover.nativeElement.offsetWidth / 2;
				y += targetRef.nativeElement.offsetHeight / 2;
				break;
			}
			case Location.LEFT: {
				locationClass = 'left';
				x -= (targetRef.nativeElement.offsetWidth / 2) + this.popover.nativeElement.offsetWidth;
				y -= this.popover.nativeElement.offsetHeight / 2;
				break;
			}
		}

		this.renderer.setElementStyle( this.popover.nativeElement, "opacity", "1" );
		this.renderer.setElementClass( this.popover.nativeElement, 'left', false );
		this.renderer.setElementClass( this.popover.nativeElement, 'right', false );
		this.renderer.setElementClass( this.popover.nativeElement, 'top', false );
		this.renderer.setElementClass( this.popover.nativeElement, 'bottom', false );
		this.renderer.setElementClass( this.popover.nativeElement, locationClass, true );
		this.renderer.setElementStyle( this.popover.nativeElement, 'position', 'absolute' );
		this.renderer.setElementStyle( this.popover.nativeElement, 'top', y+'px' );
		this.renderer.setElementStyle( this.popover.nativeElement, 'left', x+'px' );
	}

	public close() {
		this.closeOverride = true;
		this.popoverService.next( this._configuration.key, new PopoverEvent( Action.CLOSE ) );
	}

	ngAfterViewChecked() {
		if ( this._show ) {
			this.position( this._target );
		}
	}

}
