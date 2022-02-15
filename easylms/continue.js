(() => {
    function checkLastLesson() {
        const continueBanner = document.querySelector(".continue-banner");
        const KEY_LAST = "LESSON.LAST";
        let lastLesson = "";
        if (window.easyJSON && window.easyJSON[KEY_LAST]) {
            lastLesson = JSON.parse(window.easyJSON[KEY_LAST]);
        } else {
            lastLesson = JSON.parse(localStorage.getItem(KEY_LAST));
        }

        if (lastLesson) {
            continueBanner.href = `./lekcje/${lastLesson.lessonSlug}`;
            continueBanner.querySelector(".continue-course-name-span").innerText =
                lastLesson.course;
            continueBanner.querySelector(".continue-lesson-name-span").innerText =
                lastLesson.lesson;
        } else {
            continueBanner.style.display = "none";
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        //if no easyJson Script do not wait for data
        if (typeof easy_json === "undefined") {
            checkLastLesson();
        } else {
            //maybe they are already here available
            if (window.easyJSON) {
                checkLastLesson();
                // if not wait for data from easyJSON
            } else {
                $(document).on("easyJsonReady", checkLastLesson);
            }
        }
    });
})();
