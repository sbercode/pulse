package com.github.sbercode.pulse.converter;

import com.github.sbercode.pulse.converter.speechkit.Cloud;
import com.github.sbercode.pulse.converter.speechkit.Speech;
import com.github.sbercode.pulse.converter.speechkit.Text;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;

public class ContentConverter {
    private final String OAUTH_TOKEN = "AgAAAAAdEkZtAATuwW9HFOc1xEWZvih50LGDbfk";
    private final String FOLDER_ID = "b1gem6hnoh5s9j0hiesl";

    private Cloud cloud = null;

    public ContentConverter(){
        try {
            cloud = new Cloud(OAUTH_TOKEN, FOLDER_ID);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public byte[] shortTextToVoice(String text, String voice){
        byte[] result = new byte[0];
        try {
            Speech speech = new Speech(text);
            speech.setVoice(voice);
            result = cloud.request(speech);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public String voiceToShortText(String path){
        byte[] result = new byte[0];
        Text text = new Text(path);
        try {
            result = cloud.request(text);
        } catch (InterruptedException | IOException | URISyntaxException e) {
            e.printStackTrace();
        }
        return new String(result, StandardCharsets.UTF_8);
    }
}
