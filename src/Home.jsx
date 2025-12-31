import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import banner4 from '../public/images/banner4.jpg'
import duck from '../public/images/duck.jpg'
import avatar from '../public/images/img_avatar.png'


// ------------------------------------------------------------------
// 1. Intersection Observer for Counter Animation
// ------------------------------------------------------------------

  // Runs after every render

const CounterItem = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let current = 0;
          const speed = 100;
          const increment = end / speed;

          const updateCounter = () => {
            current += increment;
            if (current < end) {
              setCount(Math.ceil(current));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(end);
            }
          };

          updateCounter();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <div className="count" ref={ref}>
      <p>{count}</p>
      <h4>{label}</h4>
    </div>
  );
};

// ------------------------------------------------------------------
// 2. Slideshow Logic
// ------------------------------------------------------------------
const Home = () => {

  useEffect(() => {
    let slideIndex = 1;

    const showSlides = (n) => {
      let i;
      const slides = document.querySelectorAll(".home_page");
      if (slides.length === 0) return;

      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
      }
    };

    const plusSlides = (n) => {
      showSlides(slideIndex += n);
    };

    showSlides(slideIndex);

    const intervalId = setInterval(() => {
      plusSlides(1);
    }, 5000);


    // ------------------------------------------------------------------
    // 3. Swiper JS Initialization 
    // ------------------------------------------------------------------

    if (typeof window.Swiper !== 'undefined') {
      // NOTE: Using window.Swiper here assumes the Swiper library is loaded via a script tag
      const swiper = new window.Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        },
      });
    }

  // ------------------------------------------------------------------
  // Cleanup Function
  // ------------------------------------------------------------------
    return () => {
      clearInterval(intervalId);  
    };
  }, []);
  
  // ====================================================================
  // 🎯 JSX Content
  // ====================================================================

  return (
    <>
      <section className="slideshow">
        <div className="home_page">
          <div className="container">
            <div className="home_text">
              <p className="hometext_col_1">A Signature of Excellence</p>
              <h3 className="hometext_col_2">Excellence</h3>
              <p className="hometext_col_3">A more rewarding way to travel</p>
              <div className="homepage_btn">
                <Link className="home_btn_read" to="/about">Read more</Link>
                <Link className="home_btn_contact" to="/contact">Contact us</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="home_page">
          <div className="container">
            <div className="home_text">
              <p className="hometext_col_1">A Destination For The New Millennium.</p>
              <h3 className="hometext_col_2">Millennium</h3>
              <p className="hometext_col_3">A more rewarding way to travel</p>
              <div className="homepage_btn">
                <Link className="home_btn_read" to="/about">Read more</Link>
                <Link className="home_btn_contact" to="/contact">Contact us</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="home_page">
          <div className="container">
            <div className="home_text">
              <p className="hometext_col_1">A Signature of Excellence</p>
              <h3 className="hometext_col_2">Excellence</h3>
              <p className="hometext_col_3">A more rewarding way to travel</p>
              <div className="homepage_btn">
                <Link className="home_btn_read" to="/about">Read more</Link>
                <Link className="home_btn_contact" to="/contact">Contact us</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="home_page">
          <div className="container">
            <div className="home_text">
              <p className="hometext_col_1">A Destination For The New Millennium.</p>
              <h3 className="hometext_col_2">Millennium</h3>
              <p className="hometext_col_3">A more rewarding way to travel</p>
              <div className="homepage_btn">
                <Link className="home_btn_read" to="/about">Read more</Link>
                <Link className="home_btn_contact" to="/contact">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about_text_info">
            <h3 className="about_col_1">About us</h3>
            <h1 className="about_col_2">
              Traveling Makes A Man Wiser,But<br />Less Happy.
            </h1>
            <p className="about_col_3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eligendi
              totam nam aut fugit possimus maxime unde repellendus cupiditate magni.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, error.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
              alias, iure sapiente deserunt suscipit officia dolorem reprehenderit
              similique consequatur cumque.
            </p>
            <a href="#" className="about_read_more">
              Read more
            </a>
          </div>
        </div>
      </section>

      <section className="facility_info">
        <div className="container">
          <div className="grid-container">
            <div className="box">
              <span className="fa fa-users"></span>
              <h3>Best Travel Guide</h3>
              <p>
                Vivamus a ligula quam. Ut blandit eu leo non. Duis sed doloramet
                laoreet. Lorem ipsum dolor sit amet ut blandit eu leo.
              </p>
              <a href="#">Read More</a>
            </div>
            <div className="box">
              <span className="fa fa-wifi"></span>
              <h3>Free Wifi</h3>
              <p>
                Vivamus a ligula quam. Ut blandit eu leo non. Duis sed doloramet
                laoreet. Lorem ipsum dolor sit amet ut blandit eu leo.
              </p>
              <a href="#">Read More</a>
            </div>
            <div className="box">
              <span className="fa fa-sign-language"></span>
              <h3>Best Service</h3>
              <p>
                Vivamus a ligula quam. Ut blandit eu leo non. Duis sed doloramet
                laoreet. Lorem ipsum dolor sit amet ut blandit eu leo.
              </p>
              <a href="#">Read More</a>
            </div>
            <div className="box">
              <span className="fa fa-headphones"></span>
              <h3>24/7 Support</h3>
              <p>
                Vivamus a ligula quam. Ut blandit eu leo non. Duis sed doloramet
                laoreet. Lorem ipsum dolor sit amet ut blandit eu leo.
              </p>
              <a href="#">Read More</a>
            </div>
            <div className="box">
              <span className="fa fa-cutlery"></span>
              <h3>Delicious Food</h3>
              <p>
                Vivamus a ligula quam. Ut blandit eu leo non. Duis sed doloramet
                laoreet. Lorem ipsum dolor sit amet ut blandit eu leo.
              </p>
              <a href="#">Read More</a>
            </div>
            <div className="box">
              <span className="fa fa-shopping-basket"></span>
              <h3>Amazing Tours</h3>
              <p>
                Vivamus a ligula quam. Ut blandit eu leo non. Duis sed doloramet
                laoreet. Lorem ipsum dolor sit amet ut blandit eu leo.
              </p>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="why_choose">
        <div className="container">
          <div className="combine_info">
            <div className="leftside">
              <img src={duck} alt="Duck" />
            </div>
            <div className="rightside">
              <h3 className="right_row1">Why choose us</h3>
              <h1 className="right_row2">what we offer for you</h1>
              <p className="right_row3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                cupiditate similique natus fugiat dolores. Quae aspernatur voluptatum
                delectus totam explicabo. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Voluptatum, impedit?
              </p>
              <div className="rightside_list">
                <ul>
                  <li>
                    <span className="fa fa-check"></span>Comunication
                  </li>
                  <li>
                    <span className="fa fa-check"></span>10 years of experince
                  </li>
                  <li>
                    <span className="fa fa-check"></span>knowledge
                  </li>
                  <li>
                    <span className="fa fa-check"></span>valuing relationship
                  </li>
                  <li>
                    <span className="fa fa-check"></span>honesty
                  </li>
                  <li>
                    <span className="fa fa-check"></span>help
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="autoplay_counter">
        <div className="container">
          <div className="counter_element">
            <CounterItem end={1730} label="Happy Clients" />
            <CounterItem end={1080} label="Team Members" />
            <CounterItem end={1812} label="Awesome Tours" />
            <CounterItem end={190} label="Awards" />
          </div>
        </div>   
      </section>

      <section className="our_plans">
        <div className="container">
          <div className="our_plans_title">
            <h4>Our plans</h4>
            <h2>Affordable Packages</h2>
          </div>
          <div className="all_package">
            <div className="package pkg">
              <p>Basic package</p>
              <h4>
                <label>$</label>0<span>/month</span>
              </h4>
              <ul>
                <li>Regular Tours</li>
                <li>Free setup Guidlines</li>
                <li>Seasonla Tours</li>
                <li>Free Support</li>
                <li>Customer Support</li>
              </ul>
              <a href="#">Book now</a>
            </div>
            <div className="package">
              <h2>Save 10%</h2>
              <p>Standard package</p>
              <h4>
                <label>$</label>39<span>/month</span>
              </h4>
              <ul>
                <li>Regular Tours</li>
                <li>Free setup Guidlines</li>
                <li>Seasonla Tours</li>
                <li>Free Support</li>
                <li>Customer Support</li>
              </ul>
              <a href="#">Book now</a>
            </div>
            <div className="package pkg">
              <p>Premium package</p>
              <h4>
                <label>$</label>89<span>/month</span>
              </h4>
              <ul>
                <li>Regular Tours</li>
                <li>Free setup Guidlines</li>
                <li>Seasonla Tours</li>
                <li>Free Support</li>
                <li>Customer Support</li>
              </ul>
              <a href="#">Book now</a>
            </div>
          </div>
        </div>
      </section>

      <section className="explore">
        <div className="container">
          <div className="explore_component">
            <h4>EXPLORE THE WORLD</h4>
            <h2>Travel To Make Memories All Around The World</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia
              commodi velit iusto voluptates labore ratione consectetur doloremque
              soluta officia! Lorem ipsum dolor, sit amet
            </p>
            <a href="https://youtu.be/UYmvFzDuO5k?si=H5CG3VeLyU96IXDC">
              <img src={banner4} alt="Travel Banner" />
            </a>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="testimonials_title">
            <h4>testimonials</h4>
            <h2>happy client & feedbacks</h2>
          </div>
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="review_box">
                  <p className="review_text">
                    <q> Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, optio! </q>
                  </p>
                  <div className="review_profile">
                    <div>
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                      <span className="profile_name">Jay Javiya</span>
                      <p className="profile_city">Junagadh</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="review_box">
                  <p className="review_text">
                    <q> Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, optio! </q>
                  </p>
                  <div className="review_profile">
                    <div>
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                      <span className="profile_name">yash patel</span>
                      <p className="profile_city">vadodara</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="review_box">
                  <p className="review_text">
                    <q> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, mollitia. </q>
                  </p>
                  <div className="review_profile">
                    <div>
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                      <span className="profile_name">Bhargav Parmar</span>
                      <p className="profile_city">Gandhidham</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="review_box">
                  <p className="review_text">
                    <q> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, nulla! </q>
                  </p>
                  <div className="review_profile">
                    <div>
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                      <span className="profile_name">Zeel Borad</span>
                      <p className="profile_city">Surat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="review_box">
                  <p className="review_text">
                    <q> Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, doloremque. </q>
                  </p>
                  <div className="review_profile">
                    <div>
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                      <span className="profile_name">Meet Golakiya</span>
                      <p className="profile_city">Surat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="review_box">
                  <p className="review_text">
                    <q> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, optio? </q>
                  </p>
                  <div className="review_profile">
                    <div>
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div>
                      <span className="profile_name">Rushi Kachhadiya</span>
                      <p className="profile_city">Junagadh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      <section className="stay_update">
        <div className="container">
          <div className="update_info">
            <h3>stay update!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              nulla est fugiat repellat, eligendi a similique alias nisi facere
              necessitatibus eveniet, veritatis quidem voluptatum veniam.
            </p>
            <div className="email_info">
              <input type="email" placeholder="Enter your email..." />
              <a href="#">Subscribe</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;