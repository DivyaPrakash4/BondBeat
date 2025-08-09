package com.bondbeat.controller;

import com.bondbeat.dto.ChatMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{roomId}")
    public void handleChat(@DestinationVariable String roomId, @Payload ChatMessageDTO message) {
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);
    }
}
