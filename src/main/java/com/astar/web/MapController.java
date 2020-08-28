package com.astar.web;

import com.astar.entity.MapInfo;
import com.astar.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MapController {
    @Autowired
    MapService service;

    @GetMapping("/list")
    public List<MapInfo> list(){
        return service.list();
    }

    @GetMapping("/get/{name}")
    public MapInfo get(@PathVariable String name){
        System.out.println(name);
        System.out.println(service.get(name));
        return service.get(name);
    }

    @GetMapping("/update")
    public int update(@RequestParam Integer id, @RequestParam String mapData){
        return service.update(id, mapData);
    }

    @PostMapping("/insert")
    public int insert(@RequestParam String name, @RequestParam String mapData){
        return service.insert(name, mapData);
    }
}
