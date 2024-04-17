export const addDarkMode = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const toggleDarkMode = mode => {
  if (mode == "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else if (mode == "light") {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.toggle("dark");
    if (localStorage.theme != "") {
      localStorage.setItem(
        "theme",
        localStorage.theme === "dark" ? "light" : "dark"
      );
    } else {
      localStorage.setItem("theme", "dark");
    }
  }
};
