package com.bondbeat.dto;

import lombok.Data;

@Data
public class SyncMessageDTO {
    private String action;
    private double timestamp;
    private String videoUrl;
}
