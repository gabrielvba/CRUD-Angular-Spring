import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name','category','actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    public dialog: MatDialog
    ) {
    this.courses$ = this.coursesService.list()
    .pipe(catchError( _error => {
      this.onError('Erro ao carregar cursos');
      return of([]) })
      );
   }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMsg,
    });
  }

  onAdd(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}


