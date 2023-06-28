import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


interface Cards {
  color: string,
  valor: Number,
  parrf: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex)
  }

}
