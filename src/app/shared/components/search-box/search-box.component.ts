import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSuscription?: Subscription

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer.pipe(debounceTime(1000)).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  public emitValue(value: string): void {
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
