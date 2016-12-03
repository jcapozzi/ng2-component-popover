ng2-component-popover
=========

An angular2 custom component popover with a bootstrap3 implementation.  Focus or click triggering along with programmatic triggering.

install package - *npm i ng2-component-popover --save*

### systemjs

```javascript
{
	"map": {
		'ng2-component-popover': 'npm:ng2-component-popover/bundles/ng2-component-popover.umd.js'
	}
}
```
### usage

---

*zi-popover* - directive for marking an element as the target and assigning target a key

Basic example with programmatic trigger:

```html
<div #target zi-popover="string.key3">
	<span>Target3</span>
</div>
```

```typescript
import {
	PopoverService, PopoverEvent, Action, Location, ZIBootstrap3PopoverComponent,
	Bootstrap3Configuration
} from 'ng2-component-popover';

class ComponentOrServiceWithOpenCloseFunctions {

	constructor( private popoverService: PopoverService ) {}

	open() {
		let config = new Bootstrap3Configuration( 'string.key3', 'Popover Title', "Some content", Location.RIGHT, true, 5000 );
		this.popoverService.next( 'string.key3', new PopoverEvent( Action.OPEN, ZIBootstrap3PopoverComponent, config ) );
	}

	close() {
		this.popoverService.next( 'string.key3', new PopoverEvent( Action.CLOSE ) );
	}
}
```

Inputs:

*[zi-popover-trigger]="triggerRef"* - assign trigger to popover target for event triggering

```typescript
triggerRef: Trigger = Trigger.CLICK;
```

Trigger Types
```typescript
Trigger.CLICK
Trigger.FOCUSED
```

*[zi-popover-configuration]="configurationRef"* - assign configuration to popover target for describing default popover

```typescript
configurationRef: PopoverConfiguration = new Bootstrap3Configuration( 'string.key3', 'Popover Title', "Popover content string", Location.LEFT, false, 5000 );
```
Locations
```typescript
Location.TOP
Location.RIGHT
Location.BOTTOM
Location.LEFT
```

*Bootstrap3Configuration* constructor params:

1.  *key* - string: key of popover target
2.  *title* - string: title of popover
3.  *content* - string: content of popover
4.  *location* - Location: location of popover
5.  *closer* - boolean: should include close button in footer
6.  *duration* - number: milliseconds to show popover before closing

*[zi-popover-ref]="popoverRef"* - assign target a popover component refrence to use when triggered

Example:

```html
<div #target zi-popover="key.123" [zi-popover-ref]="popoverRef">
	<span>Target</span>
</div>

<zi-bootstrap3-popover [target]="targetRef">
	<h3>Content that is projected into popover content</h3>
</zi-bootstrap3-popover>
```

```typescript
@ViewChild( 'target' )
private targetRef: ElementRef;

@ViewChild( ZIBootstrap3PopoverComponent )
private popoverRef: ZIBootstrap3PopoverComponent;
```
  
---

*zi-bootstrap3-popover* component as bootstrap3 popover implementation with content projection

```html
<zi-bootstrap3-popover [target]="targetRef">
	<span class="btn btn-default" (click)="alertConfig();">Alert Config</span>
</zi-bootstrap3-popover>
```
---

### demo

demo app shows working click, focus and programmatic popovers as well as a custom hud extension

clone repo - *git clone https://github.com/jcapozzi/ng2-component-popover.git*

*npm install* - for developing on module

cd demo => *npm install* - install demo app

cd demo => *npm run start* - start demo app lite server

*gulp install:demo* - to install local changes to demo app instead of using npm published version

