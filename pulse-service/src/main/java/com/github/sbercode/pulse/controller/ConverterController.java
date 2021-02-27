package com.github.sbercode.pulse.controller;

import com.github.sbercode.pulse.model.NodeType;
import com.github.sbercode.pulse.model.Post;
import com.github.sbercode.pulse.model.node.TextNode;
import com.github.sbercode.pulse.model.storage.Audio;
import com.github.sbercode.pulse.repository.StorageRepository;
import com.github.sbercode.pulse.service.PostService;
import com.github.sbercode.pulse.util.ClassConverter;
import org.bson.types.Binary;
import org.dvp.yask.speechkit.ContentConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
public class ConverterController {

    private final PostService postService;
    private final StorageRepository storageRepository;

    @Value("${storagePath}")
    private String storagePath;

    @Autowired
    public ConverterController(PostService postService, StorageRepository storageRepository) {
        this.postService = postService;
        this.storageRepository = storageRepository;
    }

    @GetMapping(value = "/converter/voice/{nameVoice}/{id}.ogg",
            produces = "audio/mpeg")
    public @ResponseBody byte[] shortTextToVoice(@PathVariable String id, @PathVariable String nameVoice) {
        String fileName = "undefiled";
        byte[] savedFile;
        ContentConverter contentConverter = new ContentConverter();

        byte[] result;
        Optional<Post> post = Optional.ofNullable(postService.getById(id));

        if (post.isEmpty() || post.get().getNodes().isEmpty()) {
            return null;
        }
        String text = post.get().getNodes().stream()
                .filter(p -> p.getType() == NodeType.TEXT)
                .map(p -> ClassConverter.convert(p.getContent(), TextNode.class))
                .map(TextNode::getValue)
                .collect(Collectors.joining());

        result = contentConverter.shortTextToVoice(text, nameVoice);

        try {
            fileName = storagePath + "audio_" + UUID.randomUUID().toString() + ".ogg";
            //ByteArrayToFile.save(fileName, result);

            Audio savedAudio = storageRepository.save(Audio.builder().file(new Binary(result)).build());
            if (savedAudio.getFile() == null) throw new RuntimeException("Audio was not saved");
            savedFile = savedAudio.getFile().getData();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return savedFile;
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
