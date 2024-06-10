import React from "react";
import { __ } from "@wordpress/i18n";
import "./carousel.css"; // Import custom CSS styles for carousel

const Carousel = ({ posts, transitionTime }) => {
  return (
    <div
      id="myCarousel"
      className="carousel slide"
      data-ride="carousel"
      data-interval={transitionTime * 1000}
    >
      <div className="carousel-inner">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={post.id}
            >
              <div className="row">
                
                <div className="col-md-4">
                  <img
                    src="https://via.placeholder.com/300" // Replace this with your image source
                    className="d-block w-100"
                    alt="Promotion Image"
                  />
                </div>
                <div className="col-md-4">
                  <div className="carousel-caption d-block">
                    <h5>{__("My Headline", "my-promotion-plugin")}</h5>
                    <p
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <a href={post.link} className="btn btn-primary">
                      {__("Read More", "my-promotion-plugin")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>{__("No posts found", "my-promotion-plugin")}</p>
        )}
      </div>
      <a
        className="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">{__("Previous", "my-promotion-plugin")}</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">{__("Next", "my-promotion-plugin")}</span>
      </a>
    </div>
  );
};

export default Carousel;
