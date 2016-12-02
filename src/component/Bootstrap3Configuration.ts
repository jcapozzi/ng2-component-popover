import { PopoverConfiguration } from '../PopoverConfiguration';

export class Bootstrap3Configuration implements PopoverConfiguration {
	key: string;
	title: string;
	content: string;
	location: Location;
	closer: boolean;
	duration: number;

	constructor( key: string, title: string, content: string, location: Location, closer: boolean, duration?: number ) {
		this.key = key;
		this.title = title;
		this.content = content;
		this.location = location;
		this.closer = closer;
		this.duration = duration;
	}

}

export enum Location {
				     TOP,
	LEFT,		/** target */		RIGHT,
			 	    BOTTOM
}
