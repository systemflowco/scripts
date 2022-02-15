(() => {
    class Lesson {
        constructor(elem) {
            this.pathname = location.pathname;
            this.slug = this.pathname.match(/(?<=lekcje\/).+/)[0];
            this.finishBtn = document.querySelector("[data-lms-finish-btn]");
            this.finishedBtn = document.querySelector("[data-lms-finished-btn]");
            this.nextLessonBtn = document.querySelector("[data-lms-next-btn]");
            this.autoplayBtn = document.querySelector("[data-lms-autoplay-btn] input");
            this.KEY_FINISH = "LESSON.FINISH";
            this.KEY_LAST = "LESSON.LAST";
            this.KEY_AUTOPLAY = "LESSON.AUTOPLAY";
            this.autoplayMode = JSON.parse(localStorage.getItem(this.KEY_AUTOPLAY)) || false;
            this.finishedLessons = JSON.parse(localStorage.getItem(this.KEY_FINISH)) || [];
            this.lessons = document.querySelectorAll(".course-content-lesson");
            this.lessonTitle = document.querySelector(
                ".course-content-lesson.w--current .lesson-name"
            ).innerText;
            this.courseTitle = document.querySelector(".course-title-progress").innerText;
            this.lastLesson = JSON.parse(localStorage.getItem(this.KEY_LAST));
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

            localStorage.setItem(this.KEY_LAST, obj[this.KEY_LAST]);
            if (easyJSON) {
                easyJSON.patch(obj);
            }
        }
        updateLastLessonProgress(progress) {
            const obj = {};
            obj[this.KEY_LAST] = JSON.stringify({
                lesson: this.lessonTitle,
                lessonSlug: this.slug,
                course: this.courseTitle,
                progress: Math.round(progress),
            });

            localStorage.setItem(this.KEY_LAST, obj[this.KEY_LAST]);
            if (easyJSON) {
                easyJSON.patch(obj);
            }
        }
        checkIfAutoplay() {
            setTimeout(() => {
                if (this.autoplayMode) {
                    this.autoplayBtn.click();
                }
                this.autoplayBtn.addEventListener("click", this.toggleAutoplayMode.bind(this));
            }, 300);
        }
        toggleAutoplayMode() {
            this.autoplayMode = !this.autoplayMode;
            localStorage.setItem(this.KEY_AUTOPLAY, JSON.stringify(this.autoplayMode));
        }
        goToNextLesson() {
            this.nextLessonBtn.click();
        }
        checkIfFinished() {
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
            this.finishedLessons.push(this.slug);
            this.checkAllLessons();
            localStorage.setItem(this.KEY_FINISH, JSON.stringify(this.finishedLessons));
        }
        finishLesson() {
            this.toggleFinishStatus();

            if (this.autoplayMode) {
                setTimeout(() => {
                    $(document).trigger("nextLesson");
                }, 1000);
            }
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Lesson();
    });
})();
