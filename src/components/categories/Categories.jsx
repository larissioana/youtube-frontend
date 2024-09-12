import React, { useState } from 'react'
import './categories.scss';

const Categories = ({ setSelectedCategory }) => {

    const handleCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="categories-container">
            <button onClick={() => handleCategory("Disturbed, Me and that man")}>Music</button>
            <button onClick={() => handleCategory("Freecodecamp")}>Coding</button>
            <button onClick={() => handleCategory("jay shetty podcast")}>Podcasts</button>
            <button onClick={() => handleCategory("web development")}>Web development</button>
            <button onClick={() => handleCategory("joe dispenza, bruce lipton")}>Science</button>
            <button onClick={() => handleCategory("live")}>Live</button>
            <button onClick={() => handleCategory("news")}>News</button>
        </div>
    )
}

export default Categories
