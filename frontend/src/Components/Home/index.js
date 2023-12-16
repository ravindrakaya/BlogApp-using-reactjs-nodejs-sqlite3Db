import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return(
  <div className="home-bg-container">
    <div> 
      <div className="blog-top-container">
        <div className="logo-container">
          <img
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1702638703~exp=1702639303~hmac=887847ab1549b80fd880b7369e7838c8731528be9c6c907be9ca5eee71dd1f43"
            alt="logo"
            className="logo-icon"
          />
          <h1 className="blog-title">My Blog</h1>
        </div>
        <Link to="/signup" className="logout-link">
          <button type="button" className="logout-btn" >
            Logout
          </button>
        </Link>
      </div>
      <div className="home-container">
        <h1 className="blog-home-heading">Blogs</h1>
        <div className="cards-bg-container">
        <div className="card-container">
          <h1 className="card-heading">Creative always</h1>
          <p className="card-para">
            Our creative juices often flow when we can bounce daring ideas off
            each other and nurture a community around inspiration and creative
            endeavors.
          </p>
          <button type="button" className="card-btn">
            Learn More
          </button>
        </div>
        <div className="card-container">
          <h1 className="card-heading">Express customization</h1>
          <p className="card-para">
            It all begins with one idea and everything familiar that naturally
            flows with it fits into one paragraph.
          </p>
          <button type="button" className="card-btn">
            Learn More
          </button>
        </div>
        <div className="card-container">
          <h1 className="card-heading">Premium Integration</h1>
          <p className="card-para">
            Quality content means content that is packed with clear utility and
            is brimming with inspiration, and it has relentless empathy for the
            audience.
          </p>
          <button type="button" className="card-btn">
            Learn More
          </button>
        </div>
        <div className="card-container">
          <h1 className="card-heading">About</h1>
          <p className="card-para">
            A blog, also known as weblog, is a type of website that is like a
            diary or journal. Blog organizes content in the form of categories
            and posts. Posts on a blog are presented in reverse chronological
            order.
          </p>
          <button type="button" className="card-btn">
            Learn More
          </button>
        </div>
      </div>
      <p className="blog-home-para">Thank you Visiting.</p>
      </div>
    </div>
    <div className="blog-bottom-container">
      <p className="foot-para">Follow us on</p>
      <img
        src="https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?w=740&t=st=1702647112~exp=1702647712~hmac=126a87e2237798eb1df3dd75d3d41b2e10db13e36f13b9202cfcb45b13fa4dc1"
        alt="icon"
        className="footer-icon"
      />
      <img
        src="https://img.freepik.com/free-photo/3d-realistic-isolated-isometric-twitter-icon_125540-2044.jpg?w=740&t=st=1702647528~exp=1702648128~hmac=0e14d30e2cd147ca7535050fb24055b4558af2487cf2ab65d5be4f914b8201ba"
        alt="icon"
        className="footer-icon"
      />
      <img
        src="https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg?w=740"
        alt="icon"
        className="footer-icon"
      />
      <img
        src="https://img.freepik.com/free-vector/whatsapp-icon-design_23-2147900927.jpg?w=740&t=st=1702647627~exp=1702648227~hmac=88dacb5c8cc6dba45ad62bde0cbe5bbda307b47704cbc1b41c1b61e982377db4"
        alt="icon"
        className="footer-icon"
      />
    </div>
  </div>
)};
export default Home;