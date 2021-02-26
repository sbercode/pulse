package com.github.sbercode.pulse.service.impl;

import com.github.sbercode.pulse.model.Post;
import com.github.sbercode.pulse.repository.PostRepository;
import com.github.sbercode.pulse.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post create(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post edit(Post post) {
        if (!postRepository.existsById(post.getId())) {
            throw new RuntimeException("Post was not found for edit");
        }
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    @Override
    public Post getById(String id) {
        if (postRepository.findById(id).isEmpty()) {
            throw new RuntimeException("Post was not found for read");
        }
        return postRepository.findById(id).get();
    }

    @Override
    public void delete(String id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post was not found for delete");
        }
        postRepository.deleteById(id);
    }
}
