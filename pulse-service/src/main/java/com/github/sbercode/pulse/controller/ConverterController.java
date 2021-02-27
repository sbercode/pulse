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
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConverterController {

    private final PostService postService;
    private final StorageRepository storageRepository;

//    @Value("${storagePath}")
//    private String storagePath;

    @Autowired
    public ConverterController(PostService postService, StorageRepository storageRepository) {
        this.postService = postService;
        this.storageRepository = storageRepository;
    }

    @GetMapping(value = "/converter/voice/{voiceName}/{id}.ogg",
            produces = "audio/mpeg")
    public @ResponseBody byte[] shortTextToVoice(@PathVariable String id, @PathVariable String voiceName) {
        return getConvertedAudio(id, voiceName);
    }

    private byte[] getConvertedAudio(String id, String voiceName) {
        //String fileName = "undefiled";
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

        result = contentConverter.shortTextToVoice(text, voiceName);

        try {
            //fileName = storagePath + "audio_" + UUID.randomUUID().toString() + ".ogg";
            //ByteArrayToFile.save(fileName, result);

            // Audio savedAudio = storageRepository.save(Audio.builder().file(new Binary(result)).build());
            Audio savedAudio = Audio.builder().file(new Binary(result)).build();
            if (savedAudio.getFile() == null) throw new RuntimeException("Audio was not saved");
            savedFile = savedAudio.getFile().getData();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return savedFile;
    }

    // TODO: Fix it if will be time.
//    @GetMapping("/converter/text/{voiceName}/{id}")
//    public String voiceToShortText(@PathVariable String id, @PathVariable String voiceName) {
//        ContentConverter contentConverter = new ContentConverter();
//
//        Path storedFile;
//        try {
//            storedFile = Files.write(Path.of("audio_" + UUID.randomUUID() + ".ogg"), getConvertedAudio(id, voiceName));
//        } catch (IOException e) {
//            throw new RuntimeException("Audio not readable");
//        }
//        String text = contentConverter.voiceToShortText(storagePath);
//        return text;
//    }
}
