package com.github.sbercode.pulse.model.node;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class TextNode implements Serializable {

    private String value;
}
