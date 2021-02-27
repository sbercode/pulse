package com.github.sbercode.pulse.service.impl;

import com.github.sbercode.pulse.model.Post;
import com.github.sbercode.pulse.repository.PostRepository;
import com.github.sbercode.pulse.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post create(Post post) {
        post.setCreationDate(new Date().getTime());
        post.setModificationDate(new Date().getTime());
        return postRepository.save(post);
    }

    @Override
    public Post edit(Post post) {
        if (!postRepository.existsById(post.getId())) {
            throw new RuntimeException("Post was not found for edit");
        }
        post.setModificationDate(new Date().getTime());
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

    @Override
    public Post like(String id) {
        Post post = getStoredPostByIdOrThrow(id);
        long likesCount = post.getLikesCount();
        post.setLikesCount(++likesCount);
        return postRepository.save(post);
    }

    @Override
    public Post unlike(String id) {
        Post post = getStoredPostByIdOrThrow(id);
        long likesCount = post.getLikesCount();
        if (likesCount <= 0) {
            post.setLikesCount(0);
        } else {
            post.setLikesCount(--likesCount);
        }
        return postRepository.save(post);
    }

    private Post getStoredPostByIdOrThrow(String postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty() || post.get().getNodes() == null) {
            throw new RuntimeException("Post was not found");
        }
        return post.get();
    }
}
