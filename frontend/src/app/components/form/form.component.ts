import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public user: any;
  constructor() {
    this.user = {
      name: '',
      lastName: '',
      gender: ''
    }
   }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(this.user.name+'\n'+this.user.lastName+'\n'+this.user.gender);
    console.log(this.user)
  }

}
