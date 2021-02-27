package com.github.sbercode.pulse.repository;

import com.github.sbercode.pulse.model.storage.Audio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends MongoRepository<Audio, String> {
}
