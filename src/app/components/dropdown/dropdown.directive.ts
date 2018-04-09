import {
  AfterContentInit,
  ContentChildren,
  Directive,
  QueryList,
  Renderer2,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  Host,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dropdown]'
})
export class DropdownDirective implements AfterContentInit, OnInit {


  private isOpen = false;
  @Input()
  public isSubMenu = false;
  private hasBeenClicked = false;
  @ContentChildren(DropdownDirective) dropDownChildren: QueryList<DropdownDirective>;

  constructor(@Host() private hostRef: ElementRef, private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // console.log("directive running")
    // console.log(this.hostRef.nativeElement.tagName);
    // hostRef refers to the tag that contains the directive attribute, in this case ASIDE
    // hostRef and elRef above are identical @Host lets you explictly mark the host element

  }

  @HostListener('click', ['$event']) clickAction(eventData: MouseEvent) {
    //  console.log("my children "+this.dropDownChildren.length)
    const targetMenuUL: HTMLElement = this.getImmediateMenu();
    // the element is an aside with text and nextSibling is the text node
    this.hasBeenClicked = true; // will be set to false in menu.directive

    if (this.isOpen) {
      this.renderer.removeClass(targetMenuUL, 'show');
      this.isOpen = false;
    } else {
      this.renderer.addClass(targetMenuUL, 'show');
      this.isOpen = true;
    }
    // console.log(`in dropdown open is ${this.isOpen} event ${eventData}`)
    // if (this.isSubMenu) {
    //  eventData.stopPropagation();
    // }

  }
  /**
   * find the ul submenu beneath this <aside> tag
   *
   */
  getImmediateMenu(): HTMLElement {

    const targetMenuUL: HTMLElement = this.renderer.nextSibling(this.elRef.nativeElement);
    if (!targetMenuUL) {
      return null;
    }

    if (targetMenuUL.tagName && targetMenuUL.tagName.toUpperCase() === 'UL') {
      return targetMenuUL;
    }
    return this.renderer.nextSibling(targetMenuUL);
  }

  public isClicked(): boolean {
    return this.hasBeenClicked;
  }

  public setClicked(t: boolean) {
    this.hasBeenClicked = t;
  }

  public getIsOpen(): boolean {
    return this.isOpen;
  }

  public closeThis() {
    const targetMenuUL: HTMLElement = this.getImmediateMenu();
    //   console.log("in close this 1");
    if (this.isOpen) {
      this.renderer.removeClass(targetMenuUL, 'show');
      this.isOpen = false;
    }
    this.hasBeenClicked = false;
  }


  ngAfterContentInit() {
    // this is where content children will first be available


  }

}
