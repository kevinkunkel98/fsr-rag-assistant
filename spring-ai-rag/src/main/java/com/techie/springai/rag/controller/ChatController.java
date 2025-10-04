package com.techie.springai.rag.controller;

import com.techie.springai.rag.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public String chat(@RequestBody String message) {
        return chatService.chatWithTemplate(message);
    }
}
