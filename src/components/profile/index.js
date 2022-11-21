import React, {useEffect, useState} from "react";
import MyTuits from "../profile/my-tuits";
import { Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service";
import TuitsAndReplies
  from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }

  return(

      <div className="ttr-profile">
        <div className="border border-bottom-0">
          <div className="mb-5 position-relative">
            <img className="w-100" src="../images/nasa-profile-header.jpg"/>
            <div className="bottom-0 left-0 position-absolute">
              <div className="position-relative">
                <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                     src="../images/nasa-3.png"/>
              </div>
            </div>
            <Link to="/profile/edit"
                  className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
              Edit profile
            </Link>
          </div>
          <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
            Logout
          </button>

          <div className="p-2">
            <h4 className="fw-bolder pb-0 mb-0">
              {profile.username}<i className="fa fa-badge-check text-primary"></i>
            </h4>
            <h6 className="pt-0">@{profile.username}</h6>
            <p className="pt-2">
              Nothing else
            </p>
            <span className="ps-2">67.6K Tuits</span>
            <p>
              <i className="far fa-location-dot me-2"></i>
              Just here
              <i className="far fa-link ms-3 me-2"></i>
              <a href="https://www.nasa.gov/" className="text-decoration-none">nasa.gov</a>
              <i className="far fa-balloon ms-3 me-2"></i>
              Born July 30, 1998
              <br/>
              <i className="far fa-calendar me-2"></i>
              Joined December 2007
            </p>
            <b>178</b> Following
            <b className="ms-4">51.1M</b> Followers
            <ul className="mt-4 nav nav-pills nav-fill">
              <li className="nav-item">
                <Link to="/profile/mytuits"
                      className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}>
                  Tuits</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/tuits-and-replies"
                      className="nav-link">
                  Tuits & replies</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/media"
                      className="nav-link">
                  Media</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/mylikes"
                      className="nav-link">
                  Likes</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/mydislikes"
                      className="nav-link">
                  Dislikes</Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/mytuits"
                 element={<MyTuits/>}/>
          <Route path="/tuits-and-replies"
                 element={<TuitsAndReplies/>}/>
          <Route path="/media"
                 element={<Media/>}/>
          <Route path="/mylikes"
                 element={<MyLikes/>}/>
          <Route path="/mydislikes"
                 element={<MyDislikes/>}/>
        </Routes>
      </div>
  );
}
export default Profile;