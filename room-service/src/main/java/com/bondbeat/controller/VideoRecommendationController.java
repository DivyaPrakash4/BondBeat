package com.bondbeat.controller;

import com.bondbeat.model.Video;
import com.bondbeat.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
public class VideoRecommendationController {

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping
    public List<Video> getRecommendations(@RequestParam Long videoId) {
        Video currentVideo = videoRepository.findById(videoId)
                .orElse(null);
        
        if (currentVideo == null) {
            return videoRepository.findAll().stream().limit(3).collect(Collectors.toList());
        }

        // Rule-based logic: Same category or similar keywords
        return videoRepository.findAll().stream()
                .filter(v -> !v.getId().equals(videoId))
                .filter(v -> (v.getCategory() != null && v.getCategory().equalsIgnoreCase(currentVideo.getCategory()))
                        || (v.getKeywords() != null && currentVideo.getKeywords() != null && 
                            containsAny(v.getKeywords(), currentVideo.getKeywords())))
                .limit(3)
                .collect(Collectors.toList());
    }

    private boolean containsAny(String k1, String k2) {
        String[] words = k2.toLowerCase().split(",");
        for (String word : words) {
            if (k1.toLowerCase().contains(word.trim())) return true;
        }
        return false;
    }
}
