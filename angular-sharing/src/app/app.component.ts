import { Component, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular-sharing';
  clazzToggle: boolean = false;

  childSignalControl!: WritableSignal<string>;

  captureSignalControl($signal: any) {
    this.childSignalControl = $signal;
  }

  changeInputValue($event: any) {
    console.log('writing...');
    console.log(this.childSignalControl);
    if (this.childSignalControl)
      this.childSignalControl.set('clazz_signal--default');
  }

  changeSignal() {
    this.clazzToggle = !this.clazzToggle;
    if (this.childSignalControl) {
      const $clazz =
        'clazz_signal--' + (this.clazzToggle ? 'valid' : 'invalid');
      this.childSignalControl.set($clazz);
    }
  }
}
