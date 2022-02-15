(() => {
    class Lesson {
        constructor(elem) {
            this.pathname = location.pathname;
            this.slug = this.pathname.match(/(?<=lekcje\/).+/)[0];
            this.finishBtn = document.querySelector("[data-lms-finish-btn]");
            this.finishedBtn = document.querySelector("[data-lms-finished-btn]");
            this.nextLessonBtn = document.querySelector("[data-lms-next-btn]");
            this.autoplayBtn = document.querySelector("[data-lms-autoplay-btn] input");
            this.lessons = document.querySelectorAll(".course-content-lesson");
            this.lessonTitle = document.querySelector(
                ".course-content-lesson.w--current .lesson-name"
            ).innerText;
            this.courseTitle = document.querySelector(".course-title-progress").innerText;

            this.KEY_FINISH = "LESSON.FINISH";
            this.KEY_LAST = "LESSON.LAST";
            this.KEY_AUTOPLAY = "LESSON.AUTOPLAY";

            this.autoplayMode = false;
            this.finishedLessons = [];
            this.lastLesson = "";

            this.assignEvents();
        }
        assignEvents() {
            this.saveLastLesson();
            this.checkIfAutoplay();
            this.checkIfFinished();
            this.checkAllLessons();
            this.finishBtn.addEventListener("click", this.toggleFinishStatus.bind(this));
            $(document).on("finishLesson", this.finishLesson.bind(this));
            $(document).on("nextLesson", this.goToNextLesson.bind(this));
            $(document).on("videoProgress", (event, progress) => {
                this.updateLastLessonProgress(progress);
            });
            $(document).on("playerReady", this.checkLastLesson.bind(this));
        }
        checkLastLesson() {
            this.lastLesson = this.readLsAndEj(this.KEY_LAST);
            if (!this.lastLesson) return;
            if (this.lastLesson.lessonSlug == this.slug) {
                if (this.lastLesson.progress) {
                    $(document).trigger("goToVideoSecond", this.lastLesson.progress);
                }
            }
        }
        saveLastLesson() {
            const obj = {};
            obj[this.KEY_LAST] = JSON.stringify({
                lesson: this.lessonTitle,
                lessonSlug: this.slug,
                course: this.courseTitle,
            });
            this.saveLsAndEj(obj);
        }
        updateLastLessonProgress(progress) {
            const obj = {};
            obj[this.KEY_LAST] = JSON.stringify({
                lesson: this.lessonTitle,
                lessonSlug: this.slug,
                course: this.courseTitle,
                progress: Math.round(progress),
            });
            this.saveLsAndEj(obj);
        }
        checkIfAutoplay() {
            this.autoplayMode = this.readLsAndEj(this.KEY_AUTOPLAY) || false;
            setTimeout(() => {
                if (this.autoplayMode) {
                    this.autoplayBtn.click();
                }
                this.autoplayBtn.addEventListener("click", this.toggleAutoplayMode.bind(this));
            }, 300);
        }
        toggleAutoplayMode() {
            this.autoplayMode = !this.autoplayMode;

            const obj = {};
            obj[this.KEY_AUTOPLAY] = JSON.stringify(this.autoplayMode);
            this.saveLsAndEj(obj);
        }
        goToNextLesson() {
            this.nextLessonBtn.click();
        }
        checkIfFinished() {
            this.finishedLessons = this.readLsAndEj(this.KEY_FINISH) || [];

            if (this.finishedLessons.indexOf(this.slug) > -1) {
                this.toggleFinishStatus();
            }
        }
        checkAllLessons() {
            let nOfFinished = 0;
            this.lessons.forEach((lesson) => {
                lesson.slug = lesson.href.match(/(?<=lekcje\/).+/)[0];
                if (this.finishedLessons.indexOf(lesson.slug) > -1) {
                    lesson.querySelector(".not-done").style.display = "none";
                    lesson.querySelector(".is-done").style.display = "block";
                    nOfFinished++;
                }
            });
            const progress = Math.round(100 * (nOfFinished / this.lessons.length));
            document.querySelector(".course-progress-circle-text").innerText = `${progress}%`;
            const circle = document.querySelector(".progress-ring__circle");
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            const offset = circumference - (progress / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
        toggleFinishStatus() {
            this.finishBtn.style.display = "none";
            this.finishedBtn.style.display = "flex";
            if (this.finishedLessons.indexOf(this.slug) == -1) {
                this.finishedLessons.push(this.slug);
            }
            this.checkAllLessons();

            const obj = {};
            obj[this.KEY_FINISH] = JSON.stringify(this.finishedLessons);
            this.saveLsAndEj(obj);
        }
        finishLesson() {
            this.toggleFinishStatus();

            if (this.autoplayMode) {
                setTimeout(() => {
                    $(document).trigger("nextLesson");
                }, 1000);
            }
        }
        saveLsAndEj(obj) {
            const key = Object.keys(obj)[0];
            localStorage.setItem(key, obj[key]);
            if (typeof easy_json !== "undefined") {
                easy_json.patch(obj);
            }
        }
        readLsAndEj(key) {
            if (window.easyJSON && window.easyJSON[key]) {
                return JSON.parse(window.easyJSON[key]);
            }
            return JSON.parse(localStorage.getItem(key));
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Lesson();
    });
})();
