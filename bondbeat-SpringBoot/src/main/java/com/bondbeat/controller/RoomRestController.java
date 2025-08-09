package com.bondbeat.controller;

import com.bondbeat.model.Video;
import com.bondbeat.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/playlist")
@RequiredArgsConstructor
public class RoomRestController {

    private final VideoRepository videoRepository;

    @PostMapping("/add")
    public Video addVideo(@RequestBody Video video) {
        int position = videoRepository.findAll().size();
        video.setPosition(position);
        return videoRepository.save(video);
    }

    @GetMapping("/all")
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoRepository.deleteById(id);
    }

}
