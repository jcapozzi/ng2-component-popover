import { ZIBootstrap3PopoverComponent } from './zi-bootstrap3-popover.component';
import { Bootstrap3Configuration, Location } from './Bootstrap3Configuration';
import { PopoverEvent, Action } from '../PopoverEvent';

describe( 'test -> zi-bootstrap3-popover.component', ()=> {
	let target: ZIBootstrap3PopoverComponent, renderer: any, elementRef: any,
		popoverService: any, changeDetectorRef: any;

	beforeEach( () => {
		renderer = jasmine.createSpyObj( 'rendererMock', [ 'setElementStyle', 'setElementClass' ] );
		elementRef =  {
			nativeElement: jasmine.createSpyObj( 'nativeElementMock', [ 'setElementStyle', 'getBoundingClientRect', 'contains' ] )
		};
		popoverService = jasmine.createSpyObj( 'popoverServiceMock', [ 'observable', 'next', 'unsubscribe' ] );
		changeDetectorRef = jasmine.createSpyObj( 'changeDetectorRef', [ 'markForCheck' ] );
		target = new ZIBootstrap3PopoverComponent( elementRef, popoverService, renderer, changeDetectorRef );
	});

	it( 'should apply configuration to instance', () => {
		target.configuration = new Bootstrap3Configuration( 'test.key', 'Test Title', 'Test Content', Location.TOP, true );
		expect( target.title ).toBe( 'Test Title' );
		expect( target.content ).toBe( 'Test Content' );
		expect( target.location ).toBe( Location.TOP );
		expect( target.closer ).toBeTruthy();
	});

	it( 'should send close event to configured key', () => {
		target.configuration = new Bootstrap3Configuration( 'test.key', 'Test Title', 'Test Content', Location.TOP, true );
		target.close();
		expect( popoverService.next ).toHaveBeenCalled();
		expect( popoverService.next.calls.argsFor( 0 )[ 0 ] ).toBe( 'test.key' );
		expect( popoverService.next.calls.argsFor( 0 )[ 1 ].action ).toBe( Action.CLOSE );
	});

	it( 'should return contains product of native element', () => {
		elementRef.nativeElement.contains.and.returnValue( 'custVal' );
		let returnVal = target.contains( 'paramEl' as any );
		expect( elementRef.nativeElement.contains.calls.argsFor( 0 ) ).toEqual( [ 'paramEl' ] );
		expect( returnVal ).toEqual( 'custVal' );
	});

	it( 'should hide when show is false', () => {
		elementRef.nativeElement =  'testVal';
		target.show = false;

		expect( renderer.setElementStyle ).toHaveBeenCalledWith( 'testVal', 'opacity', '0' );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'display', 'none' );
		expect( changeDetectorRef.markForCheck ).toHaveBeenCalled();
	});

	it( 'should position on ngAfterViewChecked', () => {
		let targetRef: any = {
			nativeElement: { offsetHeight: 100, offsetWidth: 100, offsetLeft: 300, offsetTop: 300 }
		};
		elementRef.nativeElement.offsetHeight = 50;
		elementRef.nativeElement.offsetWidth = 50;

		target.show = true;
		target.target = targetRef;
		target.configuration = new Bootstrap3Configuration( 'test.key', 'Test Title', 'Test Content', Location.TOP, true );

		target.ngAfterViewChecked();

		expect( target.show ).toBeTruthy();
		// should mark for check
		expect( changeDetectorRef.markForCheck ).toHaveBeenCalled();
		// should display it
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'display', 'table' );
		// should remove all previous possiblities for location class
		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'left', false );
		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'right', false );
		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'top', false );
		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'bottom', false );
		// should set opactiy
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'opacity', '1' );
		// should set location class to new location
		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'top', true );
		// should set positioning
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'position', 'absolute' );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'top', '250px' );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'left', '325px' );

		renderer.setElementStyle.calls.reset();
		renderer.setElementClass.calls.reset();
		target.location = Location.RIGHT;
		target.ngAfterViewChecked();

		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'right', true );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'top', '325px' );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'left', '400px' );

		renderer.setElementStyle.calls.reset();
		renderer.setElementClass.calls.reset();
		target.location = Location.BOTTOM;
		target.ngAfterViewChecked();

		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'bottom', true );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'top', '400px' );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'left', '325px' );

		renderer.setElementStyle.calls.reset();
		renderer.setElementClass.calls.reset();
		target.location = Location.LEFT;
		target.ngAfterViewChecked();

		expect( renderer.setElementClass ).toHaveBeenCalledWith( elementRef.nativeElement, 'left', true );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'top', '325px' );
		expect( renderer.setElementStyle ).toHaveBeenCalledWith( elementRef.nativeElement, 'left', '250px' );
	});

});
