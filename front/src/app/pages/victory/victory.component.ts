import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'victory',
  templateUrl: './victory.html',
})

  export class VictoryComponent implements OnInit {
 
    winnerPlayer : string = "";

    constructor(private router: Router) { }
 
    ngOnInit() 
    {   
      this.winnerPlayer = localStorage.getItem("winnerPlayer");
    }

    return()
    {
      localStorage.clear();
      this.router.navigate(['home']);
    }

 
}

