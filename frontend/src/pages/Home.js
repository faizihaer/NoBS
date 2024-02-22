// Home.js  THIS IS A TEMPLATE WORK OFF OF THIS PLS

import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <header className="header">
                <h1>NoBS - Fitness Workout Social Media</h1>
                <p>Your journey to a healthier lifestyle starts here!</p>
            </header>

            <section className="featured">
                <h2 className="section-title">Featured Workouts</h2>
                <div className="featured-workouts">
                    <div className="workout-card">
                        <h3>Circuit Training for Beginners</h3>
                        <p>Get started with a beginner-friendly circuit training routine to boost your metabolism.</p>
                        <img src="circuit-training-image.jpg" alt="Circuit Training" />
                    </div>
                    
                    <div className="workout-card">
                        <h3>HIIT Challenge</h3>
                        <p>Take on the High-Intensity Interval Training (HIIT) Challenge and push your limits.</p>
                        <img src="hiit-challenge-image.jpg" alt="HIIT Challenge" />
                    </div>
                    
                    <div className="workout-card">
                        <h3>Yoga for Flexibility</h3>
                        <p>Explore the world of yoga and improve your flexibility with our guided sessions.</p>
                        <img src="yoga-image.jpg" alt="Yoga for Flexibility" />
                    </div>
                </div>
            </section>

            <section className="community">
                <h2 className="section-title">Community Posts</h2>
                <div className="community-posts">
                    <div className="post">
                        <p>Just finished an amazing run in the park! 🏃‍♀️ #RunningLife #NoBSFitness</p>
                    </div>
                    <div className="post">
                        <p>Trying out a new recipe for a protein-packed smoothie. 💪 #HealthyEating #NoBSNutrition</p>
                    </div>
                </div>
            </section>

            <section className="motivation">
                <h2 className="section-title">Monday Motivation</h2>
                <div className="motivational-quotes">
                    <div className="quote">
                        <p>"The only bad workout is the one that didn't happen." - Unknown</p>
                    </div>
                    <div className="quote">
                        <p>"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle." - Christian D. Larson</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2 className="section-title">User Testimonials</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <p>"NoBS has completely transformed my fitness journey. The community support and diverse workout options keep me motivated!"</p>
                        <p className="user-info">- Sarah, Fitness Enthusiast</p>
                    </div>
                    
                    <div className="testimonial-card">
                        <p>"I love the variety of workouts available on NoBS. It's not just a social media platform; it's a fitness community that inspires me every day."</p>
                        <p className="user-info">- John, Gym Goer</p>
                    </div>
                </div>
            </section>

            <section className="events">
                <h2 className="section-title">Upcoming Events</h2>
                <div className="event-cards">
                    <div className="event-card">
                        <h3>Outdoor Yoga Session</h3>
                        <p>Join us for a refreshing outdoor yoga session in the park. Don't forget to bring your mat!</p>
                        <p className="event-info">Date: March 15, 2024 | Time: 6:00 PM</p>
                    </div>
                    
                    <div className="event-card">
                        <h3>5K Fun Run</h3>
                        <p>Get ready for a fun and challenging 5K run. Lace-up your shoes and let's hit the trail together!</p>
                        <p className="event-info">Date: March 22, 2024 | Time: 8:00 AM</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
