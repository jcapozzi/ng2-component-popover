export default {
  entry: './dist/index.js',
  dest: './dist/ng2-component-popover.umd.js',
  format: 'umd',
  moduleName: 'ng2.component.popover',
  globals: {
    '@angular/core': 'ng.core',
	  '@angular/common': 'ng.common',
    'rxjs/BehaviorSubject': 'Rx'
  }
};
