import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BackService } from '../../services/services';
import { Move, Round } from  '../../clases/interfaces';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import 'style-loader!./game.scss';

@Component({
  selector: 'game',
  templateUrl: './game.html',
  providers: [BackService, ToasterService]
})

  export class GameComponent implements OnInit {
 
    round: number = 1;
    moveSelected: string = "";
    status: any = '';
	error: string = '';
    isLoading: boolean = true;
    options:  Array<Move> = [];
    rounds:  Array<Round> = [];
    currentPlayer = "";
    player1 = "";
    player2 = "";

    config: ToasterConfig;

    position = 'toast-top-center';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

    settings = {
        actions: false,
        noDataMessage: '',
        pager : {
            display: true,
            perPage: 4
        },
        columns: {
          Round: {
            title: 'Round'
          },
          Winner: {
            title: 'Winner'
          }
        }
      };


    constructor(private router: Router, 
        private backService: BackService,
        private toasterService: ToasterService) { }
 
    ngOnInit() {

        if (localStorage.getItem("player1") === null || localStorage.getItem("player2") === null)
        {
            this.router.navigate(['home']);
        }

        // Load players name
        this.player1 = localStorage.getItem("player1");
        this.player2 = localStorage.getItem("player2");

        // Load moves array
        this.backService.GetMoves().subscribe((data:  Array<Move>) => {

            this.options  =  data;
            this.moveSelected = this.options[0].move;
            this.reloadData();

        }, e => this.error = e, () => this.isLoading = false);
    }

    callType(value: any){
        this.moveSelected = value;
    }

    reloadData()
    {
        if (localStorage.getItem("currentPlayer") === "player1")
        {
            this.currentPlayer = this.player1;
        }else
        {
            this.currentPlayer = this.player2;
        }
    
        this.round = +localStorage.getItem("round");
        let gameId =localStorage.getItem("gameId");
        this.moveSelected = this.options[0].move;
        this.backService.GetRounds(gameId).subscribe((data:  Array<Round>) => {
            this.rounds  =  data;
        }, e => this.error = e, () => this.isLoading = false);

    }

go(){

    if (localStorage.getItem("currentPlayer") === "player1")
    {
        localStorage.setItem("player1Move", this.moveSelected);
        localStorage.setItem("currentPlayer", "player2");
        this.reloadData();

    }else
    {      
        let player1Move = localStorage.getItem("player1Move");
        let player2Move = this.moveSelected;
        let gameId = localStorage.getItem("gameId");
        var now = new Date().toISOString();
        if (player1Move === player2Move) // Tie
        {

            this.backService.AddRound(gameId, this.round.toString(), "Tie", now).subscribe(() => {

                localStorage.setItem("currentPlayer", "player1");
                this.round = this.round + 1;
                localStorage.setItem("round", this.round.toString());
                this.reloadData();
                this.showToast('default', '', 'It\'s a tie round!');

            }, e => this.error = e, () => this.isLoading = false);

        }else
        {
            let firstAction = this.options.filter(x => x.move === player1Move && x.kills === player2Move);
            if (firstAction.length > 0) // player 1 wins
            {

                this.backService.AddRound(gameId, this.round.toString(), this.player1, now).subscribe(() => {

                    let player1Wins = this.rounds.filter(x => x.Winner === this.player1);
                    if (player1Wins.length < 2){

                        localStorage.setItem("currentPlayer", "player1");
                        this.round = this.round + 1;
                        localStorage.setItem("round", this.round.toString());
                        this.reloadData(); 
                        this.showToast('default', '', this.player1 + ' wins the round!');
                    }else // winner
                    {

                        this.backService.AddGame(this.player1, this.player2, this.round.toString(), now).subscribe(() => {

                            localStorage.setItem("winnerPlayer", this.player1);
                            this.router.navigate(['victory']);

                        }, e => this.error = e, () => this.isLoading = false);
                    } 
                }, e => this.error = e, () => this.isLoading = false);

            }else  
            {
                let secondAction = this.options.filter(x => x.move === player2Move && x.kills === player1Move);
                if (secondAction.length > 0) // player 2 wins
                {

                    this.backService.AddRound(gameId, this.round.toString(), this.player2, now).subscribe(() => {

                        let player2Wins = this.rounds.filter(x => x.Winner === this.player2);
                        if (player2Wins.length < 2){

                            localStorage.setItem("currentPlayer", "player1");
                            this.round = this.round + 1;
                            localStorage.setItem("round", this.round.toString());
                            this.reloadData();
                            this.showToast('default', '', this.player2 + ' wins the round!');
                        }else // winner
                        {

                            this.backService.AddGame(this.player2, this.player1, this.round.toString(), now).subscribe(() => {

                                localStorage.setItem("winnerPlayer", this.player2);
                                this.router.navigate(['victory']);
                                
                            }, e => this.error = e, () => this.isLoading = false);
                        }
                    }, e => this.error = e, () => this.isLoading = false);
                
                }else // undefined move
                {
                    this.backService.AddRound(gameId, this.round.toString(), "No player wins", now).subscribe(() => {

                        localStorage.setItem("currentPlayer", "player1");
                        this.round = this.round + 1;
                        localStorage.setItem("round", this.round.toString());
                        this.reloadData();
                        this.showToast('default', '', 'No player wins!');

                    }, e => this.error = e, () => this.isLoading = false);
                }
            }
        }   
    }
}

    private showToast(type: string, title: string, body: string) {
        this.config = new ToasterConfig({
          positionClass: this.position,
          timeout: this.timeout,
          newestOnTop: true,
          tapToDismiss: true,
          preventDuplicates: false,
          animation: this.animationType,
          limit: this.toastsLimit,
        });
        const toast: Toast = {
          type: type,
          title: title,
          body: body,
          timeout: this.timeout,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      }
 
}



