import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/Carousel.css";
import dealBanner from "../assets/deal-banner.png";
import newdropBanner from "../assets/newdrop-banner.png";
import saleBanner from "../assets/sale-banner.png";
import discountBanner from "../assets/discount-banner.png";

export default class DemoCarousel extends Component {
  render() {
    return (
      <div className="carousel-center">
        <div className="carousel-container">
          <Carousel
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={4000}
          >
            <div>
              <img src={dealBanner} alt="deals" />
              {/* <p className="legend">
                Legend 1
                <br />
                Content will go here.
                <br />
                Breaks are used for separation of lines.
                <br />
                Content will be wrapped in a single paragraph tag.
                <br />
                Legend has hover effect, flex wrap and line height.
              </p> */}
            </div>
            <div>
              <img src={newdropBanner} alt="new drop" />
              {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
              <img src={saleBanner} alt="sale" />
              {/* <p className="legend">Legend 3</p> */}
              </div>
              <div>
                <img src={discountBanner} alt="discount" />
              </div>
            
          </Carousel>
        </div>
      </div>
    );
  }
}
