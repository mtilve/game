import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BackService } from '../../services/services';
import 'style-loader!./home.scss';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  providers: [BackService]
})

  export class HomeComponent implements OnInit {
 
    submitted:boolean = false;
    registerForm: FormGroup;
    status: any = '';
	error: string = '';
    isLoading: boolean = true;
    same: boolean = false;

 
    constructor(private formBuilder: FormBuilder,  
                private router: Router,
                private backService: BackService) { }
 
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            player1: ['', [Validators.required,
                Validators.minLength(4),
                Validators.maxLength(45)]],
            player2: ['', [Validators.required, 
                Validators.minLength(4),
                Validators.maxLength(45)]]
        });
    }
 
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
 
    onSubmit() {
        this.submitted = true;
        this.same = false;
 
        if (this.registerForm.invalid) {
            return;
        }

        if (this.f.player1.value === this.f.player2.value){
            this.same = true;
            return;
        }
        
        localStorage.setItem("player1", this.f.player1.value);
        localStorage.setItem("player2", this.f.player2.value);

        // random id
        let Id = Math.random().toString(36).slice(2);
        localStorage.setItem("gameId", Id);
        localStorage.setItem("round", "1");
        localStorage.setItem("currentPlayer", "player1");

        this.router.navigate(['game']);
    
    }

    onKey(event){
        this.same = false;
    }

}

