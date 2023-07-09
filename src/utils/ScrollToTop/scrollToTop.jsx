const scrollToTop = () => {
    window.scrollTo(0,0);
    document.querySelector("html").scrollTo(0, 0);
    document.querySelector("#mainBody").scrollTo(0, 0);
};

export { scrollToTop };