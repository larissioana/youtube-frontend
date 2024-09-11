import './share.scss';
import { FacebookShareButton, WhatsappShareButton, FacebookMessengerShareButton, EmailShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton, TumblrShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon, FacebookMessengerIcon, PinterestIcon, EmailIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'react-share';
import { useState } from 'react';

const Share = ({ setIsShareModalOpen }) => {
    const url = window.location.href;

    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => {
                setCopyButtonText('Copy');
            }, 2000);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="share-wrapper">
            <span class="material-symbols-outlined" onClick={() => setIsShareModalOpen(false)}>
                close
            </span>
            <h3>Share in a post</h3>
            <div className="share-buttons">
                <FacebookShareButton url={url} className="share-button">
                    <FacebookIcon size={45} round />
                    Facebook
                </FacebookShareButton>
                <WhatsappShareButton url={url} className="share-button">
                    <WhatsappIcon size={45} round />
                    WhatsApp
                </WhatsappShareButton>
                <TwitterShareButton url={url} className="share-button">
                    <TwitterIcon size={45} round />
                    Twitter
                </TwitterShareButton>
                <FacebookMessengerShareButton url={url} className="share-button">
                    <FacebookMessengerIcon size={45} round />
                    Messenger
                </FacebookMessengerShareButton>
                <PinterestShareButton url={url} className="share-button">
                    <PinterestIcon size={45} round />
                    Pinterest
                </PinterestShareButton>
                <EmailShareButton url={url} className="share-button">
                    <EmailIcon size={45} round />
                    Email
                </EmailShareButton>
            </div>
            <div className="url">
                <input type="text" placeholder={url} />
                <button onClick={handleCopyToClipboard}>{copyButtonText}</button>
            </div>
        </div >
    )
}

export default Share
