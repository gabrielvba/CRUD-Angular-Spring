package com.gabriel.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.gabriel.model.Course;
import com.gabriel.repository.CourseRepository;

import exception.RecordNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;

    CourseService(CourseRepository courseRepository){
    	this.courseRepository = courseRepository;
    }
    
    public List<Course> list(){
        return courseRepository.findAll();
    }
    
    public Course findById(@NotNull @Positive Long id){
        return courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }
    
    public Course createCourse(@Valid Course course) {
    	return courseRepository.save(course);
    }
    
    public Course update(@NotNull @Positive Long id,
    		@Valid Course course) {
        return courseRepository.findById(id)
        		.map(recordFound -> {
	        		recordFound.setName(course.getName());
	        		recordFound.setCategory(course.getCategory());
	        		return  courseRepository.save(recordFound);
        		}).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id) {
        courseRepository.delete(courseRepository.findById(id)
        	.orElseThrow(() -> new RecordNotFoundException(id)));
    }

}
