import { ZIPopoverDirective, Trigger } from './zi-popover.directive';
import { PopoverEvent, Action } from './PopoverEvent';

describe( 'test -> zi-bootstrap3-popover.component', () => {
	let target: ZIPopoverDirective, viewContainerRef: any,
		popoverService: any, componentFactoryResolver: any;

	beforeEach( () => {
		viewContainerRef = {
			 createComponent: jasmine.createSpy( 'viewContainerRefMock.createComponent()' ),
			 element: {
				 nativeElement: {
					 contains: jasmine.createSpy( 'viewContainerRefMock.element.nativeElement.contains()' ),
				 }
			 }
		};
		componentFactoryResolver = jasmine.createSpyObj( 'componentFactoryResolverMock', [ 'resolveComponentFactory' ] );
		popoverService = jasmine.createSpyObj( 'popoverServiceMock', [ 'observable', 'next', 'unsubscribe' ] );

		target = new ZIPopoverDirective( popoverService, viewContainerRef, componentFactoryResolver );
	});

	it( 'should subscribe on init and handle popover events', () => {
		let popoverComponentMock: any = jasmine.createSpy( 'popoverComponentMock' );
		let popoverConfig: any = 'popoverConfig';
		let observableMock = jasmine.createSpyObj( 'observableMock', [ 'subscribe' ] );
		popoverService.observable.and.returnValue( observableMock );
		let popoverInstanceMock = {
			instance: <any>{}
		};
		viewContainerRef.createComponent.and.returnValue( popoverInstanceMock );
		Object.defineProperty( target, 'key', { value: 'test.key' } );

		target.ngOnInit();

		expect( popoverService.observable ).toHaveBeenCalledWith( 'test.key' );
		expect( observableMock.subscribe ).toHaveBeenCalledWith( jasmine.any( Function ), jasmine.any( Function ) );

		 observableMock.subscribe.calls.argsFor( 0 )[ 0 ]( new PopoverEvent( Action.CLOSE ) );
		 expect( target[ 'active' ] ).toBeFalsy();

		 observableMock.subscribe.calls.argsFor( 0 )[ 0 ]( new PopoverEvent( Action.OPEN, popoverComponentMock, popoverConfig ) );
		 expect( popoverInstanceMock.instance.target ).toBe( viewContainerRef.element );
		 expect( target[ 'ziElementRef' ] ).toBe( popoverInstanceMock.instance );
		 expect( target[ 'ziElementRef' ].show ).toBeTruthy();
		 expect( target[ 'active' ] ).toBeTruthy();

	});

	it( 'should unsubscribe on destroy', () => {
		Object.defineProperty( target, 'key', { value: 'test.key' } );
		Object.defineProperty( target, 'subscription', { value: 'subscription' } );
		target.ngOnDestroy();
		expect( popoverService.unsubscribe ).toHaveBeenCalledWith( 'test.key', 'subscription' );
	});

	it( 'should send close event when unfocused and trigger is set to focused and active', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.FOCUSED;
		target[ 'active' ] = true;
		target.leave();
		expect( popoverService.next.calls.argsFor( 0 )[ 0 ] ).toBe( 'test.key' );
		expect( popoverService.next.calls.argsFor( 0 )[ 1 ].action ).toBe( Action.CLOSE );
	});

	it( 'should send open event when focsued and trigger is set to focused and not active', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.FOCUSED;
		target[ 'active' ] = false;
		target.enter();
		expect( popoverService.next.calls.argsFor( 0 )[ 0 ] ).toBe( 'test.key' );
		expect( popoverService.next.calls.argsFor( 0 )[ 1 ].action ).toBe( Action.OPEN );
	});

	it( 'should send open event when clicked and trigger is set to click and not active', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.CLICK;
		target[ 'active' ] = false;
		target.clickHandler();
		expect( popoverService.next.calls.argsFor( 0 )[ 0 ] ).toBe( 'test.key' );
		expect( popoverService.next.calls.argsFor( 0 )[ 1 ].action ).toBe( Action.OPEN );
	});

	it( 'should do nothing when not active', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.FOCUSED;
		target[ 'active' ] = false;
		target.leave();
		target.clickHandler();
		expect( popoverService.next.calls.count() ).toBe( 0 );
	});

	it( 'should do nothing when active', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.FOCUSED;
		target[ 'active' ] = true;
		target.enter();
		expect( popoverService.next.calls.count() ).toBe( 0 );
	});

	it( 'should do nothing when trigger isnt set', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = undefined;
		target[ 'active' ] = true;
		target.leave();
		target.enter();
		target.clickHandler();
		expect( popoverService.next.calls.count() ).toBe( 0 );
	});

	it( 'should do nothing when trigger is set to focused', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = undefined;
		target[ 'active' ] = true;
		target.enter();
		expect( popoverService.next.calls.count() ).toBe( 0 );
	});

	it( 'should not send close event when document click target is the popover or the target element', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.CLICK;
		let containsSpy = jasmine.createSpy( 'contains' );
		containsSpy.and.returnValue( true );
		Object.defineProperty( target, 'ziElementRef', { value : { contains: containsSpy } } );
		target.documentClickHandler( { target: 'target' } );
		expect( popoverService.next.calls.count() ).toBe( 0 );
		expect( containsSpy ).toHaveBeenCalledWith( 'target' );
		expect( viewContainerRef.element.nativeElement.contains ).toHaveBeenCalledWith( 'target' );
	});

	it( 'should send close event when document click target isnt the popover or the target element', () => {
		target[ 'key' ] = 'test.key';
		target[ 'trigger' ] = Trigger.CLICK;
		target[ 'active' ] = true;
		let containsSpy = jasmine.createSpy( 'contains' );
		containsSpy.and.returnValue( false );
		Object.defineProperty( target, 'ziElementRef', { value : { contains: containsSpy } } );
		target.documentClickHandler( { target: 'target' } );
		expect( popoverService.next.calls.argsFor( 0 )[ 0 ] ).toBe( 'test.key' );
		expect( popoverService.next.calls.argsFor( 0 )[ 1 ].action ).toBe( Action.CLOSE );
		expect( containsSpy ).toHaveBeenCalledWith( 'target' );
		expect( viewContainerRef.element.nativeElement.contains ).toHaveBeenCalledWith( 'target' );
		expect( target[ 'active' ] ).toBeFalsy();
	});

});
