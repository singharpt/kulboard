import boardsInfo from "../dummydata/boardsData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function BoardSlides() {
  return (
    <div>
      <Carousel infiniteLoop={true} width={500} fade={true} showThumbs={false}>
        {boardsInfo.map((item) => (
          <div>
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" />
            <p className="legend">{item?.boardname}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BoardSlides;
