import React from "react";

const TuitStats = ({
                       tuit, likeTuit, dislikeTuit = () => {
    }
                   }) => {
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats &&
                <span className="ttr-stats-replies">{tuit.stats.replies}</span>
                }
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats &&
                <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
                }
            </div>
            <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
              {
                  tuit.stats.likes > 0 &&
                  <i className="fa-solid fa-thumbs-up" style={{color: 'red'}}></i>
              }
              {
                  tuit.stats.likes <= 0 &&
                  <i className="fa-solid fa-thumbs-up"></i>
              }
              <span className="ttr-stats-likes"> {tuit.stats.likes}</span>
          </span>
            </div>
            <div className="col">

                <span className="ttr-dislike-tuit-click" onClick={() => dislikeTuit(tuit)}>
              {
                  tuit.stats.dislikes > 0 &&
                  <i className="fa-regular fa-thumbs-down" style={{color: 'blue'}}></i>
              }
                    {
                        tuit.stats.dislikes <= 0 &&
                        <i className="fa-regular fa-thumbs-down"></i>
                    }
                    <span className="ttr-stats-dislikes"> {tuit.stats.dislikes}</span>
          </span>
            </div>

            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;