// src/routes/PublicRoute.jsx
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "../pages/Home";
import Survey from "../pages/Survey";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Recommendations from "../pages/Recommendations";
import CheckListView from "../pages/CheckListView";
import TrendPage from "../pages/TrendPage";
import VideoIntroductionPage from "../pages/VideoIntroductionPage";
import StepsPage from "../pages/StepsPage";
import VideoPage from "../pages/VideoPage";
import DetailedReadPage from "../pages/DetailedReadPage";

function PublicRoute() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/survey" element={<Survey />} />
        <Route exact path="/recommendations" element={<Recommendations />} />
        <Route exact path="/steps" element={<StepsPage />} />
        <Route exact path="/video" element={<VideoPage />} />
        <Route
          exact
          path="/detail"
          element={<DetailedReadPage />}
        />
        <Route exact path="/checklist" element={<CheckListView />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/trends/:id" element={<TrendPage />} />
        <Route
          exact
          path="/video-introduction"
          element={<VideoIntroductionPage />}
        />
      </Routes>
    </Router>
  );
}

export default PublicRoute;
