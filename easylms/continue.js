(() => {
    document.addEventListener("DOMContentLoaded", function (event) {
        const lastLesson = JSON.parse(localStorage.getItem("LESSON.LAST"));
        const continueBanner = document.querySelector(".continue-banner");
        if (lastLesson) {
            continueBanner.href = `./lekcje/${lastLesson.lessonSlug}`;
            continueBanner.querySelector(".continue-course-name-span").innerText =
                lastLesson.course;
            continueBanner.querySelector(".continue-lesson-name-span").innerText =
                lastLesson.lesson;
        } else {
            continueBanner.style.display = "none";
        }
    });
})();
