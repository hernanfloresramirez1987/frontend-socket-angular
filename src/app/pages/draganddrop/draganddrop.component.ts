import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';

interface Cards {
  color: string,
  valor: Number,
  parrf: string
}

@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrls: ['./draganddrop.component.scss']
})
export class DraganddropComponent {

  cards: Cards[] = [
    {
      color: "bg-info",
      valor: 150,
      parrf: "New Orders"
    },
    {
      color: "bg-success",
      valor: 53,
      parrf: "Bouncsssse Rate"
    },
    {
      color: "bg-warning",
      valor: 44,
      parrf: "User Registrations"
    },
    {
      color: "bg-danger",
      valor: 65,
      parrf: "Unique Visitors"
    },
  ]
  text: string[]=[]
  //all = [1, 2, 3, 4];
  //even = [10];

  /*drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex)
  }*/
  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados', 'Oranges', 'Bananas', 'Cucumbers'];

  basket = [''];
  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
  /////////////////
  @ViewChild('editor') editor!: any;
  description: string = "<p><b>Lorem ipsum</b> dolor sit amet, <s>consectetur adipiscing elit</s>, sed do eiusmod tempor <u>incididunt</u> ut labore et dolore <i>magna aliqua</i>.";

  setStyle(style: string) {
    let bool = document.execCommand(style, false);
  }

  onChange() {
    console.log(this.editor.nativeElement["innerHTML"]);
  }
  addTxt() {
    console.log(this.editor)
    this.text.push('<p>abcd</p>')
    console.log(this.text)
  }
}
