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
import { DropdownDirective } from 'app/components/dropdown/dropdown.directive';

@Directive({
  selector: '[menu]'
})
export class MenuDirective implements AfterContentInit, OnInit {

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();
  @ContentChildren(DropdownDirective) dropdownChildren: QueryList<DropdownDirective>;

  constructor() {


  }


  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    this.clickOutside.emit(event);

    if (this.handleSubMenuClick()) {
      this.clearClickMarkers();
      return;
    }

    // handle the case where the click is somewhere besides the menu system ////////////////////
    if (this.handleClickOutsideTheMenuSystem()) {
      this.clearClickMarkers();
      return;
    }
    // console.log("moving to top level")
    ////////////////////////////////////////////////////////////////////////////////////////////
    // handle the case where the click is inside  the menu system  at the top level ////////////////////
    if (this.handleTopLevelClick()) {
      this.clearClickMarkers();
      return;
    }


  }

  clearClickMarkers() {
    // no matter what reset each menu item to not being clicked once processing is done
    this.dropdownChildren.forEach(c => {
      c.setClicked(false);
    })
  }

  /**
   * if you clicked on a submenu link then do nothing
   */
  handleSubMenuClick() {
    const clickedItems: DropdownDirective[] = this.dropdownChildren.filter(c => {



      return (c.isClicked() && (c.isSubMenu === true));

    });
    if (clickedItems && clickedItems.length === 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * if there is only one menu open do nothing
   * else close those that are not marked as clicked
   */
  handleTopLevelClick(): boolean {
    let handledEvent = false;
    const menuItemsOpen: DropdownDirective[] =
      this.dropdownChildren.filter(c => {


        return (c.getIsOpen());

      });

    if (menuItemsOpen && menuItemsOpen.length === 1) {
      return true;
    }
    if (menuItemsOpen && menuItemsOpen.length > 1) {


      menuItemsOpen.forEach(c => {
        if (!c.isClicked()) {
          c.closeThis();
        }

      });
      handledEvent = true;
    }
    return handledEvent;
  }

  /**
   * you know you clicked outside because no dropdown item has
   * isClicked = true
   */
  handleClickOutsideTheMenuSystem(): boolean {
    let handledEvent = false;

    const menuItemsClicked: DropdownDirective[] =
      this.dropdownChildren.filter(c => {
        return c.isClicked();

      });

    if (menuItemsClicked && menuItemsClicked.length === 0) {
      // you clicked outside the window so blow everything off
      // console.log("didn't find any item clicked")
      this.dropdownChildren.forEach(c => {
        c.closeThis();
      })
      handledEvent = true;
    }

    return handledEvent;
  }




  ngOnInit() {
    // console.log("ngInit menu")
  }

  ngAfterContentInit() {
    // this is where content children will first be available



  }


}
