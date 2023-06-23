import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import Trusted from "../../components/trusted/Trusted";
import "./Home.scss";
import CatCard from "../../components/catCard/CatCard";
import { cards, projects } from "../../data";
import ProjectCard from "../../components/projectCard/ProjectCard";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <Trusted />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {cards?.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>The best part? Everything.</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
            Find the right service for every price point. No hourly rates, just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Get quality work done quickly
            </div>
            <p>
            Hand your project over to a talented freelancer in minutes, get long-lasting results.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Pay when you're happy
            </div>
            <p>
            Upfront quotes mean no surprises. Payments only get released when you approve.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Count on 24/7 support
            </div>
            <p>
            Our round-the-clock support team is available to help anytime, anywhere.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls></video>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1><b>fiverr</b> business. <span>NEW</span></h1>
            <h1>A solution built for <i>business</i></h1>
            <p>Upgrade to a curated experience to access vetted talent and exclusive tools</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Talent matching
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
            Dedicated account management
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Team collaboration tools
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Business Payment solutions
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img src="./img/fb.webp" alt="" />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects?.map((card) => (
          <ProjectCard item={card} key={card.id} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
