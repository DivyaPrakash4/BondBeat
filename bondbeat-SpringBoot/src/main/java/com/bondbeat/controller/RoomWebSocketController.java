package com.bondbeat.controller;

import com.bondbeat.dto.SyncMessageDTO;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RoomWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public RoomWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sync/{roomId}")
    public void handleSync(@DestinationVariable String roomId, @Payload SyncMessageDTO message) {
        messagingTemplate.convertAndSend("/topic/sync/" + roomId, message);
    }
}
