package com.gabriel.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gabriel.model.Course;
import com.gabriel.repository.CourseRepository;
import com.gabriel.service.CourseService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    
    public CourseController(CourseRepository courseRepository, CourseService courseService){
        this.courseService = courseService;

    }

    @GetMapping
    public List<Course> list(){
        return courseService.list();
    }
    
    @GetMapping("/{id}")
    public Course findById(@PathVariable @NotNull @Positive Long id){
        return courseService.findById(id);
    }
    
    //@RequestMapping(method =  RequestMethod.POST)
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course createCourse(@RequestBody @Valid Course course) {
    	return courseService.createCourse(course);
    }
    
    @PutMapping("/{id}")
    public Course update(@PathVariable @NotNull @Positive Long id,
    		@RequestBody Course course) {
        return courseService.update(id, course);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
    	courseService.delete(id);
    }

}  
