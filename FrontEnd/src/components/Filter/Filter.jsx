import React from "react";
import "./Filter.scss"
import projets from "../../data/projets.json"

function Filter ({onTagClick}) {
    const tagsMap= projets.map((projets) => projets.tags).flat();
    const tagsSet = new Set(tagsMap);
    const tagsArray= Array.from(tagsSet);
 
    return (
        <div className="filter"> 
        <button className="filter__all" onClick={() => onTagClick(null) }> Tous </button>
            {tagsArray.map((tag, index) => (
                <button key={index} className="filter__item" onClick={() => onTagClick(tag)}> 
                    {tag}
                </button>
            ))}
            </div>
    )
}

export default Filter 