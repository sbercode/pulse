package com.github.sbercode.pulse.service;

import com.github.sbercode.pulse.model.Post;

import java.util.List;

public interface PostService {

    Post create(Post post);

    Post edit(Post post);

    List<Post> getAll();

    Post getById(String id);

    void delete(String id);

}
