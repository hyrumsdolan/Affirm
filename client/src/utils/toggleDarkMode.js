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
  if (mode == "dark") document.documentElement.classList.add("dark");
  else if (mode == "light") document.documentElement.classList.remove("dark");
  else document.documentElement.classList.toggle("dark");
};
