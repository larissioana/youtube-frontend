import './navbar.scss';
import logo from '../assets/youtube.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Searchbar from './searchbar/Searchbar';
import Sidebar from './sidebar/Sidebar';
import SidebarMenu from './sidebarMenu/SidebarMenu';
import { useLocation, Link } from 'react-router-dom';

const Navbar = ({ toggleTheme, isDarkMode, isMenuOpen, setIsMenuOpen }) => {
    const location = useLocation();

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isVideoPage = location.pathname.startsWith('/video/') || location.pathname.startsWith('/channel/') || location.pathname.startsWith('/search');

    return (
        <nav className="navbar">
            <div className="burger" onClick={handleMenuOpen}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line2"></div>
            </div>
            {
                isMenuOpen ? (
                    <SidebarMenu />
                ) : (
                    !isVideoPage && <Sidebar />
                )
            }
            <div className="nav-left">
                <LazyLoadImage effect="blur" src={logo} alt="youtube logo" className="youtube-logo" width="30px" height="30px" />
                <Link className="link" to="/" aria-label="Navigate to home page">
                    <h1>Youtube</h1>
                </Link>
            </div>
            <div className="nav-center">
                <Searchbar />
            </div>
            <div className="nav-right">
                {
                    !isDarkMode ?
                        <span className="material-symbols-outlined" onClick={toggleTheme}>
                            dark_mode
                        </span>
                        :
                        <span className="material-symbols-outlined" onClick={toggleTheme}>
                            light_mode
                        </span>
                }
            </div>
        </nav>
    )
}

export default Navbar
