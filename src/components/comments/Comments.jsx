import { useState, useEffect } from 'react'
import './comments.scss';
import useFetchVideoComments from '../../useHooks/useFetchVideoComments';
import LoadingBar from '../loadingBar/LoadingBar';
import { timeAgo } from '../../utils/time';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Comments = ({ id }) => {
    const { loading, error, videoComments } = useFetchVideoComments(id);

    if (loading) return <LoadingBar />
    if (error) return <p classname="error">Error fetching data: {error.message}</p>;


    if (!videoComments || !videoComments.items || videoComments.items.length === 0) {
        return <p className="no-comments">No comments available for this video.</p>;
    }

    if (id === undefined) {
        return <p>no video</p>
    }

    return (
        <div className="comments-wrapper">
            {
                videoComments &&
                <>
                    <h1> {videoComments.items.length} comments</h1>
                    <div className="comments-flex-container">
                        {
                            videoComments.items.map((item) => {
                                return <div key={item.id} className="comment" >

                                    <LazyLoadImage effect="blur" width="20px" height="20px" className="comments-img" loading="lazy" src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt={item.snippet.topLevelComment.snippet.authorDisplayName} />

                                    <div className="author-details">
                                        <div className="author">
                                            <h4>{item.snippet.topLevelComment.snippet.authorDisplayName}</h4>
                                            <p>{timeAgo(item.snippet.topLevelComment.snippet.publishedAt)}</p>
                                        </div>
                                        <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </>
            }
        </div >
    )
}

export default Comments
