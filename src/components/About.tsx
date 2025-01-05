import { FunctionComponent } from "react";
import "../style/Home.css"

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    return (<div className="main-container">
        
    <div className="title-container">
        <h2 className="page-title">ABOUT BCard</h2>
        <h5 className="page-subtitle">Create, Connect, and Showcase Your Business in One Place</h5></div>
        
        <div className="body-container">
            <p className="about-us">Welcome to BCard, the ultimate platform for creating and sharing business cards online. We believe networking should be easy, modern, and accessible to everyone. With our app, you can design your personalized business card in minutes and showcase your professional identity to the world.

            Not only can you craft a stunning digital card, but you can also connect with other businesses and professionals by exploring our extensive directory. Whether you're an entrepreneur, freelancer, or part of a large company, BCard helps you stand out, build connections, and grow your network effortlessly.

            Join us today to make a lasting impression and discover a community that shares your professional vision!</p>

            <div className="title-container">
            <h5 className="page-subtitle">Why Choose BCard?</h5></div>
            <p className="about-us">
                <span >1. Customizable Designs:</span> Easily create a unique and professional business card that represents your brand identity.<br/>
                <span >2. Networking Made Simple: </span>Share your card instantly and discover new connections through our searchable directory.<br/>
                <span >3. Eco-Friendly & Convenient:</span> Go digital and save time while reducing paper waste.<br/>
                <span>4. Accessible Anytime, Anywhere:</span> Your business card is always available online, ready to share or update in seconds.<br/>
                <span>5. Expand Your Reach: </span>Be part of a growing community where others can easily find and connect with your business.
            </p>

            <h5 className="end-container">With BCard, building your professional presence has never been easier or more impactful.</h5>
            </div>
    
            </div>  );
}
 
export default About;