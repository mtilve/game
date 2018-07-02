import { Injectable } from '@angular/core';
import { Response, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BackService{


constructor(private http : HttpClient){}


private urlRounds: string = 'http://localhost:8080/api/rounds';
private urlMoves: string = 'http://localhost:8080/api/moves';
private urlGames: string = 'http://localhost:8080/api/games';
private urlStats: string = 'http://localhost:8080/api/stats';
private urlStatsWinCant: string = 'http://localhost:8080/api/statswincant';
private urlStatsWinDay: string = 'http://localhost:8080/api/statswinday';


// Moves
GetMoves(){
  return this.http.get(this.urlMoves);
}

AddMove(move: string, kills: string){

  var  body  = {
    move:  move,
    kills:  kills
  };

  return  this.http.post(this.urlMoves, body);
}

RemoveMove(_id: string){

  return  this.http.delete(this.urlMoves + '/' + _id);
}

UpdateMove(body: any){

  return  this.http.put(this.urlMoves, body);
}

// Rounds
AddRound(gameId: string, round: string, winner: string, now: string){

  var  body  = {
    Id:  gameId,
    Winner:  winner,
    Round:  round,
    Date:  now
  };

  return  this.http.post(this.urlRounds, body);
}

GetRounds(gameId: string){
  return this.http.get(this.urlRounds + "/" + gameId);
}

// Games

AddGame(nameWin:string, nameLose: string, round: string, now: string){

  var  body  = {
    nameWin:  nameWin,
    nameLose: nameLose,
    round:  round,
    date:  now
  };

  return  this.http.post(this.urlGames, body);
}

GetGames(){
  return this.http.get(this.urlGames);
}

GetTopWinners(type: number){
  return this.http.get(this.urlStats + "/" + type);
}

GetWinners(){
  return this.http.get(this.urlStatsWinCant);
}

GetWinnersByDay(){
  return this.http.get(this.urlStatsWinDay);
}

  
// Util ----------------------------------->
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  private extractData(res: Response) {
      let body = res.json();
      return body || { };
  }

  private getHeadersJson(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private getHeadersXwww(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers.toJSON);
    return headers;

  }


}// class
