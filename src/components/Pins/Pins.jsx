import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Pin from "./Pin";

import "./Pins.scss";

const Pins = ({ pins }) => {
  return (
    <section className="pins">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
      >
        <Masonry gutter={30}>
          {pins.map((pin) => (
            <Pin key={pin._id} pin={pin} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
};

export default Pins;
