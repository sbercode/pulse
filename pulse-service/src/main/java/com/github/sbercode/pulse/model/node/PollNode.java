package com.github.sbercode.pulse.model.node;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class PollNode implements Serializable {

    private String question;

    private List<Answer> answers;

    @Data
    @Builder
    static class Answer {
        private String value;
        private long count;
    }
}
