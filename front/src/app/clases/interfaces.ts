
export interface Move{
   _id: string;
   move: string;
   kills: string;
}

export interface Round{
    Id: string;
    Winner: string;
    Round: string;
    Date: string;
 }

 export interface Game{
    _id: string;    
    nameWin: string;
    nameLose: string;
    round: string;
    date: string;
 }

 export interface Stats{
    _id: string;
    count: number
 }

 export class DataGraph{
    name: string;
    value: number
 }
