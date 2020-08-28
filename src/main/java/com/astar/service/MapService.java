package com.astar.service;

import com.astar.entity.MapInfo;
import com.astar.mapper.MapMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapService {
    @Autowired
    private MapMapper mapMapper;

    public List<MapInfo> list(){
        return mapMapper.list();
    }

    public MapInfo get(String name){
        return mapMapper.get(name);
    }

    public int update(Integer id, String mapData){
        return mapMapper.update(id, mapData);
    }

    public int insert(String name, String mapData){
        return mapMapper.insert(name, mapData);
    }
}
