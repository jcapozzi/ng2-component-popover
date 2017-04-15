export default {
  entry: './dist/index.js',
  dest: './dist/ng2-component-popover.umd.js',
  format: 'umd',
  moduleName: 'ng2.component.popover',
  globals: {
    '@angular/core': 'ng.core',
	  '@angular/common': 'ng.common',
    '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
    'rxjs/BehaviorSubject': 'Rx'
  }
};
