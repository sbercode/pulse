package com.github.sbercode.pulse.model.node;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class AudioNode implements Serializable {

    private String source;
}
