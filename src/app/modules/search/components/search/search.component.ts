import { AfterViewInit, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent,  Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('search') searchElement: any;
  search: string='';
  @Input() searchPlaceholder: string='';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  searchSubs: Subscription = new Subscription;

  @Input() clear: number = 0;

  constructor(
    private $renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startSearch();
  }

  private startSearch(): void {
  this.searchSubs =  fromEvent<any>(this.searchElement.nativeElement, 'input').pipe(
      debounceTime(500),
    ).subscribe(event => {
      this.search = event.target.value;
      if (this.search && this.search.trim()) {
        this.onSearch.emit(this.search);
      }
      if (!this.search) {
        this.onSearch.emit(this.search);
      }
    });
  }


  clearValue(){
    // console.log('hey');
    
    this.$renderer.setProperty(this.searchElement.nativeElement, 'value', '');
  }

  ngOnChanges(): void {
    if(this.clear){
      console.log('clear', this.clear);
      
      this.clearValue();
      this.clear = 0;
    }
  }


  ngOnDestroy(): void {
    if(this.searchSubs){
      this.searchSubs.unsubscribe();
    }
  }



}


