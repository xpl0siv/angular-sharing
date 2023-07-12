import {
  Directive,
  effect,
  ElementRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApproveDirective } from './approve.directive';

class MockElementRef implements ElementRef {
  nativeElement = document.createElement('input');
}

describe('ApproveDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();
  });

  it('created', () => {
    TestBed.runInInjectionContext(() => {
      let d = new ApproveDirective(new MockElementRef());
      expect(d).toBeTruthy();
    });
  });

  it('Emit Signal', () => {
    TestBed.runInInjectionContext(() => {
      let d = new ApproveDirective(new MockElementRef());
      let signalRef: WritableSignal<string> = signal('clazz_signal--default');
      d.childSignalControl.subscribe(($signal) => {
        let parentComponent = new AppComponent();
        parentComponent.childSignalControl = $signal;
        parentComponent.changeSignal();
        expect(signalRef()).toBe('clazz_signal--valid');
      });
      d.childSignalControl.emit(signalRef);
    });
  });
});
