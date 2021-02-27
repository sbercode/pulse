package com.github.sbercode.pulse.util;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Data
public class ClassConverter {

    private static ModelMapper mapper = new ModelMapper();

    /**
     * This method converts one object to another.
     *
     * @param src  object to be converted
     * @param dest class type of destination object
     * @param <T>  convertible type
     * @return converted object
     */
    public static <T> T convert(Object src, Class<T> dest) {
        if (src == null) {
            return null;
        }
        return mapper.map(src, dest);
    }

    /**
     * This method converts one list to another.
     *
     * @param list list to be converted
     * @param dest class type of destination object
     * @param <T>  convertible type
     * @return converted list
     */
    public static <S, T> List<T> convert(List<S> list, Class<T> dest) {
        if (list == null) {
            throw new RuntimeException("Null parameters are not allowed");
        }
        return list.stream()
                .map(element -> mapper.map(element, dest))
                .collect(Collectors.toList());
    }
}
