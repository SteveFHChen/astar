package com.astar.mapper;

import com.astar.entity.MapInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Mapper
public interface MapMapper {

    @Select("select * from map")
    public List<MapInfo> list();

    @Select("select * from map where name=#{name}")
    public MapInfo get(String name);

    @Update("update map set mapData=#{mapData} where id=#{id}")
    public int update(Integer id, String mapData);

    @Insert("insert into map(name,mapData) values (#{name},#{mapData})")
    public int insert(String name, String mapData);
};
