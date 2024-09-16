import { useState } from 'react'
import './home.scss';
import Categories from '../../categories/Categories';
import useFetchHome from '../../../useHooks/useFetchHome';
import LoadingBar from '../../loadingBar/LoadingBar';
import Card from '../../card/Card';

const Home = ({ isMenuOpen }) => {
    const [selectedCategory, setSelectedCategory] = useState("Me and that man");
    const { data, loading, error } = useFetchHome(selectedCategory);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="page-container" style={{
            marginLeft: isMenuOpen ? "8rem" : "6rem",
            transition: "margin .3s ease-in"
        }}>
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
