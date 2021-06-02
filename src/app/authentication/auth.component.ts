import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
selector: 'auth-component',
templateUrl: './auth.component.html'
})
export class AuthComponent{
login = true;

    switch(){
        this.login = !this.login;
    }

    onSubmit(form: NgForm){
        console.log(form.value);
        form.reset();
    }
}