import { Component } from '@angular/core';
import { Task } from "../interfaces/task";
import { v4 as uuid } from "uuid";
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { GuidedTour } from 'src/interfaces/GuidedTourInterfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  isDark: boolean = true;
  newTaskName: string = "";
  tasks: Array<Task> = [];
  displayTasks: Array<Task> = [];
  filterActive: string = "all";
  itemsLeft: number = 0;
  
  public tour: GuidedTour = {
    tourId: 'Tour TODO APP',
    useOrb: true,
    steps: [
        {
            title: 'Welcome to TODO APP',
            selector: 'header h1',
            content: 'An app for managing your tasks in the most efficient way',
            orientation: Orientation.Bottom
        },
        {
            title: 'Change theme',
            selector: 'header img',
            content: 'To change the theme, you have to press the button and it will change to dark or light mode',
            orientation: Orientation.Left
        },
        {
            title: 'Add a new Task',
            selector: '.input-container',
            content: 'To add a new task, just type in the name of the task and press enter to add it.',
            orientation: Orientation.Bottom
        },
        {
            title: 'Tasks loaded',
            selector: '.list-wrapper',
            content: 'All the tasks that are loaded will be displayed here.',
            orientation: Orientation.Bottom
        },
        {
            title: 'Tasks not finished',
            selector: '.list-footer > p',
            content: 'This displays the numbers of tasks that has not been completed yet.',
            orientation: Orientation.Bottom
        },
        {
            title: 'Filter tasks',
            selector: '.list-footer__filter',
            content: 'You can filter the tasks by there status.',
            orientation: Orientation.Bottom
        },
        {
            title: 'Delete all tasks',
            selector: '.list-footer button',
            content: 'To delete all tasks press this button',
            orientation: Orientation.Bottom
        },
        {
            title: 'Enjoy!',
            content: 'Enjoy using the app and have fun managing your tasks in an amazing way.',
        }
    ]
};

  constructor(private guidedTourService: GuidedTourService){
    setTimeout(() => {
        this.guidedTourService.startTour(this.tour);
    }, 1000);
  }
  
  changeTheme(): void{
    this.isDark = !this.isDark;
  }

  addTask(): void{

    const newTask: Task = {
      id: uuid(),
      title: this.newTaskName,
      hasCompleted: false
    };

    this.tasks.push(newTask);
    this.displayTasks = [...this.tasks];
    
    this.newTaskName = "";
    this.changeItemsLeft();
  }

  toggleCompleted(id: string){
    this.tasks = this.tasks.map((item: Task) => {
      if(item.id === id){
        item.hasCompleted = !item.hasCompleted;
      }

      return item;    
    });
    
    this.changeItemsLeft();
  }

  changeItemsLeft(){
    this.itemsLeft = this.tasks.filter((item: Task) => item.hasCompleted === false).length;
  }

  filterTasks(filterStatement: string){

    this.filterActive = filterStatement;

    switch(filterStatement){
      case "all":
        this.displayTasks = [...this.tasks];
        break;
      case "active":
        this.displayTasks = this.tasks.filter((item: Task) => item.hasCompleted === false);
        break;
      case "completed":
        this.displayTasks = this.tasks.filter((item: Task) => item.hasCompleted === true);
        break;
    }
  }

  clearTasks(){
    this.tasks = [];
  }

}
