import React, { useEffect, useState } from "react";
import { IoMdSettings, IoMdSunny, IoMdMoon } from "react-icons/io";
import { toggleDarkMode } from "../utils/toggleDarkMode";

const SettingsDropdown = () => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const closeMenuIfOpen = e => {
    const settingsIcon = document.getElementById("settingsIcon");
    const settingsMenu = document.getElementById("settingsMenu");
    if (settingsMenu.children[0].contains(e.target)) return;

    if (
      settingsMenuOpen &&
      !settingsMenu.contains(e.target) &&
      !settingsIcon.contains(e.target)
    ) {
      settingsIcon.classList.add("animate-rotateFullBackwards");
      settingsIcon.classList.remove("animate-rotateFullForwards");
      settingsMenu.classList.remove("duration-200");
      settingsMenu.classList.add("duration-1000");
      settingsMenu.classList.remove("w-32");
      settingsMenu.classList.add("w-0");
      setSettingsMenuOpen(false);

      setTimeout(() => {
        settingsMenu.classList.add("duration-200");
        settingsMenu.classList.remove("duration-1000");
      }, 1000);
    }
  };

  useEffect(() => {
    document.removeEventListener("click", closeMenuIfOpen, true);
    document.addEventListener("click", closeMenuIfOpen, true);
  }, [settingsMenuOpen]);

  return (
    <div className="absolute right-6 top-6 text-black outline-none transition-all duration-200 dark:text-white">
      <IoMdSettings
        id="settingsIcon"
        className="size-8 origin-center outline-none hover:cursor-pointer"
        onClick={async e => {
          if (e.target.tagName === "path") e.target = e.target.parentElement;

          const settingsMenu = document.getElementById("settingsMenu");
          settingsMenu.classList.remove("duration-200");
          settingsMenu.classList.add("duration-1000");

          if (settingsMenuOpen) {
            console.log("closing");
            settingsMenu.classList.add("w-0");
            settingsMenu.classList.remove("w-32");
            e.target.classList.add("animate-rotateFullBackwards");
            e.target.classList.remove("animate-rotateFullForwards");
            setSettingsMenuOpen(false);
          } else {
            settingsMenu.classList.add("w-32");
            e.target.classList.add("animate-rotateFullForwards");
            e.target.classList.remove("animate-rotateFullBackwards");
            setSettingsMenuOpen(true);
          }

          setTimeout(() => {
            settingsMenu.classList.add("duration-200");
            settingsMenu.classList.remove("duration-1000");
          }, 1000);
        }}
      />
      <div
        id="settingsMenu"
        className={`absolute right-0 z-50 mt-1 h-[100px] w-0 overflow-hidden text-nowrap rounded-md bg-zinc-900 uppercase text-white duration-200 ease-in-out dark:bg-white dark:text-black`}
      >
        <div className="m-auto text-center">
          <div className="flex w-32 flex-col pt-2 align-middle text-2xl">
            <div>
              <h1 className="text-sm underline">Theme</h1>
            </div>
            <div className="flex flex-grow-0 flex-row justify-center gap-6 pt-1">
              <div
                className="hover:cursor-pointer"
                onClick={() => toggleDarkMode("light")}
              >
                <IoMdSunny className="pointer-events-none" />
              </div>
              <div
                className="hover:cursor-pointer"
                onClick={() => toggleDarkMode("dark")}
              >
                <IoMdMoon className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;
