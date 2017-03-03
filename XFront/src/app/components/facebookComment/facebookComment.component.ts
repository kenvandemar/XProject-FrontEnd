import { Component, Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-facebookComment',
  template: '<div class="fbComment" style="margin:auto;" [innerHtml]=fbcomment></div>'
})
export class FacebookComment implements OnChanges{
    @Input() router:string;
    @Input() param:string;
    href:string;
    numposts = 5;
    fbcomment:string;
  constructor() {}

  ngOnChanges(): void {
    this.href = "http://xtale.net/"+this.router+"/"+this.param;
    this.fbcomment = '<div class="fb-comments" data-href="'
                  +this.href
                  +'" data-width="100%" data-numposts="'
                  +this.numposts+'"></div>';
  }  
}
