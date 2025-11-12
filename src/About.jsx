import React from 'react'
import './About.css'

const About = () => {
  return (
    <>
      <section className="header">
        <div className="container">
          <h2>about us</h2>
          <div className="header_element">
            <p className="tag_1">
              {' '}
              <span>Home</span>
            </p>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <p className="tag_2">About</p>
          </div>
        </div>
      </section>

      <section className="about_us">
        <div className="container">
          <div className="about_us_info">
            <div className="about_info_part">
              <h4>About us</h4>
              <h2>We have 10+ years of experience.</h2>
              <p className="about_text">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="about_info_part">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus rem expedita a vel tempore omnis dolorem
                asperiores quam. Repellat, ad.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus rem expedita a vel tempore omnis dolorem
                asperiores quam. Repellat, ad.
              </p>
              <a href="#">Read more</a>
            </div>
          </div>
        </div>
      </section>

      <section className="our_history">
        <div className="container">
          <div className="history_info">
            <h4>Our history of Trace Agency</h4>
            <h2>Our history</h2>
            <p className="history_text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
              provident eveniet dolorem deleniti voluptatibus, enim quibusdam sed
              alias illo amet aut animi officia cumque sequi quas facilis
              necessitatibus ea molestiae.
            </p>
            <div className="sort_detail">
              <div className="sort_detail_box">
                <p className="year">2015</p>
                <p className="sort_text">Lorem ipsum dolor sit without</p>
              </div>

              <div className="sort_detail_box">
                <p className="year">2018</p>
                <p className="sort_text">Lorem ipsum dolor sit without</p>
              </div>

              <div className="sort_detail_box">
                <p className="year">2021</p>
                <p className="sort_text">Lorem ipsum dolor sit without</p>
              </div>

              <div className="sort_detail_box">
                <p className="year">2024</p>
                <p className="sort_text">Lorem ipsum dolor sit without</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our_team">
        <div className="container">
          <div className="team_info">
            <h4>OUR TEAMS</h4>
            <h2>Meet Our Guides</h2>
            <div className="guides_infobox">
              <div className="guide_details">
                <img src="src/assets/guideimg/team1.jpg" alt="Albert Cooper" />
                <p className="guide_name">Albert Cooper</p>
                <p className="guide_position">Founder, CEO</p>
                <div className="guide_social_site">
                  <i class="fa-brands fa-square-facebook"></i>
                  <i className="fa-brands fa-linkedin"></i>
                  <i className="fa-brands fa-square-twitter"></i>
                </div>
              </div>

              <div className="guide_details">
                <img src="src/assets/guideimg/team2.jpg" alt="Joseph Collins" />
                <p className="guide_name">Joseph Collins</p>
                <p className="guide_position">Tour Manager</p>
                <div className="guide_social_site">
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-linkedin"></i>
                  <i className="fa-brands fa-square-twitter"></i>
                </div>
              </div>

              <div className="guide_details">
                <img src="src/assets/guideimg/team3.jpg" alt="Ada Peter" />
                <p className="guide_name"> Ada Peter</p>
                <p className="guide_position">Travel Agent</p>
                <div className="guide_social_site">
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-linkedin"></i>
                  <i className="fa-brands fa-square-twitter"></i>
                </div>
              </div>

              <div className="guide_details">
                <img src="src/assets/guideimg/team4.jpg" alt="John Harris" />
                <p className="guide_name">John Harris</p>
                <p className="guide_position">Tour manager</p>
                <div className="guide_social_site">
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-linkedin"></i>
                  <i className="fa-brands fa-square-twitter"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About