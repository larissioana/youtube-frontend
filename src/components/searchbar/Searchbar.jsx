import { useState } from 'react';
import './searchbar.scss';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate(`/search?query=${encodeURIComponent(input.trim())}`);
        }
    };

    return (
        <div className="searchbar-container">
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    value={input}
                    onChange={handleInput}
                />
                <button type="submit">
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </button>
            </form>
        </div>
    )
}

export default Searchbar
