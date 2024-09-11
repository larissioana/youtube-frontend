import { useState } from 'react'
import './description.scss';

const parseSentences = (text) => {
    const urlPattern = /((https?:\/\/[^\s]+))/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
        if (part.match(urlPattern)) {
            return (
                <a key={index} style={{
                    color: "var(--links)",
                }} href={part} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            );
        }
        return <span key={index}>{part}</span>;
    });
};

const Description = ({ sentences }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedSentences = showAll ? sentences : sentences.slice(0, 3);

    const showToggle = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="sentences-container">
            {
                displayedSentences.map((sentence, index) => (
                    <p key={index}>
                        {parseSentences(sentence)}
                    </p>
                ))
            }
            {
                sentences.length > 3 &&
                <button onClick={showToggle}>
                    {showAll ? "Show less" : "Show more"}
                </button>
            }
        </div>
    );
}
export default Description
