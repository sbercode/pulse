package com.github.sbercode.pulse.controller;

import com.github.sbercode.pulse.converter.ByteArrayToFile;
import com.github.sbercode.pulse.converter.ContentConverter;
import com.github.sbercode.pulse.converter.speechkit.Speech;
import com.github.sbercode.pulse.converter.speechkit.Text;
import com.github.sbercode.pulse.converter.speechkit.Voice;
import com.github.sbercode.pulse.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
public class ConverterController {
    private final PostService postService;

    //TODO: функция конвертации из короткого текста в аудио. На вход принимает ссылку на статью и имя голоса
    @GetMapping("/converter/{id}")
    public String shortTextToVoice(@PathVariable String id, String nameVoice) {
        ContentConverter contentConverter = new ContentConverter();
        byte[] result = new byte[0];
        //TODO: нужно текст статьи и вставить первым параметром, второй параметр тип голоса
        result = contentConverter.shortTextToVoice("Тут должен быть текст статьи", Voice.FILIPP);
        try {
            //TODO: тут создаем файл. Имя неважно. предлагаю по id статьи
            ByteArrayToFile.save("name_file.ogg", result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //TODO: вернуть ссылку на файл
        return "ссылку на файл";
    }

    //TODO: функция конвертации аудио в текст. На вход принимает ссылку на статью
    @GetMapping("/converter/{id}")
    public String voiceToShortText(@PathVariable String id) {
        ContentConverter contentConverter = new ContentConverter();
        //TODO: указать путь к файлу на сервере (формат ogg)
        String text = contentConverter.voiceToShortText("path.ogg");
        return text;
    }
}
