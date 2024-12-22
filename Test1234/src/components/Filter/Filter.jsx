import React from "react";
import { useState } from "react";
import "./Filter.scss"

function Filter ({onTagClick, projets}) {

    const [selectedTag, setSelectedTag] = useState(null);

    const tagsMap= projets.map((projets) => projets.tags).flat();
    const tagsSet = new Set(tagsMap);
    const tagsArray= Array.from(tagsSet);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);  
        onTagClick(tag);
      };
 
    return (
        <div className="filter"> 
        <button className={`filter__all ${selectedTag === null ? 'selected' : ''}`} onClick={() => handleTagClick(null) }> Tous </button>
            {tagsArray.map((tag, index) => (
                <button key={index} className={`filter__item ${selectedTag === tag ? 'selected' : ''}`} onClick={() => handleTagClick(tag)}> 
                    {tag}
                </button>
            ))}
            </div>
    )
}

export default Filter 