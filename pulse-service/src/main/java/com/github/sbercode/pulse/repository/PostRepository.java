package com.github.sbercode.pulse.repository;

import com.github.sbercode.pulse.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    @Override
    List<Post> findAll();
}
