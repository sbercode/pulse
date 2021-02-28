def getKeywords(text):
    if text is None:
        return "Отсутствует текст"
    text = text.lower()
    import string
    spec_chars = string.punctuation + '\n\xa0«»\t—…'
    text = "".join([ch for ch in text if ch not in spec_chars])

    def remove_chars_from_text(text, chars):
        return "".join([ch for ch in text if ch not in chars])

    text = remove_chars_from_text(text, spec_chars)
    text = remove_chars_from_text(text, string.digits)
    from nltk import word_tokenize

    text_tokens = word_tokenize(text)

    import nltk

    text = nltk.Text(text_tokens)

    print(text[:10])
    from nltk.probability import FreqDist

    fdist = FreqDist(text)
    fdist.most_common(5)

    from nltk.corpus import stopwords

    russian_stopwords = stopwords.words("russian")
    russian_stopwords.extend(['это', 'нею'])
    fdist.most_common(10)

    text_tokens = [token.strip() for token in text_tokens if token not in russian_stopwords]

    print(len(text_tokens))
    text = nltk.Text(text_tokens)

    fdist_sw = FreqDist(text)
    fdist_sw.most_common(10)

    print(text[:5])
    return text[:5]


def shortVoiceToText(nameFile):
    print(nameFile)
    import urllib.request
    import json

    FOLDER_ID = "b1gem6hnoh5s9j0hiesl"  # Идентификатор каталога
    IAM_TOKEN = "t1.9euelZqZyMuQio6ZnZ6UmsrHlMqQye3rnpWal5yOnpCMl8uQyp6NjJCOyYnl8_dyKhN--e8fP095_N3z9zJZEH757x8_T3n8.rxDJfjGY7zvLNTnlS6gWhwvvUo42uDkOUaHLkMz1OPuPJiO1Wi7Lfqt-N3k8JT0YH3WXVX7JKuNvIgVGwCxdBw"  # IAM-токен

    with open(nameFile, "rb") as f:
        data = f.read()

    params = "&".join([
        "topic=general",
        "folderId=%s" % FOLDER_ID,
        "lang=ru-RU"
    ])

    url = urllib.request.Request("https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?%s" % params, data=data)
    url.add_header("Authorization", "Bearer %s" % IAM_TOKEN)
    responseData = urllib.request.urlopen(url).read().decode('UTF-8')
    decodedData = json.loads(responseData)

    if decodedData.get("error_code") is None:
        text = decodedData.get("result")
        print(text)
        return text
