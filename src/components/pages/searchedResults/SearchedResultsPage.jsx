import './searchedResultsPage.scss';
import { useSearchParams } from 'react-router-dom';
import LoadingBar from '../../loadingBar/LoadingBar';
import useFetchHome from '../../../useHooks/useFetchHome';
import Card from '../../card/Card';

const SearchedResultsPage = ({ isMenuOpen }) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const { loading, error, data } = useFetchHome(query);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;

    return (
        <div className="searched-results-wrapper" style={{
            opacity: isMenuOpen ? ".5" : "1"
        }}>
            <h1>
                Searched results for "{query}"
            </h1>
            <div className="searched-results-container">
                {
                    data?.items.length > 0 ?
                        data?.items.map((item, index) => {
                            return <Card item={item} key={index} />
                        })
                        :
                        <p>No results found for "{query}".</p>
                }
            </div>
        </div>
    )
}

export default SearchedResultsPage
