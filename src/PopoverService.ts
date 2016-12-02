import { Injectable } from '@angular/core';

import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PopoverEvent, Action } from './PopoverEvent';

@Injectable()
export class PopoverService {

	private registeredPopovers: Map<string, BehaviorSubject<PopoverEvent>>;

	constructor() {
		this.registeredPopovers = new Map<string, BehaviorSubject<PopoverEvent>>();
	}

	public observable( key: string ): Observable<PopoverEvent> {
		if ( !this.registeredPopovers.has( key ) ) {
			this.registeredPopovers.set( key, new BehaviorSubject<PopoverEvent>( new PopoverEvent( Action.CLOSE ) ) );
		}
		return this.registeredPopovers.get( key );
	}

	public next( key: string, event: PopoverEvent ): Observable<PopoverEvent> {
		if ( !this.registeredPopovers.has( key ) ) {
			this.registeredPopovers.set( key, new BehaviorSubject<PopoverEvent>( event ) );
		} else {
			this.registeredPopovers.get( key ).next( event );
		}
		return this.registeredPopovers.get( key );
	}

	public unsubscribe( key: string, subscription: Subscription ): void {
		if ( subscription )
			subscription.unsubscribe();

		if ( this.registeredPopovers.get( key ) && this.registeredPopovers.get( key ).observers.length === 0 ) {
			this.registeredPopovers.get( key ).complete();
			this.registeredPopovers.get( key ).unsubscribe();
			this.registeredPopovers.delete( key );
		}
	}

}
