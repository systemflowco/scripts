(() => {
    class Lesson {
        constructor(elem) {
            this.slug = window.easyLmsInfo.lessonSlug;
            this.courseName = window.easyLmsInfo.courseName;
            this.lessonName = window.easyLmsInfo.lessonName;
            this.productId = window.easyLmsInfo.ecProductId;
            this.userId = window._EC_USER_ID;

            this.webhookUrlField = document.querySelector("[data-easylms-webhook-url]");
            this.webhookUrl = webhookUrlField ? webhookUrlField.value : "";

            this.finishBtn = document.querySelector("[data-lms-finish-btn]");
            this.finishedBtn = document.querySelector("[data-lms-finished-btn]");
            this.nextLessonBtn = document.querySelector("[data-lms-next-btn]");
            this.autoplayBtn = document.querySelector("[data-lms-autoplay-btn] input");
            this.lessons = document.querySelectorAll(".course-content-lesson");

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

            //if no easyJson Script do not wait for data
            if (typeof easy_json === "undefined") {
                this.checking();
            } else {
                //maybe they are already here available
                if (window.easyJSON) {
                    this.checking();
                    // if not wait for data from easyJSON
                } else {
                    $(document).on("easyJsonReady", this.checking.bind(this));
                }
            }

            this.finishBtn.addEventListener("click", this.toggleFinishStatus.bind(this));
            $(document).on("finishLesson", this.finishLesson.bind(this));
            $(document).on("nextLesson", this.goToNextLesson.bind(this));
            $(document).on("videoProgress", (event, progress) => {
                this.updateLastLessonProgress(progress);
            });
            $(document).on("playerReady", this.checkLastLesson.bind(this));
        }
        checking() {
            this.checkIfAutoplay();
            this.checkIfFinished();
            this.checkAllLessons();
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
            this.saveLsAndEj(this.KEY_LAST, {
                lesson: this.lessonName,
                lessonSlug: this.slug,
                course: this.courseName,
            });
            this.sendWebhook({
                type: "lastLesson",
                location: window.location.href,
                ecUserId: this.userId,
                ecProductId: this.productId,
                lessonName: this.lessonName,
                lessonSlug: this.lessonSlug,
                courseName: this.courseName,
            });
        }
        updateLastLessonProgress(progress) {
            this.saveLsAndEj(this.KEY_LAST, {
                lesson: this.lessonName,
                lessonSlug: this.slug,
                course: this.courseName,
                progress: Math.round(progress),
            });
        }
        checkIfAutoplay() {
            this.autoplayMode = this.readLsAndEj(this.KEY_AUTOPLAY) || false;
            setTimeout(() => {
                if (this.autoplayMode) {
                    this.autoplayBtn.click();
                }
                this.autoplayBtn.addEventListener("click", this.toggleAutoplayMode.bind(this));
            }, 500);
        }
        toggleAutoplayMode() {
            this.autoplayMode = !this.autoplayMode;
            this.saveLsAndEj(this.KEY_AUTOPLAY, this.autoplayMode);
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
            if (circle && circle.r) {
                const radius = circle.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference;
                const offset = circumference - (progress / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        }
        toggleFinishStatus() {
            this.finishBtn.style.display = "none";
            this.finishedBtn.style.display = "flex";
            if (this.finishedLessons.indexOf(this.slug) == -1) {
                this.finishedLessons.push(this.slug);
            }
            this.checkAllLessons();
            this.sendWebhook({
                type: "lessonFinished",
                location: window.location.href,
                ecUserId: this.userId,
                ecProductId: this.productId,
                lessonName: this.lessonName,
                lessonSlug: this.lessonSlug,
                courseName: this.courseName,
            });
            this.saveLsAndEj(this.KEY_FINISH, this.finishedLessons);
        }
        finishLesson() {
            this.toggleFinishStatus();

            if (this.autoplayMode) {
                setTimeout(() => {
                    $(document).trigger("nextLesson");
                }, 1000);
            }
        }
        saveLsAndEj(key, value) {
            const obj = {};
            obj[key] = JSON.stringify(value);
            localStorage.setItem(key, obj[key]);
            if (typeof easy_json !== "undefined") {
                easy_json.patch(obj);
            }
        }
        readLsAndEj(key) {
            if (window.easyJSON && window.easyJSON[key]) {
                let value = window.easyJSON[key];
                //update localStorage in case they are different
                localStorage.setItem(key, value);
                return JSON.parse(value);
            }
            return JSON.parse(localStorage.getItem(key));
        }
        sendWebhook(data) {
            if (this.webhookUrl) {
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", this.webhookUrl, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(data));
            }
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Lesson();
    });
})();
