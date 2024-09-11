import { useState } from 'react'
import './home.scss';
import Categories from '../../categories/Categories';
import useFetchHome from '../../../useHooks/useFetchHome';
import LoadingBar from '../../loadingBar/LoadingBar';
import Card from '../../card/Card';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("Disturbed");
    const { data, loading, error } = useFetchHome(selectedCategory);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="page-container">
            <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
            <div className="card-wrapper">
                {
                    data?.items.map((item, index) => {
                        return <Card key={index} item={item} />
                    }).slice(1, 30)
                }
            </div>
        </div>
    )
}

export default Home
