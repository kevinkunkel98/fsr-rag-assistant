package com.techie.springai.rag.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final OllamaChatModel ollamaChatModel;
    private final VectorStore vectorStore;

    public ChatService(OllamaChatModel ollamaChatModel, VectorStore vectorStore) {
        this.ollamaChatModel = ollamaChatModel;
        this.vectorStore = vectorStore;
    }

    // Prompt-Template: Hier wird die Nutzereingabe eingesetzt
    private String applyPromptTemplate(String userMessage) {
        String template = "You are a chatbot assistent for answering questions about the computer science faculty. Answer in german if question is in german:\n\n%s";
        return String.format(template, userMessage);
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
