import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from 'src/app/courses/model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name:['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
    category: ['', [Validators.required]]
  });


  constructor( private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
      .subscribe(result => this.onSucess(), error => {
        this.onError();
    });
  }

  onCancel(){
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar curso', '', {duration: 5000});
  }

  private onSucess() {
    this._snackBar.open('Curso salvo com sucesso', '', {duration: 5000});
    this.onCancel();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if(field?.hasError('minlength')) {
      const requiredLenght = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLenght} caracteres.`;
    }
    if(field?.hasError('maxlength')) {
      const requiredLenght = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo precisa ser de ${requiredLenght} caracteres.`;
    }
    return 'Campo inválido';
  }
}
