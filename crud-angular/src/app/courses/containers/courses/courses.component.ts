import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

    ) {
    this.courses$ = this.coursesService.list()
    .pipe(catchError( (_error: any) => {
      this.onError('Erro ao carregar cursos');
      return of([]) })
      );
   }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError( error => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onRemove(course: Course) {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover esse curso?'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.coursesService.remove(course._id).subscribe(
            () => {
              this.refresh();
              this._snackBar.open('Curso removido com sucesso!', 'x', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              })
            },
            error => this.onError('Erro ao tentar remover curso.')
          );
        }
      });
 }



}


