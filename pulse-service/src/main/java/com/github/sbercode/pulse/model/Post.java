package com.github.sbercode.pulse.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Post {

    @Id
    @JsonProperty
    private String id;

    @JsonProperty
    private String name;

    @JsonProperty
    private List<Node> nodes;

    @JsonProperty
    private User user;

    @JsonProperty
    private long likesCount;

    @JsonProperty
    private String[] tags;

    @JsonProperty
    private long creationDate;

    @JsonProperty
    private long modificationDate;
}
