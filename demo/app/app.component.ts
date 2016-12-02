import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

import {
	PopoverService, PopoverEvent, Action, Location, ZIBootstrap3PopoverComponent,
	Trigger, Bootstrap3Configuration
} from 'ng2-component-popover';

import { ZIHudPopoverComponent } from './custom/zi-hud-popover.component';
import { HudPopoverConfiguration } from './custom/HudPopoverConfiguration';

@Component({
	selector: 'app',
	template: `
		<div class="container-fluid" #container>
			<zi-hud-popover [target]="containerTargetRef"><b>Hud Title</b></zi-hud-popover>
			<h2>App component</h2>

			<div id="target1" zi-popover="test.key" [zi-popover-trigger]="trigger" [zi-popover-ref]="popoverRef" [zi-popover-configuration]="configuration" #popoverTarget>
			 	<span>Target1</span>
			</div>

			<zi-bootstrap3-popover [target]="popoverTargetRef">
				<b class="btn btn-default" style="color:red;" (click)="alertConfig();">Config</b>
			</zi-bootstrap3-popover>

			<div id="target2" zi-popover="test.key2" [zi-popover-trigger]="trigger2" [zi-popover-component]="component2" [zi-popover-configuration]="configuration2">
				<span>Target2</span>
			</div>

			<div id="target3" zi-popover="test.key3">
				<span>Target3</span>
			</div>

			<div id="hudTarget1" #hudSibling zi-popover="hud.key1" [zi-popover-trigger]="hudTrigger" [zi-popover-configuration]="hudConfig1" [zi-popover-ref]="hudPopoverRef">
				<span>Target1</span>
			</div>

			<div id="hudTarget2" #hudSibling zi-popover="hud.key2" [zi-popover-trigger]="hudTrigger" [zi-popover-configuration]="hudConfig2" [zi-popover-ref]="hudPopoverRef">
				<span>Target2</span>
			</div>

			<div id="hudTarget3" #hudSibling zi-popover="hud.key3" [zi-popover-trigger]="hudTrigger" [zi-popover-configuration]="hudConfig3" [zi-popover-ref]="hudPopoverRef">
				<span>Target3</span>
			</div>

			<div id="hudTarget4" #hudSibling zi-popover="hud.key4" [zi-popover-trigger]="hudTrigger" [zi-popover-configuration]="hudConfig4" [zi-popover-ref]="hudPopoverRef">
				<span>Target4</span>
			</div>

			<div class="parent-container">
				<div id="container-target" zi-popover="test.key4">
					<span>Positioned Target</span>
				</div>
			</div>
		</div>
	`,
	styles: [`
		#target1, #target2, #target3 {
			position: absolute;
			top: calc( 25% - 50px );
			left: calc( 25% - 50px );
			width: 100px;
			height: 100px;
			background-color: grey;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}

		#target1, #target2, #target3 > * {
			text-align: center;
			flex: 0;
		}

		#target2 {
			left: calc( 50% - 50px );
		}

		#target3 {
			left: calc( 75% - 50px );
		}

		#hudTarget1, #hudTarget2, #hudTarget3, #hudTarget4 {
			position: absolute;
			top: calc( 50% - 50px );
			left: calc( 20% - 50px );
			width: 100px;
			height: 100px;
			background-color: lightblue;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}

		#hudTarget1, #hudTarget2, #hudTarget3, #hudTarget4 > * {
			text-align: center;
			flex: 0;
		}

		#hudTarget2 {
			left: calc( 40% - 50px );
		}

		#hudTarget3 {
			left: calc( 60% - 50px );
		}

		#hudTarget4 {
			left: calc( 80% - 50px );
		}

		.parent-container {
			position: absolute;
			bottom: 100px;
			left: calc( 50% - 100px );
			width: 200px;
			height: 200px;
			background-color: lightgreen;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}

		#container-target {
			position: absolute;
			top: calc( 50% - 50px );
			left: calc( 50% - 50px );
			background-color: lightpink;
			width: 100px;
			height: 100px;
			flex: 0;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}

		#container-target > * {
			flex: 0;
			text-align: center;
		}


	`]
})
export class AppComponent {

	@ViewChild( 'popoverTarget' )
	private popoverTargetRef: ElementRef;

	@ViewChild( 'containerTarget' )
	private containerTargetRef: ElementRef;

	@ViewChild( ZIBootstrap3PopoverComponent )
	private popoverRef: ZIBootstrap3PopoverComponent;

	@ViewChild( ZIHudPopoverComponent )
	private hudPopoverRef: ZIHudPopoverComponent;

	@ViewChildren( 'hudSibling' )
	private hudSiblings: QueryList<ElementRef>;

	//target1
	public trigger = Trigger.CLICK;
	public configuration = new Bootstrap3Configuration( 'test.key', 'Popover Title', undefined, Location.RIGHT, true, 5000 );

	//target2
	public trigger2 = Trigger.FOCUSED;
	public component2 = ZIBootstrap3PopoverComponent;
	public configuration2 = new Bootstrap3Configuration( 'test.key2', 'Popover Title2', "Popover content2", Location.LEFT, false, 5000 );

	public hudTrigger = Trigger.FOCUSED;
	public hudConfig1: HudPopoverConfiguration;
	public hudConfig2: HudPopoverConfiguration;
	public hudConfig3: HudPopoverConfiguration;
	public hudConfig4: HudPopoverConfiguration;

	constructor( private popoverService: PopoverService ) {
		this.hudConfig1 = new HudPopoverConfiguration( 'hud.key1', "<b>Hud content 1</b><p>Some good content here</p><p>Some more good content here</p>" );
		this.hudConfig2 = new HudPopoverConfiguration( 'hud.key2', "<b>Hud content 2</b><p>Some even better content here</p><p>I know you are enjoying this nice stuff</p>" );
		this.hudConfig3 = new HudPopoverConfiguration( 'hud.key3', `<b>Hud content 3</b><p>niceee</p>` );
		this.hudConfig4 = new HudPopoverConfiguration( 'hud.key4', "<b>Hud Content 4</b><p>Real nice</p>" );

		let popover3Config = new Bootstrap3Configuration( 'test.key3', 'Popover Title3', "Popover content3", Location.TOP, false, 1000 );
		let popover4Config = new Bootstrap3Configuration( 'test.key4', 'Popover Title4', "Popover content4", Location.TOP, false, 1000 );
		let locations = [ Location.TOP, Location.RIGHT, Location.BOTTOM, Location.LEFT ];
		let index = 0;
		this.popoverService.observable( 'test.key3' ).subscribe(
			( event ) => {
				if ( event.action === Action.CLOSE ) {
					if ( index === 4 ) {
						index = 0;
						popover3Config.duration = 1000;
					}
					popover3Config.duration += 500;
					popover3Config.location = locations[ index ];
					popover3Config.content = "Popover content - "+locations[ index ];
					setTimeout( () => {
						this.popoverService.next( 'test.key3', new PopoverEvent( Action.OPEN, ZIBootstrap3PopoverComponent, popover3Config ) );	
					}, 500 );
					index++;
				}
			}
		);
		let index2 = 0;
		this.popoverService.observable( 'test.key4' ).subscribe(
			( event ) => {
				if ( event.action === Action.CLOSE ) {
					if ( index2 === 4 ) {
						index2 = 0;
						popover4Config.duration = 1000;
					}
					popover4Config.duration += 500;
					popover4Config.location = locations[ index2 ];
					popover4Config.content = "Popover content - "+locations[ index2 ];
					setTimeout( () => {
						this.popoverService.next( 'test.key4', new PopoverEvent( Action.OPEN, ZIBootstrap3PopoverComponent, popover4Config ) );
					}, 500 );
					index2++;
				}
			}
		);
			
	}

	public alertConfig() {
		alert( JSON.stringify( this.configuration ) );
	}

	ngAfterViewInit() {
		this.hudConfig1.addSiblings( this.hudSiblings );
		this.hudConfig2.addSiblings( this.hudSiblings );
		this.hudConfig3.addSiblings( this.hudSiblings );
		this.hudConfig4.addSiblings( this.hudSiblings );
	}

}