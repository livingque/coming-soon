import { useState, useEffect } from "react";

const imageList = [
  {
    url: "/p_project1.jpg",
    type: "portrait",
    color: "#513e30",
  },
  {
    url: "/p_project2.jpg",
    type: "portrait",
    color: "#1f2c35",
  },
  {
    url: "/p_project3.jpg",
    type: "portrait",
    color: "#4c5343",
  },
  {
    url: "/p_project4.jpg",
    type: "portrait",
    color: "#563935",
  },
  {
    url: "/l_project5.jpeg",
    type: "landscape",
    color: "#21394d",
  },
  {
    url: "/l_project6.jpeg",
    type: "landscape",
    color: "#580d07",
  },
  {
    url: "/l_project7.jpeg",
    type: "landscape",
    color: "#bf8c55",
  },
  {
    url: "/l_project8.jpeg",
    type: "landscape",
    color: "#66636c",
  },
];

const getImageList = (orientation) => {
  return imageList.filter((img) => img.type === orientation);
};

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenOrientation, setScreenOrientation] = useState(
    screenWidth <= 768 ? "portrait" : "landscape"
  );
  const [imgList, setImgList] = useState(getImageList(screenOrientation));
  const [activeImage, setActiveImage] = useState(imgList[0]);

  useEffect(() => {
    const debounceFunction = (cb, delay) => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => cb(), delay);
      };
    };

    const calculateScreenResolution = () => {
      setScreenWidth(window.innerWidth);
    };
    const debouncedResizeHandler = debounceFunction(
      calculateScreenResolution,
      300
    );

    window.addEventListener("resize", debouncedResizeHandler);
    return () => {
      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 768) {
      setScreenOrientation("portrait");
      setImgList(getImageList("portrait"));
    } else {
      setScreenOrientation("landscape");
      setImgList(getImageList("landscape"));
    }
  }, [screenWidth]);

  useEffect(() => {
    setActiveImage(imgList[0]);
  }, [imgList]);

  useEffect(() => {
    const tickImage = () => {
      const activeIndex = imgList.findIndex(
        (img) => img.url === activeImage.url
      );
      const nextIndex = (activeIndex + 1) % imgList.length;
      setActiveImage(imgList[nextIndex]);
    };
    const interval = setInterval(tickImage, 3000);
    return () => clearInterval(interval);
  }, [imgList, activeImage]);

  return (
    <div
      className="main-container"
      style={{ backgroundImage: `url(${activeImage.url})` }}
    >
      <div className="center-block">
        <div
          className="overlay-div"
          style={{ backgroundColor: activeImage.color }}
        ></div>
        <h2 className="logo-title">Livingque</h2>
        <p className="website-text">website</p>
        <h3 className="page-header">coming soon</h3>
      </div>
    </div>
  );
}

export default App;
