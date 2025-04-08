import React from 'react';
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Programs from "./components/Programs/Programs.jsx";
import Title from "./components/Title/Title.jsx";
import About from "./components/About/About.jsx";
import Campus from "./components/Campus/Campus.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.jsx";
import ImageUpload from "./components/ImageUpload/ImageUpload.jsx";
import ResultPage from "./components/ResultPage/ResultPage.jsx";

const App = () => {
    const [playState, setPlayState] = React.useState(false);
    const [results, setResults] = React.useState(null);

    return (
        <div>
            <Navbar />
            <Hero />
            <div className='container'>
                <Title subTitle='Our PROGRAM' title='What We Offer' />
                <Programs />
                <About setPlayState={setPlayState} />
                <Title subTitle='Gallery' title='Campus Photos' />
                <Campus />
                <Title subTitle='Testimonials' title='What Student Says' />
                <Testimonials />
                <Title subTitle='Contact Us' title='Get In Touch' />
                <Contact />
                <ImageUpload setResults={setResults} />
                <ResultPage results={results} setResults={setResults} />
                <Footer />
            </div>
            <VideoPlayer playState={playState} setPlayState={setPlayState} />
        </div>
    );
};

export default App;
