package com.github.sbercode.pulse.controller;

import com.github.sbercode.pulse.model.Post;
import com.github.sbercode.pulse.service.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

    private final PostService postService;

    @PostMapping("/posts")
    public Post create(@RequestBody Post post) {
        log.info("Create: {}", post);
        return postService.create(post);
    }

    @PutMapping("/posts")
    public Post edit(@RequestBody Post post) {
        log.info("Update: {}", post);
        return postService.edit(post);
    }

    @GetMapping("/posts")
    public List<Post> getAll() {
        log.info("Get all posts.");
        return postService.getAll();
    }

    @GetMapping("/posts/{id}")
    public Post getById(@PathVariable String id) {
        log.info("Get the post by id: {}.", id);
        return postService.getById(id);
    }

    @DeleteMapping("/posts/{id}")
    public void delete(@PathVariable String id) {
        log.info("Delete the post by id {}.", id);
        postService.delete(id);
    }

    @GetMapping("/posts/{id}/like")
    public Post like(@PathVariable String id) {
        return postService.like(id);
    }

    @GetMapping("/posts/{id}/unlike")
    public Post unlike(@PathVariable String id) {
        return postService.unlike(id);
    }
}
