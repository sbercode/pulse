package com.github.sbercode.pulse.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Builder
public class Node {

    private NodeType type;

    private Object content;

}
