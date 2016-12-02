import { inject, TestBed, async } from '@angular/core/testing';

import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PopoverService } from './PopoverService';
import { PopoverEvent, Action } from './PopoverEvent';

describe( 'test -> PopoverService', () => {
	let target: PopoverService;

  	beforeEach( async( () => {
		TestBed.configureTestingModule({
			providers: [ PopoverService ]
		});
	}));
	
	beforeEach( inject( [ PopoverService ], ( popoverService ) => {
		target = popoverService;
	}));
 
	it( 'should return observable', () => {
		let a = target.observable( 'test.key' );

		expect( a ).toBeDefined();
		expect( a instanceof Observable ).toBeTruthy();
  	});

	it( 'should subscribe to test.key and receive events', () => {
		let defaultEventFired = false;
		target.observable( 'test.key' ).subscribe( ( val ) => {
			defaultEventFired = true;
			expect( val.action ).toBe( Action.CLOSE );
		});
		expect( defaultEventFired ).toBeTruthy();
	});

	it( 'should subscribe to test.key and receive all events until unsubscribed', () => {
		let numberOfEvents = 0;
		let subscription = target.observable( 'test.key' ).subscribe( ( val ) => {
			numberOfEvents++;
			if ( numberOfEvents === 1 )
				expect( val.action ).toBe( Action.CLOSE );
			if ( numberOfEvents === 2 )
				expect( val.action ).toBe( Action.OPEN );
		});

		target.next( 'test.key', new PopoverEvent( Action.OPEN ) );
		target.unsubscribe( 'test.key', subscription );

		target.next( 'test.key', new PopoverEvent( Action.CLOSE ) );
		expect( numberOfEvents ).toBe( 2 );
	});

	it( 'should return observable with passed in event as default', () => {
		let numberOfEvents = 0;
		let subscription = target.next( 'test.key', new PopoverEvent( Action.OPEN ) ).subscribe( ( val ) => {
			numberOfEvents++;
			expect( val.action ).toBe( Action.OPEN );
		});

		expect( numberOfEvents ).toBe( 1 );
	});
	
});
