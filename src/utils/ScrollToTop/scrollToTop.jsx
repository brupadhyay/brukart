const scrollToTop = () => {
    document.querySelector("html").scrollTo(0, 0);
    document.querySelector("#mainBody").scrollTo(0, 0);
};

export { scrollToTop };