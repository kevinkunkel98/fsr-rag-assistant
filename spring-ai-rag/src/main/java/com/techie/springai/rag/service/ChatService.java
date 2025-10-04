package com.techie.springai.rag.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Service
public class ChatService {

    private final OllamaChatModel ollamaChatModel;
    private final VectorStore vectorStore;
    private final String promptTemplate;

    public ChatService(OllamaChatModel ollamaChatModel, VectorStore vectorStore) throws Exception {
        this.ollamaChatModel = ollamaChatModel;
        this.vectorStore = vectorStore;
        this.promptTemplate = Files.readString(
                new ClassPathResource("prompt-engineering/string-template.txt").getFile().toPath(),
                StandardCharsets.UTF_8
        );
    }

    private String applyPromptTemplate(String userMessage) {
        return String.format(promptTemplate, userMessage);
    }

    public String chatWithTemplate(String message) {
        String engineeredPrompt = applyPromptTemplate(message);
        return ChatClient.builder(ollamaChatModel)
                .build().prompt()
                .advisors(new QuestionAnswerAdvisor(vectorStore))
                .user(engineeredPrompt)
                .call()
                .content();
    }
}
