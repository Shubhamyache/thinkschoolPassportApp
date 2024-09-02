import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UsersDetails } from '../../../models/usersDetails';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  allusers:UsersDetails[] = [];
  constructor(private modalService: NgbModal,private apiService: ApiService){

  }
  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers(): void {
    console.log("in get all users");
      this.apiService.getAllUsers().subscribe((data: UsersDetails[]) => {
      this.allusers = data;
      console.log(data);
      // this.applySearchFilter();
    });
    // this.subscriptions$.add(getAllData$);
  }

  editUserDetails(email: string){
    if (this.allusers.find((d) => d.email === email)) {
      const modalRef = this.modalService.open(UserModalComponent, { centered: true });
      modalRef.componentInstance.existingEmail = email;
    }
  }

  deleteUser(email: string){
    const data = this.allusers.find((d) => d.email === email);
    // this.apiService.deleteUserByEmail(email).subscribe();
    if (data) {
      Swal.fire({
        title: 'Delete Business Data?',
        text: `Are you sure you want to delete '${data.firstName}'?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteBusinessData$ = this.apiService.deleteUserByEmail(email).subscribe(() => {
            // this.businessData = this.businessData.filter((d) => d.id !== id);
            // this.filteredbusinessData = this.filteredbusinessData.filter((d) => d.id !== id);
            Swal.fire(
              'Deleted!',
              `'${data.firstName}' has been deleted.`,
              'success'
            );
            this.getAllUsers(); 
          });
         
        }
      });
    }
  }
}
