import React, { useState } from 'react'
import './categories.scss';

const Categories = ({ setSelectedCategory }) => {

    const handleCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="categories-container">
            <button onClick={() => handleCategory("Disturbed")}>Music</button>
            <button onClick={() => handleCategory("Freecodecamp")}>JavaScript</button>
            <button onClick={() => handleCategory("jay shetty podcast")}>Podcasts</button>
            <button onClick={() => handleCategory("Me and that man")}>Rock</button>
            <button onClick={() => handleCategory("joe dispenza, bruce lipton")}>Science</button>
            <button onClick={() => handleCategory("live")}>Live</button>
            <button onClick={() => handleCategory("news")}>News</button>
        </div>
    )
}

export default Categories
