(() => {
    function checkLastLesson() {
        const continueBanner = document.querySelector(".continue-banner");
        const continueButtons = document.querySelectorAll(".continue-button");
        const KEY_LAST = "LESSON.LAST";
        let lastLesson = "";
        if (window.easyJSON && window.easyJSON[KEY_LAST]) {
            lastLesson = JSON.parse(window.easyJSON[KEY_LAST]);
        } else {
            lastLesson = JSON.parse(localStorage.getItem(KEY_LAST));
        }

        if (lastLesson) {
            if (continueBanner) {
                continueBanner.href = `${location.origin}/lekcje/${lastLesson.lessonSlug}`;
                continueBanner.querySelector(".continue-course-name-span").innerText =
                    lastLesson.course;
                continueBanner.querySelector(".continue-lesson-name-span").innerText =
                    lastLesson.lesson;
            }
            continueButtons.forEach((btn) => {
                btn.href = `${location.origin}/lekcje/${lastLesson.lessonSlug}`;
            });
        } else {
            if (continueBanner) {
                continueBanner.style.display = "none";
            }
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
