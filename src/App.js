import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import bedIconIcon from "./bed_bedroom_icon.png";
import bookcaseIcon from "./bookcase_cupboard_icon.png";
import drawerIcon from "./chest_drawer_icon.png";
import cupboardIcon from "./cupboard_icon.png";
import sofaIcon from "./sofa_icon.png";
import tableIcon from "./table_icon.png";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const iconArray = useMemo(
    () => [
      bedIconIcon,
      bookcaseIcon,
      drawerIcon,
      cupboardIcon,
      sofaIcon,
      tableIcon,
    ],
    []
  );
  const [activeIcon, setActiveIcon] = useState(iconArray[0]);

  useEffect(() => {
    const setAnimation = () => {
      setActiveIcon(iconArray[Math.floor(Math.random() * iconArray.length)]);
      setIsVisible(!isVisible);
    };
    const tick = () => {
      setTimeout(() => {
        setAnimation();
      }, 1000);
    };
    tick();
  }, [isVisible, iconArray]);

  return (
    <div className="container">
      <h1>Livingque</h1>
      <p className="sub-heading">Crafting Spaces, Enriching Lifestyles</p>
      <div className="icon-container">
        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              style={{ backgroundImage: `url(${activeIcon})` }}
              initial={{
                scale: 0,
                rotate: 0,
                visibility: "hidden",
              }}
              animate={{
                scale: 1,
                rotate: 360,
                visibility: "visible",
              }}
              exit={{ scale: 0, rotate: 0, visibility: "hidden" }}
              className="box"
              key="box"
            />
          ) : null}
        </AnimatePresence>
      </div>
      <div className="coming-soon-container">
        <h6 className="website-text">website</h6>
        <h2 className="neonText">coming soon</h2>
      </div>
    </div>
  );
};

export default App;
