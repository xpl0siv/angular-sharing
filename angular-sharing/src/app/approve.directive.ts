import {
  Directive,
  effect,
  EffectRef,
  ElementRef,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

@Directive({
  selector: '[approve]',
})
export class ApproveDirective {
  private effectRef!: EffectRef;

  private removeClazzDefault: string[] = [
    'clazz_signal--invalid',
    'clazz_signal--valid',
  ];
  private removeClazzInvalid: string[] = [
    'clazz_signal--default',
    'clazz_signal--valid',
  ];
  private removeClazzValid: string[] = [
    'clazz_signal--invalid',
    'clazz_signal--default',
  ];

  @Output() childSignalControl: EventEmitter<WritableSignal<string>> =
    new EventEmitter();

  private signalRef: WritableSignal<string> = signal('clazz_signal--default');

  constructor(private el: ElementRef) {
    this.effectRef = effect(() => {
      this.applyClazz();
    });
  }

  ngOnInit() {
    this.childSignalControl.emit(this.signalRef);
  }

  applyClazz(): string {
    const $signal = this.signalRef();
    switch ($signal) {
      case 'clazz_signal--default':
        this.el.nativeElement.classList.remove(...this.removeClazzDefault);
        this.el.nativeElement.classList.add($signal);
        break;
      case 'clazz_signal--invalid':
        this.el.nativeElement.classList.remove(...this.removeClazzInvalid);
        this.el.nativeElement.classList.add($signal);
        break;
      case 'clazz_signal--valid':
        this.el.nativeElement.classList.remove(...this.removeClazzValid);
        this.el.nativeElement.classList.add($signal);
        break;
      default:
        console.log('Signla not found: %s', $signal);
    }
    return $signal;
  }

  ngOnDestroy() {
    this.effectRef.destroy();
  }
}
