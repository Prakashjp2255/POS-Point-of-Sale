import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice/authservice.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userProfile: any = {};
    name: any;

    constructor(private AuthserviceService: AuthserviceService) {} 
    ngOnInit(): void {

      if (this.userProfile.valid){

        this.name = this.userProfile.name; 
      }

        this.AuthserviceService.getUserProfile().subscribe(
            (data: any) => {
                this.userProfile = data;
            },
            (error: any) => {
                console.error('Error fetching user profile:', error);
            }
        );
    }
}
