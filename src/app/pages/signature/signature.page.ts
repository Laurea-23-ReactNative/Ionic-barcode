import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  heartType: string = "heart-outline";

    ngOnInit(){
      console.log()
    }

    toggleHeart(){
      this.heartType = this.heartType == "heart" ? "heart-outline" : "heart"
    }
}
