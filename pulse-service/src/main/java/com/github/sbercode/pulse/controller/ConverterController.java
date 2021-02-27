package com.github.sbercode.pulse.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.sbercode.pulse.util.ClassConverter;
import org.dvp.yask.speechkit.ByteArrayToFile;
import org.dvp.yask.speechkit.ContentConverter;
import org.dvp.yask.speechkit.speechkit.Voice;
import com.github.sbercode.pulse.model.NodeType;
import com.github.sbercode.pulse.model.Post;
import com.github.sbercode.pulse.model.node.TextNode;
import com.github.sbercode.pulse.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class ConverterController {

    private final ObjectMapper objectMapper;
    private final PostService postService;

    //TODO: функция конвертации из короткого текста в аудио. На вход принимает ссылку на статью и имя голоса
    @GetMapping("/converter/voice/{id}/{nameVoice}")
    public String shortTextToVoice(@PathVariable String id, @PathVariable String nameVoice) {
        String fileName = "undefiled";
        ContentConverter contentConverter = new ContentConverter();

        byte[] result;
        //TODO: нужно текст статьи и вставить первым параметром, второй параметр тип голоса
        Optional<Post> post = Optional.ofNullable(postService.getById(id));

        if (post.isEmpty() || post.get().getNodes().isEmpty()) {
            return null;
        }
        String text = post.get().getNodes().stream()
                .filter(p -> p.getType() == NodeType.TEXT)
                .map(p -> ClassConverter.convert(p.getContent(), TextNode.class))
                .map(TextNode::getValue)
                .collect(Collectors.joining());

        result = contentConverter.shortTextToVoice(text, Voice.FILIPP);

        try {
            //TODO: тут создаем файл. Имя неважно. предлагаю по id статьи
            fileName = "/files/audio_" + UUID.randomUUID().toString() + ".ogg";
            ByteArrayToFile.save(fileName, result);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        //TODO: вернуть ссылку на файл
        return fileName;
    }

    //TODO: функция конвертации аудио в текст. На вход принимает ссылку на статью
    @GetMapping("/converter/text/{id}")
    public String voiceToShortText(@PathVariable String id) {
        ContentConverter contentConverter = new ContentConverter();
        //TODO: указать путь к файлу на сервере (формат ogg)
        String text = contentConverter.voiceToShortText("path.ogg");
        return text;
    }
}
