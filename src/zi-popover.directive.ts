import {
	Directive, Input, ComponentFactoryResolver, ViewContainerRef, Type, OnInit,
	OnDestroy, HostListener, ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { PopoverService } from './PopoverService';
import { PopoverComponent } from './PopoverComponent';
import { PopoverEvent, Action } from './PopoverEvent';
import { PopoverConfiguration } from './PopoverConfiguration';

export enum Trigger {
	CLICK, FOCUSED
}

@Directive({
	selector: '[zi-popover]'
})
export class ZIPopoverDirective implements OnInit, OnDestroy {
	@Input( 'zi-popover' )
	private key: string;

	@Input( 'zi-popover-trigger' )
	private trigger: Trigger;

	@Input( 'zi-popover-component' )
	private component: Type<PopoverComponent>;

	@Input( 'zi-popover-configuration' )
	private configuration: PopoverConfiguration;

	@Input( 'zi-popover-ref' )
	private ziElementRef: PopoverComponent;

	private subscription: Subscription;
	private active: boolean;

	constructor( private popoverService: PopoverService, private viewContainerRef: ViewContainerRef,
					private componentFactoryResolver: ComponentFactoryResolver ) {}

	private durationTimeout;
	private popoverEventHandler = ( event: PopoverEvent ) => {
		this.active = event.action === Action.OPEN;

		if (  this.active ) {
			// check if component ref exists and if it is of proper type else generate a new one
			let component = event.component ? event.component : this.component;
			if ( !this.ziElementRef ||
					( component && !( this.ziElementRef instanceof component ) ) ) {
				this.ziElementRef = this.generateComponent( component );
			}
			let config = event.configuration ? event.configuration : this.configuration;
			if ( config ) {
				this.ziElementRef.configuration = config;
				if ( config.duration !== undefined ) {
					if ( this.durationTimeout !== undefined ) {
						clearTimeout( this.durationTimeout );
					}
					this.durationTimeout = setTimeout( () => {
						this.popoverService.next( this.key, new PopoverEvent( Action.CLOSE ) );
					}, config.duration );
				} else if ( this.durationTimeout !== undefined ) {
					clearTimeout( this.durationTimeout );
					this.durationTimeout = undefined;
				}
			}
		}

		if ( !this.active && this.durationTimeout !== undefined ) {
			clearTimeout( this.durationTimeout );
			this.durationTimeout = undefined;
		}

		if ( this.ziElementRef )
			this.ziElementRef.show = this.active;
	}

	private generateComponent( component: Type<PopoverComponent> ): PopoverComponent {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory( component );
		let popoverInstanceRef = this.viewContainerRef.createComponent( componentFactory );
		let instance = popoverInstanceRef.instance as PopoverComponent;
		instance.target = this.viewContainerRef.element;
		return instance;
	}

	@HostListener( 'click' )
	clickHandler() {
		if ( this.trigger === Trigger.CLICK ) {
			if ( !this.active ) {
				this.popoverService.next( this.key, new PopoverEvent( Action.OPEN ) );
			}
		}
	}

	@HostListener( "document:click", [ '$event' ] )
	documentClickHandler( $event ) {
		if ( this.trigger === Trigger.CLICK ) {
			if ( !this.ziElementRef.contains( $event.target ) &&
				 !this.viewContainerRef.element.nativeElement.contains( $event.target ) ) {
				this.popoverService.next( this.key, new PopoverEvent( Action.CLOSE ) );
			}
			if ( !this.viewContainerRef.element.nativeElement.contains( $event.target ) )
				this.active = false;
		}
	}

	@HostListener( "focusin" )
	@HostListener( "mouseenter" )
	enter() {
		if ( this.trigger === Trigger.FOCUSED ) {
			if ( !this.active ) {
				this.popoverService.next( this.key, new PopoverEvent( Action.OPEN ) );
			}
		}
	}

	@HostListener( "focusout" )
	@HostListener( "mouseleave" )
	leave() {
		if ( this.trigger === Trigger.FOCUSED ) {
			if ( this.active ) {
				this.popoverService.next( this.key, new PopoverEvent( Action.CLOSE ) );
			}
		}
	}

	ngOnInit() {
		this.subscription = this.popoverService.observable( this.key ).subscribe(
			this.popoverEventHandler,
			( err ) => {
				console.error( 'Error observing zi-popover key: '+this.key, err );
			}
		);
	}

	ngOnDestroy() {
		this.popoverService.unsubscribe( this.key, this.subscription );
	}

}
