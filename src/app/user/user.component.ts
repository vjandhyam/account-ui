import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from './shared/user.service';
import {User} from './shared/user.model'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  userTypes: string[] = ['INDIVIDUAL', 'BUSINESS'];

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getUsersList();
  }

  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.userService.selectedUser={
      id:null,
      firstName:'',
      lastName:'',
      emailId:'',
      phoneNum:'',
      userType:this.userTypes[0]
    }
  }

  onSubmit(form:NgForm)
  {
    if(form.value.userId == null){
    this.userService.postUser(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.userService.getUsersList();
    })
  }
  else
  {
    this.userService.putUser(form.value.userId,form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.userService.getUsersList();
    })
  }
  }

  editRecord(stud:User)
  {
  this.userService.selectedUser = Object.assign({},stud);
  }

  onDelete(id:number)
  {
    if(confirm('Are you sure to delete this record?')==true)
    this.userService.deleteUser(id)
    .subscribe(x =>{
  this.userService.getUsersList();
    })
  }
}

