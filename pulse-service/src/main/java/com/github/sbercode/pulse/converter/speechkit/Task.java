package com.github.sbercode.pulse.converter.speechkit;

import java.util.Map;

public interface Task
{
    void addParam(Map<String, String> param);

    String getParam();

    String getURL();
}
