import { Component, OnChanges, Input } from '@angular/core';
@Component({
  selector: 'app-star',
  templateUrl: './star.component.html'
})
export class StarComponent implements OnChanges {
    @Input() score: number;
    @Input() rateCount: number;
    star:any[];
    starBorder:any[];
    numberStar:number;
  constructor() { }
    ngOnChanges(): void {
        if(this.rateCount !=0){
            this.numberStar = Math.round(this.score / this.rateCount);
        }
        else {
            this.numberStar = 0;
        }
        if(this.numberStar>5){
            this.numberStar = 5;
        }
        this.star = Array(this.numberStar).fill(1);
        this.starBorder = Array(5 - this.numberStar).fill(0);
    }  
}
