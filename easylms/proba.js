/*@cc_on;document.querySelectorAll||(document.querySelectorAll=function(e){var c,t=document.createElement('style'),i=[];for(document.documentElement.firstChild.appendChild(t),document._qsa=[],t.styleSheet.cssText=e+'{x-qsa:expression(document._qsa && document._qsa.push(this))}',window.scrollBy(0,0),t.parentNode.removeChild(t);document._qsa.length;)(c=document._qsa.shift()).style.removeAttribute('x-qsa'),i.push(c);return document._qsa=null,i}),document.querySelector||(document.querySelector=function(e){var t=document.querySelectorAll(e);return t.length?t[0]:null});@*/ !(function () {
    var t = function (e) {
            return e.replace(/^\s+|\s+$/g, "");
        },
        c = function (e) {
            return new RegExp("(^|\\s+)" + e + "(\\s+|$)");
        },
        i = function (e, t, c) {
            for (var i = 0; i < e.length; i++) t.call(c, e[i]);
        };
    function e(e) {
        this.element = e;
    }
    (e.prototype = {
        add: function () {
            i(
                arguments,
                function (e) {
                    this.contains(e) ||
                        (this.element.className = t(this.element.className + " " + e));
                },
                this
            );
        },
        remove: function () {
            i(
                arguments,
                function (e) {
                    this.element.className = t(this.element.className.replace(c(e), " "));
                },
                this
            );
        },
        toggle: function (e) {
            return this.contains(e) ? (this.remove(e), !1) : (this.add(e), !0);
        },
        contains: function (e) {
            return c(e).test(this.element.className);
        },
        item: function (e) {
            return this.element.className.split(/\s+/)[e] || null;
        },
        replace: function (e, t) {
            this.remove(e), this.add(t);
        },
    }),
        "classList" in Element.prototype ||
            Object.defineProperty(Element.prototype, "classList", {
                get: function () {
                    return new e(this);
                },
            }),
        window.DOMTokenList &&
            !DOMTokenList.prototype.replace &&
            (DOMTokenList.prototype.replace = e.prototype.replace);
})();
Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (e, t) {
        "use strict";
        var c;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
            n = o.length >>> 0;
        if (0 === n) return -1;
        var i = 0 | t;
        if (i >= n) return -1;
        for (c = Math.max(i >= 0 ? i : n - Math.abs(i), 0); c < n; c++)
            if (c in o && o[c] === e) return c;
        return -1;
    });
var CookieScript = function () {
    this.version = "20211221";
    this.onAcceptAll = function () {};
    this.onAccept = function () {};
    this.onReject = function () {};
    this.onClose = function () {};
    this.currentState = function () {
        var e = { action: d("action") };
        var t = d("key");
        if (t) {
            e.key = t;
        }
        e.categories = M();
        return e;
    };
    this.expireDays = function () {
        return q;
    };
    this.hash = function () {
        return we;
    };
    this.show = function () {
        I();
    };
    this.hide = function () {
        w();
        b();
    };
    this.categories = function () {
        return i;
    };
    this.getCookieValueForQueryArg = function () {
        var e = t.get(r);
        if (e) {
            return r + "=" + encodeURIComponent(e);
        }
        return "";
    };
    this.dispatchEventNames = [];
    this.currentLang = null;
    this.iabCMP = null;
    this.getCMPId = function () {
        return Number(be);
    };
    this.getIABSdkUrl = function () {
        return je;
    };
    this.getIABText = function () {
        return ge;
    };
    this.getIABTextTranslations = function () {
        return ye;
    };
    this.showIABSpecificTab = function (e) {
        return !1;
    };
    this.setCMPCookie = function (e) {
        n("CMP", e);
    };
    this.getCMPCookie = function () {
        return d("CMP");
    };
    this.forceDispatchCSLoadEvent = function () {
        p("CookieScriptLoaded");
    };
    this.applyTranslation = function (e) {
        y(e);
    };
    this.applyCurrentCookiesState = function () {
        S();
    };
    this.applyTranslationByCode = function (e, t) {
        if (t === undefined) {
            t = {
                rebuildIab: !!document.querySelector(
                    'div[data-cs-maintab-content="setting_advertising"]'
                ),
            };
        }
        Me(e, t);
    };
    this.acceptAllAction = function () {
        ae(!0);
        var t = "acceptall",
            e = O(i);
        w();
        n("action", "accept");
        u();
        A(i);
        D(i);
        n("categories", JSON.stringify(e));
        f(!0);
        o(!0, "ad");
        o(!0, "analytics");
        N("accept", e.join(","));
        h(t, "");
        x(!0);
        b();
        it();
        C();
        F("selectAll");
    };
    this.acceptAction = function (e) {
        var t;
        if (typeof e === "undefined") {
            t = Ve();
            A(t);
        } else {
            if (U) {
                e.push("strict");
            }
            t = m(e);
            pe(t);
        }
        var c = O(t);
        if (t.length === i.length) {
            u();
            f(!0);
            o(!0, "ad");
            o(!0, "analytics");
        } else {
            u(t);
            f(!0, t);
            o(!0, "ad", t);
            o(!0, "analytics", t);
        }
        D(t);
        L(t);
        if (c.length > 0) {
            n("action", "accept");
            n("categories", JSON.stringify(c));
            N("accept", c.join(","));
            h("accept", c.join(","));
        } else {
            n("action", "reject");
            n("categories", []);
            N("reject", "");
            h("reject", "");
        }
        F("setOnlyChecked");
        w();
        x(t.length === i.length);
        b();
        nt(t);
        C();
    };
    this.rejectAllAction = function () {
        ae(!1);
        A([]);
        h("reject", "");
        n("action", "reject");
        n("categories", JSON.stringify([]));
        N("reject", "");
        L();
        w();
        x(!1);
        b();
        ot();
        C();
        f(!1);
        o(!1, "ad");
        o(!1, "analytics");
        F("rejectAll");
    };
    this.demoLoadView = function () {
        l("Warning is real site script");
    };
    var c = this,
        kt =
            "\n    <style data-type=\"cookiescriptstyles\">\n      #cookiescript_injected {\r\n    background-color: #2d2d2d;\r\n    z-index: 999997;\r\n    opacity: 1;\r\n    font-size: 14px;\r\n    font-weight: normal;\r\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\r\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.35);\r\n    color: #FFFFFF;\r\n    box-sizing: border-box;\r\n}\r\n.cookiescript_checkbox_label {\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    padding:0 4px;\r\n    line-height: 1.5;\r\n    margin:0;\r\n}\r\n#cookiescript_close {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    font-size: 29px;\r\n    line-height: 13px;\r\n    cursor: pointer;\r\n    color: #FFFFFF;\r\n    height: 15px;\r\n    width: 15px;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow: hidden;\r\n    letter-spacing: 0;\r\n    font-family: 'Trebuchet MS', 'Arial', sans-serif;\r\n    font-weight: 100;\r\n    opacity: 0.85;\r\n    z-index: 999999;\r\n}\r\n\r\n#cookiescript_buttons {\r\n    display: flex;\r\n    flex-direction: row;\r\n    font-weight: 700;\r\n}\r\n#cookiescript_manage_wrap {\r\n    text-transform: uppercase;\r\n    text-align: center;\r\n    font-size: 11px;\r\n    letter-spacing: 0.1px;\r\n    font-weight: 500;\r\n}\r\n#cookiescript_manage {\r\n    display: inline;\r\n    cursor: pointer;\r\n    color: #FFFFFF;\r\n    opacity:0.85;\r\n}\r\n#cookiescript_manage #cookiescript_manageicon .cookiescript_gear {\r\n    fill: #FFFFFF;\r\n}\r\n#cookiescript_manage:hover #cookiescript_manageicon .cookiescript_gear {\r\n    fill: #6BBE6B;;\r\n}\r\n\r\nsvg#cookiescript_manageicon {\r\n    width: 15px;\r\n    height: 15px;\r\n    display: inline;\r\n    margin: 0 5px 0 0;\r\n    padding: 0;\r\n    position: relative;\r\n    top: 3px;\r\n    vertical-align: baseline;\r\n}\r\n#cookiescript_header {\r\n    background-color: transparent;\r\n    z-index: 999998;\r\n    color: #FFFFFF;\r\n    font-size: 17px;\r\n    line-height: 1.3;\r\n    font-weight: 600;\r\n    letter-spacing: 0.4px;\r\n    opacity:1;\r\n}\r\n.cookiescript_checkbox {\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\ninput.cookiescript_checkbox_input {\r\n}\r\nspan.cookiescript_checkbox_text {\r\n    display: inline-block;\r\n    font-size: 11px;\r\n    margin: 0;\r\n    text-transform: uppercase;\r\n    font-weight: 500;\r\n    color: #FFFFFF;\r\n}\r\n#cookiescript_accept,\r\n#cookiescript_save {\r\n    border: 0;\r\n    transition: all 0.25s ease 0s;\r\n    background-color: #6BBE6B;\r\n    color: #FFFFFF;\r\n    text-transform: uppercase;\r\n    font-size: 11px;\r\n    text-align: center;\r\n    line-height: 3.3;\r\n    letter-spacing: 0.4px;\r\n}\r\n/*IE 9 fixes*/\r\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\r\n    .cookiescript_checkbox_label {\r\n        position: relative;\r\n        top:-10px;\r\n    }\r\n    #cookiescript_accept, #cookiescript_reject, #cookiescript_save{\r\n    \tdisplay: inline-block;\r\n    }\r\n    #cookiescript_buttons{\r\n    \ttext-align:center;\r\n    }\r\n}\r\n#cookiescript_save{\r\n    display: none;\r\n}\r\n#cookiescript_reject {\r\n    border: 1px solid #FFFFFF;\r\n    text-align: center;\r\n    line-height: 3;\r\n    font-size: 11px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.4px;\r\n    color: #FFFFFF;\r\n    background: #2d2d2d;\r\n}\r\n\r\n\r\n#cookiescript_accept, #cookiescript_reject, #cookiescript_save {\r\n    font-weight: 500;\r\n    cursor: pointer;\r\n    white-space: nowrap;\r\n    transition-duration: 100ms;\r\n    transition-timing-function: ease-in-out;\r\n    min-width: 103px;\r\n}\r\n.cookiescript_bigger {\r\n    transform: scale(1.1);\r\n}\r\n#cookiescript_link {\r\n    text-decoration: none;\r\n    color: #FFFFFF;\r\n    font-size: 9px;\r\n    text-align: center;\r\n    font-weight: 400;\r\n    text-transform: uppercase;\r\n    opacity: 0.8;\r\n\tdisplay:inline !important;\r\n}\r\n\r\n#cookiescript_readmore,\r\n#cookiescript_reportlink,\r\n#cookiescript_cookiescriptlink {\r\n    border: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    margin: 0;\r\n    transition: all 100ms ease 0s;\r\n    background-color: transparent;\r\n    color: #FFFFFF;\r\n    display: inline;\r\n    font-size: 11px;\r\n}\r\n\r\n#cookiescript_description {\r\n    color: #FFFFFF;\r\n    font-size: 11px;\r\n    letter-spacing: 0.3px;\r\n    line-height: 1.8;\r\n    font-weight: 400;\r\n    opacity: 0.85;\r\n}\r\n#cookiescript_checkboxs {\r\n}\r\n#cookiescript_close:hover,\r\n#cookiescript_manage:hover,\r\n#cookiescript_link:hover\r\n{\r\n    opacity: 1;\r\n}\r\n\r\n#cookiescript_reject:hover {\r\n    background-color: #3e3e3e;\r\n}\r\n\r\n#cookiescript_accept:hover,\r\n#cookiescript_save:hover {\r\n    background-color: #63b063;\r\n}\r\n\r\n#cookiescript_readmore:hover,\r\n#cookiescript_reportlink:hover,\r\n#cookiescript_cookiescriptlink:hover\r\n{\r\n    color: #6BBE6B;\r\n}\r\n\r\n#cookiescript_badge {\r\n    position: fixed;\r\n    line-height: 0;\r\n    cursor: pointer;\r\n    z-index: 99999;\r\n    font-size: 0;\r\n    color: #999;\r\nleft: 10px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    opacity: 1;\r\n}\r\n\r\n#cookiescript_badgetext{\r\n    text-transform: uppercase;\r\n    font-weight: 600;\r\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\r\n    overflow: hidden;\r\n    transition-duration: 500ms;\r\n    white-space: nowrap;\r\n    padding-right: 0;\r\n    color: #FFFFFF;\r\n}\r\n\r\n#cookiescript_badgesvg{\r\n    width:40px;\r\n    height: 40px;\r\n}\r\n\r\n\r\n\r\n#cookiescript_badge {\r\nbottom: 10px;\r\n    border-radius:25px;\r\n    padding:3px;\r\n    transition-duration: 500ms;\r\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.2);\r\n    background: #2d2d2d;\r\n}\r\n#cookiescript_badge:hover #cookiescript_badgetext{\r\n    max-width: 300px;\r\n    padding-right: 15px;\r\n    padding-left: 12px;\r\n}\r\n#cookiescript_badgetext {\r\n    font-size: 16px;\r\n    line-height: 2.5;\r\n    max-width: 0;\r\n}\r\n#cookiescript_badgeimage {\r\n    width: 40px;\r\n    height: 40px;\r\n}\r\n@media only screen and (max-width: 414px) {\r\n    #cookiescript_badgeimage {\r\n        width: 30px;\r\n        height: 30px;\r\n    }\r\n    #cookiescript_badgesvg{\r\n        width:30px;\r\n        height: 30px;\r\n    }\r\n    #cookiescript_badgetext{\r\n        display: none;\r\n    }\r\n}\r\n/*IE 9 fixes*/\r\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\r\n\t#cookiescript_badgeimage{\r\n    \tfloat:left;\r\n    }\r\n}\r\n\r\n@media print{\r\n    #cookiescript_injected{\r\n        display:none;\r\n    }\r\n}\r\n\r\n\r\n\r\n\n#cookiescript_injected_fsd {\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(17, 17, 17, 0.5) !important;\n    z-index: 999996;\n\toverflow-y: auto;\n}\n\n#cookiescript_fsd_wrapper {\n    max-width: 850px;\n\twidth: 95%;\n    margin: 0 auto 3% auto;\n\ttop: 10%;\n    line-height: 18px;\n    letter-spacing: normal;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n\tbackground-color: #f3f3f3;\n    z-index: 999997;\n    opacity: 1;\n    font-size: 14px;\n    font-weight: normal;\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.35);\n    color: #4d4d4d;\n    align-items: center;\n    overflow: hidden;\n    outline: none;\n    max-height: 80%;\n    box-sizing: border-box;\n\tcursor: default;\n\tmin-height: 500px;\n}\n\n\n.cookiescript_fsd_header {\n\tmin-height: 57px;\n\tborder-bottom: 1px solid #e2e2e2;\n\twidth: 100%;\n\tdisplay: flex;\n\tflex-direction: row;\n\talign-items: center;\n\tbackground-color: #ffffff;\n}\n.cookiescript_fsd_logo_a{\n\tmargin-left: 20px;\n}\n.cookiescript_fsd_logo{\n\theight: 27px;\n\twidth: auto;\n\tdisplay: block;\n\tmax-width: 100%;\n}\n.cookiescript_fsd_language_drop_down {\n    position: absolute;\n    right: 75px;\n\ttop: 17px;\n}\n\n.cookiescript_fsd_main {\n    width: 100%;\n\tbackground-color: #ffffff;\n}\n\n.cookiescript_fsd_main_info {\n    padding: 25px 50px;\n}\n\n.cookiescript_fsd_title {\n    background-color: transparent;\n    z-index: 999998;\n    color: #4d4d4d;\n    font-size: 17px;\n    line-height: 1.3;\n    font-weight: 600;\n    opacity:1;\n}\n\n.cookiescript_fsd_description {\n    color: #4d4d4d;\n    font-size: 13px;\n    line-height: 1.6;\n    font-weight: 400;\n    opacity: 0.85;\n\tmargin-top: 21px;\n}\n\n#cookiescript_fsd_wrapper #cookiescript_readmore{\n\tfont-size: 13px;\n\tcolor: #3fb6ee;\n\ttext-decoration: none;\n}\n#cookiescript_fsd_wrapper #cookiescript_readmore:hover{\n\ttext-decoration: underline;\n}\n\n.cookiescript_fsd_tabs {\n    display: flex;\n    justify-content: space-around;\n    align-items: stretch;\n\tflex-direction: row;\n    width: 100%;\n}\n\n.cookiescript_fsd_tabs > div {\n\tcursor: pointer;\n\twidth: 50%;\n\ttext-transform: uppercase;\n\tfont-size: 14px;\n\ttext-align: center;\n\tline-height: 1.7;\n\tfont-weight: bold;\n\tborder-top: 1px solid transparent;\n\ttransition: all 300ms ease 0s;\n\tpadding: 12px 20px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground-color: #ffffff;\n}\n\n.cookiescript_fsd_tabs > .cookiescript_active {\n    border-top: 1px solid #3fb6ee;\n    background-color: #f3f3f3;\n    color: #3fb6ee;\n}\n\n.cookiescript_fsd_tabs_content {\n    background-color: #f3f3f3;\n    padding: 5px 50px 10px 50px;\n    width: 100%;\n    overflow-y: auto;\n    box-sizing: border-box;\n\t--scrollbar-width: 8px;\n\t--mask-height: 35px;\n\t--mask-image-content: linear-gradient( to bottom, transparent, black var(--mask-height), black calc(100% - var(--mask-height)), transparent );\n\t--mask-size-content: calc(100% - var(--scrollbar-width)) 100%;\n\t--mask-image-scrollbar: linear-gradient(black, black);\n\t--mask-size-scrollbar: var(--scrollbar-width) 100%;\n\tmask-image: var(--mask-image-content), var(--mask-image-scrollbar);\n\tmask-size: var(--mask-size-content), var(--mask-size-scrollbar);\n\tmask-position: 0 0, 100% 0;\n\tmask-repeat: no-repeat, no-repeat;\n\t-webkit-mask-image: var(--mask-image-content), var(--mask-image-scrollbar);\n\t-webkit-mask-size: var(--mask-size-content), var(--mask-size-scrollbar);\n\t-webkit-mask-position: 0 0, 100% 0;\n\t-webkit-mask-repeat: no-repeat, no-repeat;\n}\n\n.cookiescript_fsd_tabs_content .cookiescript_hidden {\n    opacity: 0;\n    height: 0 !important;\n    overflow: hidden;\n\tpadding: 0 !important;\n\tmin-height: 0 !important;\n}\n\n.cookiescript_fsd_category {\n    border-bottom: 1px solid #e2e2e2;\n    padding-top: 23px;\n    padding-bottom: 17px;\n    display: flex;\n    flex-direction: column;\n}\n\n.cookiescript_fsd_category:last-child {\n    border-bottom: 0;\n}\n\n.cookiescript_fsd_category .cookiescript_hidden {\n    opacity: 0;\n\toverflow-y: auto;\n\toverflow-x: hidden;\n\tpadding: 0 !important;\n\tmax-height: 0;\n\tmargin: 0;\n\theight: auto !important;\n\t\ttransition: max-height 300ms ease 200ms, opacity ease 200ms, margin-top 100ms ease 100ms;\n\t}\n\n.cookiescript_fsd_category_main {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n}\n\n.cookiescript_fsd_category_info {\n    flex: 5;\n    padding-right: 10px;\n}\n\n.cookiescript_fsd_category_control {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n}\n\n.cookiescript_fsd__category_name {\n    font-size: 14px;\n    font-weight: 600;\n\tmargin-bottom: 8px;\n}\n\n.cookiescript_category_description {\n\tfont-size: 13px;\n\tpadding-bottom: 5px;\n\tline-height: 1.6;\n}\n\n.cookiescript_fsd_cookies {\n\tborder: 1px solid #e2e2e2;\n\tborder-radius: 5px;\n\toverflow-y: auto;\n\tmargin-top: 15px;\n\tmax-height: 222px;\n\t\ttransition: max-height 300ms ease, opacity 200ms ease 300ms, margin-top 100ms ease 100ms;\n\t}\n\n\n.cookiescript_fsd_cookies_control {\n    color: #3fb6ee;\n    text-transform: uppercase;\n    font-size: 11px;\n    font-weight: 700;\n    position: relative;\n    display: flex;\n    align-items: center;\n    margin-right: auto;\n    margin-top: 10px;\n    cursor: pointer;\n}\n\n.cookiescript_fsd_cookies_control .cookiescript_hidden {\n    display: none;\n}\n\n.cookiescript_fsd_cookies_control  span{\n\tmargin-right: 7px;\n}\n\n.cookiescript_fsd_cookies_control svg {\n    width: 10px;\n    height: 10px;\n    font-size: 10px;\n}\n\n.cookiescript_fsd_cookies_control.active svg {\n    width: 10px;\n    height: 10px;\n    font-size: 10px;\n    transform: rotate(180deg);\n}\n\n.cookiescript_fsd_cookies_table {\n    width: 100%;\n}\n\n.cookiescript_fsd_cookies_table,\n.cookiescript_fsd_cookies_table tbody,\n.cookiescript_fsd_cookies_table thead,\n.cookiescript_fsd_cookies_table tr,\n.cookiescript_fsd_cookies_table th,\n.cookiescript_fsd_cookies_table td {\n    margin: 0;\n    padding: 0;\n    font: inherit;\n    vertical-align: baseline;\n    background-color: #ffffff;\n    border-spacing: 0;\n    border-collapse: collapse;\n}\n\n\n.cookiescript_fsd_cookies_table tr:last-child td{\n    border-bottom: 0;\n}\n\n.cookiescript_fsd_cookies_table td, .cookiescript_fsd_cookies_table th {\n    white-space: normal;\n    font-size: 13px;\n    text-align: left;\n    margin: 0;\n}\n.cookiescript_fsd_cookies_table th {\n\tfont-weight: 600;\n\tpadding: 0 8px;\n\tline-height: 3;\n\tword-break: keep-all;\n}\n\n.cookiescript_fsd_cookies_table td {\n\tpadding: 7px 8px;\n\tline-height: 1.6;\n\tvertical-align: top;\n\tfont-weight: 400;\n\tborder: 0;\n\tborder-top: 1px solid #e2e2e2;\n\tcolor: #4d4d4d;\n}\n\n.cookiescript_fsd_cookies_table th:last-child {\n    padding-right: 10px;\n}\n\n    .cookiescript_fsd_cookies_table td:nth-child(1), .cookiescript_fsd_cookies_table th:nth-child(1) {\n    padding-left: 15px;\n    word-break: normal;\n}\n\n.cookiescript_fsd_cookies_table td:nth-child(2) {\n    color: #3fb6ee;\n}\n\n.cookiescript_fsd_cookies_table td:nth-child(3), .cookiescript_fsd_cookies_table th:nth-child(3) {\n    text-align: center;\n}\n\n\n.cookiescript_fsd_footer {\n    border-top: 1px solid #e2e2e2;\n    width: 100%;\n\tbackground-color: #ffffff;\n}\n#cookiescript_fsd_wrapper #cookiescript_declarationwrap{\n\t\ttransition: opacity 200ms ease 0ms, height 0ms ease 200ms;\n\t}\n#cookiescript_fsd_wrapper #cookiescript_aboutwrap{\n\tfont-size: 13px;\n\tpadding: 23px 0;\n\tline-height: 1.6;\n\ttext-align: left;\n\tfont-weight: normal;\n\tbox-sizing: border-box;\n\ttransition: opacity 200ms ease 0ms;\n\toverflow: auto;\n\tmin-height: 181px;\n}\n\n#cookiescript_setting_advertising_wrap {\n    font-size: 12px;\n}\n\n#cookiescript_iab_type {\n    display: flex;\n    justify-content: center;\n    padding: 20px 0;\n    border-bottom: 1px solid #e2e2e2;\n    flex-wrap: wrap;\n}\n\n#cookiescript_iab_type > div {\n    cursor: pointer;\n    padding: 0 9px;\n    font-size: 11px;\n    font-weight: 600;\n    background: #f5f5f5;\n    color: #4d4d4d;\n    line-height: 2;\n    margin: 3px 5px;\n    white-space: nowrap;\n}\n\n#cookiescript_iab_type .cookiescript_active {\n    background: #3fb6ee;\n    color: #FEFEFE;\n}\n\n\n.cookiescript_fsd_cookies::-webkit-scrollbar-track,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-track {\n    background-color: #DADADA;\n}\n\n.cookiescript_fsd_cookies::-webkit-scrollbar,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n}\n\n.cookiescript_fsd_cookies::-webkit-scrollbar-thumb,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-thumb {\n    background-color: #6BBE6B;\n}\n\n\n\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\n    #cookiescript_iab_type > div{\n        display:inline-block;\n    }\n}\n\n/* --- OVERRIDE ----*/\n\n#cookiescript_injected_fsd #cookiescript_close {\n\ttop: 18px;\n\tfont-size: 37px;\n\tright: 25px;\n\tcolor: #4d4d4d;\n\theight: 18px;\n\twidth: 18px;\n}\n\n#cookiescript_injected_fsd #cookiescript_buttons {\n    justify-content: flex-start;\n    padding: 5px 15px;\n}\n\n#cookiescript_injected_fsd #cookiescript_accept, #cookiescript_injected_fsd #cookiescript_save, #cookiescript_injected_fsd #cookiescript_reject {\n\t\tflex-grow: unset;\n\t\tpadding: 0px 25px;\n\tmargin: 10px 5px;\n\tfont-size: 13px;\n\tborder-radius: 30px;\n\tline-height: 3;\n}\n#cookiescript_injected_fsd #cookiescript_buttons{\n\tflex-direction: row;\n}\n#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_reject {\n    margin-right: auto;\n}\n\n#cookiescript_injected_fsd .cookiescript-iab-itemContainer {\n    border: 1px solid #e2e2e2;\n\tbackground-color: #ffffff;\n\tpadding: 10px;\n}\n\n#cookiescript_injected_fsd .cookiescript-iab-header,\n#cookiescript_injected_fsd .cookiescript-iab-itemHeader,\n#cookiescript_injected_fsd .cookiescript-iab-itemHeaderAction {\n    color: #4d4d4d;\n}\n\n#cookiescript_injected_fsd .cookiescript-iab-itemHeaderAction {\n    border-color: #4d4d4d;;\n}\n\n#cookiescript_injected_fsd #cookiescript_accept {\n    background-color: #ffffff;\n    color: #4d4d4d;\n    border: 1px solid #4d4d4d;\n    order: 1}\n\n#cookiescript_injected_fsd #cookiescript_accept:hover {\n    background-color: #ececec;\n}\n\n#cookiescript_injected_fsd #cookiescript_reject {\n    background-color: #ffffff;\n    color: #4d4d4d;\n    border: 1px solid #4d4d4d;\n    order: 2}\n\n#cookiescript_injected_fsd #cookiescript_reject:hover {\n    background-color: #ececec;\n}\n\n#cookiescript_injected_fsd #cookiescript_save {\n    display: inline-block;\n    background-color: #6BBE6B;\n    color: #ffffff;\n    border: 1px solid #6BBE6B;\n    order: 3}\n\n#cookiescript_injected_fsd #cookiescript_save:hover {\n    background-color: #63b063;\n}\n\n/*Switches color reload*/\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after {\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {\n    background: #68b968;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {\n    background: #68b968;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after {\n    background: #68b968;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled:active .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n\n#cookiescript_fsd_wrapper {\n    border-radius: 10px;\n}\n\n#cookiescript_iab_type > div {\n    border-radius: 20px;\n}\n.cookiescript_fsd_cookies::-webkit-scrollbar-track,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-track\n#cookiescript_iabwrap::-webkit-scrollbar-thumb,\n#cookiescript_aboutwrap::-webkit-scrollbar-thumb{\n    border-radius: 6px;\n}\n.cookiescript_fsd_cookies::-webkit-scrollbar-thumb,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-thumb,\n#cookiescript_iabwrap::-webkit-scrollbar-thumb,\n#cookiescript_aboutwrap::-webkit-scrollbar-thumb{\n    border-radius: 5px;\n}\n\n@media only screen and (max-width: 414px) {\n\t#cookiescript_fsd_wrapper {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tmax-height: 100%;\n\t\ttop: 0;\n\t\tborder-radius: 0;\n\t\tmargin: 0;\n\t}\n\n\t.cookiescript_fsd_main_info {\n\t\tpadding: 13px 20px;\n\t\toverflow-y: auto;\n\t\tmax-height: 140px;\n\t}\n\t.cookiescript_fsd_description{\n\t\tmargin-top: 8px;\n\t}\n\t.cookiescript_fsd_tabs > div {\n\t\tpadding: 6px;\n\t\tfont-size: 12px;\n\t}\n\n\t.cookiescript_fsd_tabs_content {\n\t\tpadding: 5px 20px 10px 20px;\n\t}\n\n\t.cookiescript_fsd_cookies_table thead {\n\t\tdisplay: none;\n\t}\n\n\t.cookiescript_fsd_cookies_table td {\n\t\tdisplay: flex;\n\t\tborder-bottom: 0px;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr td:last-child {\n\t\tborder-bottom: 0;\n\t}\n\n\t.cookiescript_fsd_cookies_table td {\n\t\tborder-top: 0;\n\t}\n\n\t.cookiescript_fsd_cookies_table td::before {\n\t\tcontent: attr(label);\n\t\tfont-weight: bold;\n\t\twidth: 120px;\n\t\tmin-width: 120px;\n\t\ttext-align: left;\n\t}\n\n\t.cookiescript_fsd_cookies_table td:nth-child(2):before {\n\t\tcolor: #4d4d4d;\n\t}\n\n\t.cookiescript_category_description {\n\t\ttext-align: left;\n\t}\n\n\t.cookiescript_fsd_cookies_table td:nth-child(1),\n\t.cookiescript_fsd_cookies_table th:nth-child(1) {\n\t\tpadding-left: 7px;\n\t\tfont-weight: bold;\n\t\tborder-top: 1px solid #e2e2e2;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr:nth-child(1) td:nth-child(1),\n\t.cookiescript_fsd_cookies_table tr:nth-child(1) th:nth-child(1) {\n\t\tborder-top: 0px;\n\t}\n\n\t.cookiescript_fsd_cookies_table td:last-child {\n\t\tborder-bottom: none;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr:nth-child(even) {\n\t\tbackground: #f5f5f5;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr:nth-child(even) td {\n\t\tborder-bottom: 0px solid #FFF;\n\t}\n\n\t#cookiescript_injected_fsd #cookiescript_buttons {\n\t\tmargin-bottom: 0;\n\t}\n\n\t#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_accept,\n\t#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_save,\n\t#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_reject {\n\t\tflex-grow: 1;\n\t\tmargin-left: 10px;\n\t\tmargin-right: 10px;\n\t\tmargin-top: 5px;\n\t\tmargin-bottom: 5px;\n\t\tpadding: 0 15px;\n\t}\n\n\t.cookiescript_fsd_language_drop_down {\n\t\tright: 40px;\n\t}\n\n\t#cookiescript_injected_fsd #cookiescript_close{\n\t\tright:14px;\n\t}\n\t\n\n}\n\n\n\r\n\r\n.cookiescript_rtl {\r\n    direction:rtl;\r\n}\r\n\r\n\r\n/*Start Checkboxes*/\r\n#cookiescript_injected_fsd .mdc-checkbox,\r\n#cookiescript_injected .mdc-checkbox {\r\n    box-sizing: content-box !important;\r\n}\r\n#cookiescript_injected_fsd .mdc-checkbox__native-control,\r\n#cookiescript_injected .mdc-checkbox__native-control {\r\n    display: block;\r\n    z-index: 1;\r\n}\r\n#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before, \r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before, \r\n#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,\r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before {\r\n    background-color: #FFFFFF;\r\n}\r\n\r\n#cookiescript_injected .mdc-checkbox,#cookiescript_injected_fsd .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:#FFFFFF}@supports not (-ms-ime-align:auto){#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:var(--mdc-theme-secondary, #FFFFFF)}}#cookiescript_injected .mdc-checkbox .mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control{top:0;right:0;left:0;width:40px;height:40px}#cookiescript_injected .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:#FFFFFF;background-color:transparent}#cookiescript_injected .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:#FFFFFF;background-color:#FFFFFF}#cookiescript_injected .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(255,255,255,0.26);background-color:transparent}#cookiescript_injected .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background{border-color:transparent;background-color:rgba(255,255,255,0.26)}#cookiescript_injected .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#2d2d2d}#cookiescript_injected .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#2d2d2d}#cookiescript_injected .mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid #FFFFFF;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0s cubic-bezier(.4,0,.6,1),border-color 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__background .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__background .mdc-checkbox__background::before{background-color:#000}@supports not (-ms-ime-align:auto){#cookiescript_injected .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0s cubic-bezier(.4,0,.6,1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0s cubic-bezier(0,0,.2,1),background-color 90ms 0s cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}#cookiescript_injected .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__background::before{position:absolute;-webkit-transform:scale(0,0);transform:scale(0,0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{-webkit-transform:scale(1);transform:scale(1);opacity:.12;transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 80ms 0s cubic-bezier(0,0,.2,1);transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1);transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 80ms 0s cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-checkbox__native-control,#cookiescript_injected_fsd .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}#cookiescript_injected .mdc-checkbox__native-control:disabled,#cookiescript_injected_fsd .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 180ms 0s cubic-bezier(0,0,.2,1);transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1);transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 180ms 0s cubic-bezier(0,0,.2,1);opacity:1}#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox,#cookiescript_injected_fsd .mdc-checkbox{-webkit-tap-highlight-color:transparent}}\r\n/*End Checkboxes*/\r\n\r\n\r\n/*Start Toggle*/\r\n\r\n#cookiescript_injected .mdc-elevation-overlay,#cookiescript_injected_fsd .mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 280ms cubic-bezier(.4,0,.2,1);background-color:#fff}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{align-items:center;background:0 0;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:0;overflow:visible;padding:0;position:relative}#cookiescript_injected .mdc-switch:disabled,#cookiescript_injected_fsd .mdc-switch:disabled{cursor:default;pointer-events:none}#cookiescript_injected .mdc-switch input[type=checkbox],#cookiescript_injected_fsd .mdc-switch input[type=checkbox]{display:none;visibility:hidden}#cookiescript_injected .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch__track{overflow:hidden;position:relative;width:100%}#cookiescript_injected .mdc-switch__track::after,#cookiescript_injected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track::before{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;width:100%}#cookiescript_injected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch__track::before{transition:-webkit-transform 75ms 0s cubic-bezier(0,0,.2,1);transition:transform 75ms 0s cubic-bezier(0,0,.2,1);-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track::after{transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.6,1);transition:transform 75ms 0s cubic-bezier(.4,0,.6,1);-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch__track[dir=rtl]::after,#cookiescript_injected [dir=rtl] .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track[dir=rtl]::after,#cookiescript_injected_fsd [dir=rtl] .mdc-switch__track::after{-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track::before{transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.6,1);transition:transform 75ms 0s cubic-bezier(.4,0,.6,1);-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track[dir=rtl]::before,#cookiescript_injected [dir=rtl] .mdc-switch--selected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track[dir=rtl]::before,#cookiescript_injected_fsd [dir=rtl] .mdc-switch--selected .mdc-switch__track::before{-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track::after{transition:-webkit-transform 75ms 0s cubic-bezier(0,0,.2,1);transition:transform 75ms 0s cubic-bezier(0,0,.2,1);-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.2,1);transition:transform 75ms 0s cubic-bezier(.4,0,.2,1);left:0;right:auto;-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch__handle-track[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch__handle-track{left:auto;right:0}#cookiescript_injected .mdc-switch--selected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__handle-track{-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:0;right:auto}#cookiescript_injected .mdc-switch__handle[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch__handle[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch__handle{left:auto;right:0}#cookiescript_injected .mdc-switch__handle::after,#cookiescript_injected .mdc-switch__handle::before,#cookiescript_injected_fsd .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch__handle::before{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0s cubic-bezier(.4,0,.2,1),border-color 75ms 0s cubic-bezier(.4,0,.2,1);z-index:-1}#cookiescript_injected .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}#cookiescript_injected .mdc-elevation-overlay,#cookiescript_injected_fsd .mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}#cookiescript_injected .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch__ripple{left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:-1}#cookiescript_injected .mdc-switch:disabled .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__ripple{display:none}#cookiescript_injected .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}#cookiescript_injected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0s cubic-bezier(.4,0,1,1)}#cookiescript_injected .mdc-switch--selected .mdc-switch__icon--on,#cookiescript_injected .mdc-switch--unselected .mdc-switch__icon--off,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__icon--on,#cookiescript_injected_fsd .mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{will-change:transform,opacity}@-webkit-keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}to{-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}}@keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}to{-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}}@-webkit-keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.1}}@keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.1}}@-webkit-keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.1}to{opacity:0}}@keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.1}to{opacity:0}}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after{z-index:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before{-webkit-transform:scale(1);transform:scale(1)}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--unbounded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--unbounded .mdc-switch__ripple::after{top:0;left:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--foreground-activation .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--foreground-activation .mdc-switch__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--foreground-deactivation .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--foreground-deactivation .mdc-switch__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before{top:0;left:0;width:0;height:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after{width:0;height:0}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{width:36px}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:#616161}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:#424242}#cookiescript_injected .mdc-switch .mdc-switch__handle::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle::before{background:#fff}#cookiescript_injected .mdc-switch:enabled .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__shadow{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);--mdc-elevation-box-shadow-for-gss:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)}#cookiescript_injected .mdc-switch:disabled .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__shadow{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);--mdc-elevation-box-shadow-for-gss:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{height:20px}#cookiescript_injected .mdc-switch:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__handle::after{opacity:.38}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{border-radius:10px}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{width:20px}#cookiescript_injected .mdc-switch .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle-track{width:calc(100% - 20px)}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:.38}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:.38}#cookiescript_injected .mdc-switch.mdc-switch--selected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:18px;height:18px}#cookiescript_injected .mdc-switch.mdc-switch--unselected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:18px;height:18px}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before{opacity:.04}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:.12}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:.1}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before{opacity:.04}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:.12}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:.1}#cookiescript_injected .mdc-switch .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple{height:48px;width:48px}#cookiescript_injected .mdc-switch .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__track{height:14px}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track{opacity:.12}#cookiescript_injected .mdc-switch:enabled .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:active .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track::after{background:#424242}#cookiescript_injected .mdc-switch:enabled .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:active .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:active .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track::before{background:#424242}#cookiescript_injected .mdc-switch .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__track{border-radius:7px}@media screen and (forced-colors:active),(-ms-high-contrast:active){#cookiescript_injected .mdc-switch:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__handle::after{opacity:1}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:1}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:1}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track{opacity:1}}\r\n/*End Toggle*/\r\n\r\n#cookiescript_injected {\r\nbottom: 20px;\r\nleft: 20px;\r\n    position: fixed;\r\n    padding: 15px 20px 15px 20px;\r\n    width: 300px;\r\n    text-align: left;\r\n    max-height: 85%;\r\n    overflow-y: auto;\r\n    max-width: calc(100% - 40px);\r\n}\r\n#cookiescript_copyright {\r\n    line-height: 1;\r\n    text-align: center;\r\n}\r\n#cookiescript_buttons {\r\n    justify-content: space-between;\r\n    margin: 0 -5px 0 -5px;\r\n    flex-wrap: wrap;\r\n}\r\n#cookiescript_manage_wrap {\r\n    margin: 0 0 11px 0;\r\n}\r\n#cookiescript_header {\r\n    padding: 14px 0 12px;\r\n    text-align: left;\r\n    margin: 0;\r\n}\r\n#cookiescript_checkboxs {\r\n    margin: -6px 0 18px -11px;\r\n}\r\n.cookiescript_checkbox {\r\n    margin: 0 0 -10px 0;\r\n}\r\n#cookiescript_accept,\r\n#cookiescript_save,\r\n#cookiescript_reject {\r\n    flex-grow: 1;\r\n    padding: 0 7px;\r\n    margin: 0 5px 10px 5px;\r\n}\r\n#cookiescript_description {\r\n    margin: 0 0 12px;\r\n}\r\n\r\n.cookiescript_checkbox_label{\r\n    padding: 0;\r\n    margin: 0 10px 0 -2px;\r\n}\r\n\r\n#cookiescript_injected{\r\n    transition: width 200ms 600ms;\r\n}\r\n\r\n#cookiescript_injected.hascookiereport{\r\n    width:600px;\r\n    transition: width 200ms 0ms;\r\n}\r\n#cookiescript_cookietablewrap {\r\n    transition: height 300ms 200ms, min-height 300ms 200ms, max-height 300ms 200ms, opacity 200ms 300ms;\r\n}\r\n#cookiescript_cookietablewrap.cookiescript_hidden {\r\n    transition: height 300ms 200ms, min-height 300ms 200ms, max-height 300ms 200ms, opacity 200ms 0ms;\r\n}\r\n\r\n#cookiescript_accept, #cookiescript_reject, #cookiescript_save {\r\n\tborder-radius: 20px;\r\n}\r\n\r\n#cookiescript_injected {\r\n\tborder-radius: 10px;\r\n}\r\n\r\n@media only screen and (max-width: 414px) {\r\n    #cookiescript_injected{\r\n    bottom: 0;\r\n    left: 0;\r\n        width: 100%;\r\n        padding: 15px;\r\n        border-radius:0;\r\n\t\tmax-width: 100%;\r\n    }\r\n    #cookiescript_description,\r\n    #cookiescript_buttons,\r\n    #cookiescript_manage_wrap,\r\n    #cookiescript_checkboxs\r\n    {\r\n        margin-bottom: 8px;\r\n    }\r\n    #cookiescript_header{\r\n        padding-top:5px;\r\n    }\r\n    #cookiescript_checkboxs {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n    }\r\n    #cookiescript_injected {\r\n\t\tmax-height: 100%;\r\n\t}\r\n}\r\n\r\n\n    </style>\n  ",
        mt =
            '<div id="cookiescript_injected" data-nosnippet class="">\n    <div id="cookiescript_close" tabindex="0" role="button" aria-label="Close">\u00d7</div>\n  <div id="cookiescript_header" data-cs-i18n-text="{&quot;pl&quot;:&quot;Ta strona u\\u017cywa plik\\u00f3w cookie&quot;}">\n    Ta strona u\u017cywa plik\u00f3w cookie  </div>\n  <div id="cookiescript_description">\n    <span data-cs-desc-box="true" data-cs-i18n-text="{&quot;pl&quot;:&quot;Ta strona korzysta z plik\\u00f3w cookie, aby zapewni\\u0107 lepsz\\u0105 wygod\\u0119 u\\u017cytkowania. Korzystaj\\u0105c z tej strony, wyra\\u017casz zgod\\u0119 na u\\u017cywanie przez nas wszystkich plik\\u00f3w cookie zgodnie z warunkami naszej polityki plik\\u00f3w cookie.&quot;}" data-cs-i18n-read="Ta strona korzysta z plik\u00f3w cookie, aby zapewni\u0107 lepsz\u0105 wygod\u0119 u\u017cytkowania. Korzystaj\u0105c z tej strony, wyra\u017casz zgod\u0119 na u\u017cywanie przez nas wszystkich plik\u00f3w cookie zgodnie z warunkami naszej polityki plik\u00f3w cookie.">\n      Ta strona korzysta z plik\u00f3w cookie, aby zapewni\u0107 lepsz\u0105 wygod\u0119 u\u017cytkowania. Korzystaj\u0105c z tej strony, wyra\u017casz zgod\u0119 na u\u017cywanie przez nas wszystkich plik\u00f3w cookie zgodnie z warunkami naszej polityki plik\u00f3w cookie.    </span>\n\n    \n      \n      <a\n        id="cookiescript_readmore"\n        data-cs-i18n-text="{&quot;pl&quot;:&quot;Dowiedz si\\u0119 wi\\u0119cej&quot;}"\n        data-cs-i18n-url="{&quot;pl&quot;:&quot;\\/policy.html&quot;}"\n        href="/policy.html"\n        target="_blank"\n      >\n        Dowiedz si\u0119 wi\u0119cej      </a>\n\n      </div>\n  <div id="cookiescript_checkboxs">\n                                    </div>\n  <div id="cookiescript_buttons">\n          <div id="cookiescript_save" tabindex="0" role="button" data-cs-i18n-text="{&quot;pl&quot;:&quot;Zapisz i zamknij&quot;}">\n        Zapisz i zamknij      </div>\n              <div id="cookiescript_accept" tabindex="0" role="button" data-cs-i18n-text="{&quot;pl&quot;:&quot;Akceptuj wszystkie&quot;}">\n        Akceptuj wszystkie      </div>\n              <div id="cookiescript_reject" tabindex="0" role="button" data-cs-i18n-text="{&quot;pl&quot;:&quot;Odrzu\\u0107 wszystkie&quot;}">\n        Odrzu\u0107 wszystkie      </div>\n      </div>\n\n  <div id="cookiescript_manage_wrap" tabindex="0" role="button">\n    <div id="cookiescript_manage">\n      <svg id="cookiescript_manageicon" viewBox="0 0 9.62 9.57">\n        <g id="Layer_2">\n          <g id="Layer_1-2">\n            <path class="cookiescript_gear" d="M9.46,6.06l-1.1-.78c0-.16.06-.31.06-.47a1.27,1.27,0,0,0-.06-.47L9.57,3.4l-1.15-2L7,1.93a2.74,2.74,0,0,0-.83-.47L6,0H3.61L3.35,1.46a7.14,7.14,0,0,0-.79.47L1.15,1.36,0,3.4l1.15.94c0,.16,0,.31,0,.47a1.51,1.51,0,0,0,0,.47l-1,.78A.75.75,0,0,0,0,6.17l1.15,2,1.41-.58a2.49,2.49,0,0,0,.84.47l.21,1.47H6a.53.53,0,0,1,0-.21L6.22,8.1a4,4,0,0,0,.84-.47l1.41.58,1.15-2A.75.75,0,0,0,9.46,6.06Zm-4.65.19A1.47,1.47,0,1,1,6.28,4.78,1.47,1.47,0,0,1,4.81,6.25Z"></path>\n          </g>\n        </g>\n      </svg>\n      <span data-cs-show-title="cookie-script" data-cs-i18n-text="{&quot;pl&quot;:&quot;Poka\\u017c szczeg\\u00f3\\u0142y&quot;}">\n        Poka\u017c szczeg\u00f3\u0142y      </span>\n      <span style="display: none" data-cs-hide-title="cookie-script" data-cs-i18n-text="{&quot;pl&quot;:&quot;Ukryj szczeg\\u00f3\\u0142y&quot;}">\n        Ukryj szczeg\u00f3\u0142y      </span>\n    </div>\n  </div>\n\t<div class="cookiescript_hidden" id="cookiescript_cookietablewrap">\n\t\t\t</div>\n\t\n  <div id="cookiescript_copyright">\n    <a href="https://cookie-script.com" target="_blank" id="cookiescript_link">\n      Powered by cookie-script\n    </a>\n  </div>\n</div>\n',
        fe =
            '  \n  <div id="cookiescript_badge">\n          <div id="cookiescript_badgeimage">\n        <svg id="cookiescript_badgesvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320.28 320.28">\n          <defs>\n            <style>\n              .cookiescriptlogo {fill: #22b8f0;}\n            </style>\n          </defs>\n          <title>Cookie-Script logo</title>\n          <g id="cs_layer_2" data-name="cs_layer_2">\n            <g id="cs_layer_1" data-name="cs_layer_1">\n              <path class="cookiescriptlogo" d="M160.14,0A160.14,160.14,0,1,0,320.28,160.14,160.14,160.14,0,0,0,160.14,0Zm0,301.49A141.35,141.35,0,1,1,301.49,160.14,141.35,141.35,0,0,1,160.14,301.49Z"/>\n              <circle class="cookiescriptlogo" cx="98.09" cy="106.52" r="35.11"/>\n              <circle class="cookiescriptlogo" cx="88.27" cy="200.63" r="14.09"/>\n              <circle class="cookiescriptlogo" cx="151.17" cy="251.06" r="22.63"/>\n              <circle class="cookiescriptlogo" cx="238.42" cy="180.9" r="30.49"/>\n              <circle class="cookiescriptlogo" cx="206.65" cy="86.27" r="18.53"/>\n            </g>\n          </g>\n        </svg>\n      </div>\n              <div id="cookiescript_badgetext" data-cs-i18n-text="{&quot;pl&quot;:&quot;Ustawienia plik\\u00f3w cookie&quot;}">\n        Ustawienia plik\u00f3w cookie      </div>\n      </div>\n',
        ht =
            '\n<div id="cookiescript_injected_fsd" data-nosnippet class="">\n  <div id="cookiescript_fsd_wrapper" tabindex="0" role="button">\n    <div class="cookiescript_fsd_header">\n\t  \t\t<a href="https://cookie-script.com" target="_blank" class="cookiescript_fsd_logo_a" style="visibility: visible !important; opacity: 1 !important; display: block !important; position: static !important; transform: none !important; filter: none !important; clip-path: none !important; width: auto !important; height: auto !important; max-width: 40% !important; max-height: 100% !important;"><img alt="CookieScript Consent Management Platform" class="cookiescript_fsd_logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyMjAwIDM2MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjIwMCAzNjA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM2NjY2NjY7fQ0KCS5zdDF7ZmlsbDojMjJCOEYwO30NCjwvc3R5bGU+DQo8Zz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTY4LjEsMjQzYzEuNi0wLjgsMy44LTEuMiw2LjYtMS4yYzIuOSwwLDUuMywxLjEsNy40LDMuNGMyLjEsMi4zLDMuMSw0LjksMy4xLDcuOGMwLDUuMy0yLjIsOS4xLTYuNSwxMS4yDQoJCWMtOS4zLDUuMS0xOS4xLDkuNS0yOS43LDEzYy0xMC41LDMuNS0yMy4xLDUuMy0zNy44LDUuM2MtMTQuNywwLTI4LjMtMi40LTQwLjktNy4yYy0xMi42LTQuOC0yMy41LTExLjktMzIuOC0yMS4xDQoJCWMtMTkuNy0xOS4zLTI5LjUtNDUuMi0yOS41LTc3LjdjMC0zMi41LDkuOC01OC40LDI5LjUtNzcuN2MxOS4xLTE4LjksNDMuNy0yOC40LDczLjgtMjguNGMxNC42LDAsMjcuMSwxLjgsMzcuNyw1LjMNCgkJYzEwLjUsMy41LDE4LjYsNi44LDI0LjIsOS45YzUuNiwzLjEsOSw1LjUsMTAuMiw3LjRjMS4yLDEuOSwxLjgsNC4yLDEuOCw3LjFjMCwyLjktMSw1LjQtMy4xLDcuN2MtMi4xLDIuMy00LjUsMy40LTcuNCwzLjQNCgkJYy0yLjksMC01LjEtMC40LTYuNi0xLjJjLTcuOS00LjEtMTUuOS03LjUtMjQuMi0xMGMtOC4zLTIuNi0xOC42LTMuOC0zMC45LTMuOGMtMTIuMywwLTIzLjQsMi4xLTMzLjQsNi4yDQoJCWMtOS45LDQuMS0xOC4zLDkuOC0yNSwxNy4xYy0xMy4yLDE0LjQtMTkuOCwzMy40LTE5LjgsNTdjMCwyMy42LDYuNiw0Mi42LDE5LjgsNTdjMTQuNCwxNS42LDM0LjIsMjMuMyw1OS40LDIzLjMNCgkJYzExLjYsMCwyMS42LTEuMywyOS44LTMuOEM1NTIuMiwyNTAuNSw1NjAuMywyNDcuMiw1NjguMSwyNDN6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTY3Ny40LDEyNi4xYzIyLjgsMCw0MS4xLDcuMiw1NC45LDIxLjZjMTMuOCwxNC42LDIwLjcsMzMuNSwyMC43LDU2LjdjMCwyMy4yLTYuOSw0Mi4xLTIwLjcsNTYuNw0KCQljLTEzLjgsMTQuNC0zMi4xLDIxLjYtNTQuOSwyMS42Yy0yMywwLTQxLjMtNy4yLTU0LjktMjEuNmMtMTMuOC0xNC40LTIwLjctMzMuMy0yMC43LTU2LjdjMC0yMy40LDYuOS00Mi4zLDIwLjctNTYuNw0KCQlDNjM2LjEsMTMzLjMsNjU0LjQsMTI2LjEsNjc3LjQsMTI2LjF6IE02NDQuNSwyNDUuOGM0LjYsNC4yLDkuOCw3LjMsMTUuNyw5LjNjNS44LDIsMTEuNSwzLDE3LjEsM3MxMS4zLTEsMTcuMS0zDQoJCWM1LjgtMiwxMS4xLTUsMTUuOC05LjJjMTAuNi05LjYsMTUuOS0yMy42LDE1LjktNDEuOWMwLTE3LjctNS4zLTMxLjUtMTUuOS00MS4zYy04LjktOC4xLTE5LjgtMTIuMS0zMi44LTEyLjENCgkJYy0yMS4zLDAtMzYsOS42LTQ0LjMsMjguNmMtMyw2LjktNC40LDE1LjItNC40LDI1YzAsOS43LDEuNSwxOC4xLDQuNCwyNUM2MzYuMSwyMzYsNjM5LjksMjQxLjYsNjQ0LjUsMjQ1Ljh6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTg1MS42LDEyNi4xYzIyLjgsMCw0MS4xLDcuMiw1NC45LDIxLjZjMTMuOCwxNC42LDIwLjcsMzMuNSwyMC43LDU2LjdjMCwyMy4yLTYuOSw0Mi4xLTIwLjcsNTYuNw0KCQljLTEzLjgsMTQuNC0zMi4xLDIxLjYtNTQuOSwyMS42Yy0yMywwLTQxLjMtNy4yLTU0LjktMjEuNmMtMTMuOC0xNC40LTIwLjctMzMuMy0yMC43LTU2LjdjMC0yMy40LDYuOS00Mi4zLDIwLjctNTYuNw0KCQlDODEwLjMsMTMzLjMsODI4LjYsMTI2LjEsODUxLjYsMTI2LjF6IE04MTguNywyNDUuOGM0LjYsNC4yLDkuOCw3LjMsMTUuNyw5LjNjNS44LDIsMTEuNSwzLDE3LjEsM3MxMS4zLTEsMTcuMS0zDQoJCWM1LjgtMiwxMS4xLTUsMTUuOC05LjJjMTAuNi05LjYsMTUuOS0yMy42LDE1LjktNDEuOWMwLTE3LjctNS4zLTMxLjUtMTUuOS00MS4zYy04LjktOC4xLTE5LjgtMTIuMS0zMi44LTEyLjENCgkJYy0yMS4zLDAtMzYsOS42LTQ0LjMsMjguNmMtMyw2LjktNC40LDE1LjItNC40LDI1YzAsOS43LDEuNSwxOC4xLDQuNCwyNUM4MTAuMywyMzYsODE0LjEsMjQxLjYsODE4LjcsMjQ1Ljh6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwODQuNCwyNjAuMmMyLDIuNiwzLDUuNSwzLDguOWMwLDMuNC0xLjMsNi4yLTMuOCw4LjZjLTIuNiwyLjQtNS40LDMuNS04LjYsMy41Yy00LjcsMC04LjgtMS45LTEyLjEtNS42DQoJCWwtNTAuOC02OS4xbC0yNS43LDIzLjN2MzguMWMwLDMuNy0xLjMsNi45LTQsOS41Yy0yLjcsMi42LTUuOSwzLjgtOS42LDMuOGMtMy43LDAtNi45LTEuMy05LjUtMy44Yy0yLjYtMi42LTMuOC01LjctMy44LTkuNVY3Ni4yDQoJCWMwLTMuNywxLjMtNi45LDMuOC05LjZjMi42LTIuNyw1LjctNCw5LjUtNGMzLjcsMCw2LjksMS4zLDkuNiw0YzIuNywyLjcsNCw1LjksNCw5LjZWMTk3bDcwLjMtNjVjMy4xLTIuNiw2LjctMy44LDEwLjYtMy44DQoJCWMzLjksMCw2LjgsMS40LDguNiw0LjNjMS44LDIuOSwyLjcsNS4zLDIuNyw3LjJjMCw0LjMtMS43LDguMi01LDExLjVsLTQyLjUsMzguMUwxMDg0LjQsMjYwLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTExMjAuNCwxMzEuNGMyLjYtMi42LDUuOC0zLjgsOS42LTMuOGMzLjgsMCw3LDEuMyw5LjYsMy44YzIuNiwyLjYsMy44LDUuOCwzLjgsOS43djEyNi43DQoJCWMwLDMuNy0xLjMsNi45LTMuOCw5LjVjLTIuNiwyLjYtNS44LDMuOC05LjYsMy44Yy0zLjgsMC03LTEuMy05LjYtMy44Yy0yLjYtMi42LTMuOC01LjctMy44LTkuNVYxNDEuMQ0KCQlDMTExNi41LDEzNy4yLDExMTcuOCwxMzQsMTEyMC40LDEzMS40eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjE5LjMsMjQ1LjdjOC41LDcuOSwyMC4zLDExLjgsMzUuNCwxMS44YzE1LjIsMCwyNy45LTIuNiwzOC4xLTcuN2MzLjUtMS44LDYuNi0yLjcsOS4yLTIuNw0KCQljMi42LDAsNSwxLjEsNy40LDMuMmMyLjQsMi4yLDMuNSw0LjYsMy41LDcuNGMwLDUuMS0yLjEsOC44LTYuMywxMS4xYy00LjIsMi4zLTgsNC4yLTExLjQsNS44Yy0zLjQsMS42LTcsMy0xMC45LDQuMQ0KCQljLTguOSwyLjYtMTkuMSwzLjgtMzAuNywzLjhjLTI0LjIsMC00My02LjgtNTYuNC0yMC40Yy0xMy40LTEzLjYtMjAuMS0zMi45LTIwLjEtNTcuOWMwLTIxLjcsNS42LTM5LjcsMTYuOC01NA0KCQljMTIuNi0xNi4xLDMwLjUtMjQuMiw1My43LTI0LjJjMjIsMCwzOS41LDcuNSw1Mi4zLDIyLjRjMTIsMTQsMTgsMzEuMywxOCw1MmMwLDMuNy0xLjIsNi45LTMuNyw5LjVjLTIuNSwyLjYtNS44LDMuOC05LjksMy44DQoJCWgtMTAwLjFDMTIwNS44LDIyNy4yLDEyMTAuOCwyMzcuOCwxMjE5LjMsMjQ1Ljd6IE0xMjQ3LjcsMTQ4LjhjLTE3LjUsMC0zMC4zLDcuOC0zOC40LDIzLjNjLTMsNS41LTQuNiwxMi4xLTUsMTkuOGg4Ny4xDQoJCWMtMC44LTE0LTUuOS0yNS0xNS40LTMzLjFDMTI2OC4xLDE1Mi4yLDEyNTguNywxNDguOCwxMjQ3LjcsMTQ4Ljh6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE0ODguMSwyNTcuMmMzNC41LDAsNTEuNy0xMS4zLDUxLjctMzRjMC05LjUtNi42LTE3LTE5LjgtMjIuN2MtNS43LTIuNC0xMi40LTQuNS0xOS45LTYuMw0KCQljLTcuNi0xLjktMTUuMy0zLjktMjMtNi4xYy03LjgtMi4yLTE1LjUtNC42LTIzLTcuNGMtNy42LTIuOC0xNC4zLTYuMy0yMC4yLTEwLjZjLTEzLTkuOC0xOS41LTIyLjgtMTkuNS0zOQ0KCQljMC0xNy4zLDYuNS0zMS41LDE5LjUtNDIuNWMxNC4yLTEyLDMzLjItMTgsNTctMThjMjEuNSwwLDQxLDMuMiw1OC44LDkuN2M1LjUsMiw4LjMsNS45LDguMywxMS44YzAsMy0xLDUuOC0zLjEsOC40DQoJCWMtMi4xLDIuNy00LjMsNC02LjgsNGMtMi41LDAtNS45LTAuOC0xMC4yLTIuNGMtMTIuOC00LjUtMjcuNS02LjgtNDQtNi44Yy0xNS4yLDAtMjcuNywyLjktMzcuNSw4LjZjLTEwLDUuOS0xNS4xLDE0LjMtMTUuMSwyNS4xDQoJCWMwLDExLjIsNi41LDE5LjcsMTkuNSwyNS40YzUuOSwyLjgsMTIuNiw1LDIwLjEsNi44YzcuNSwxLjgsMTUuMiwzLjYsMjMsNS42YzcuOSwyLDE1LjYsNC4zLDIzLDYuOWM3LjUsMi43LDE0LjIsNi4yLDIwLjEsMTAuNQ0KCQljMTMsOS41LDE5LjUsMjMsMTkuNSw0MC44YzAsMTYuOS02LjgsMzAuNy0yMC40LDQxLjNjLTE0LDEwLjgtMzIuNCwxNi4yLTU1LjIsMTYuMmMtMjUsMC00OC40LTQuNy03MC4zLTE0LjINCgkJYy0yLjItMS00LjEtMi42LTUuOC00LjdjLTEuNy0yLjItMi41LTQuOC0yLjUtNy44YzAtMy4xLDEuMS01LjgsMy4yLTguM2MyLjItMi41LDQuNy0zLjcsNy41LTMuN2MyLjksMCw2LjQsMC45LDEwLjYsMi44DQoJCWM0LjIsMS45LDExLjIsNC4xLDIwLjgsNi42QzE0NjQsMjU1LjksMTQ3NS4zLDI1Ny4yLDE0ODguMSwyNTcuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTY2OC41LDI1Ny41YzExLDAsMjEuNi0yLjgsMzEuNi04LjNjMy41LTIsNi43LTMsOS41LTNjMi44LDAsNS4yLDEuMyw3LjQsMy44YzIuMiwyLjYsMy4yLDUuNiwzLjIsOS4yDQoJCXMtMi4zLDYuOC02LjgsOS43Yy0xNCw5LjEtMjkuNywxMy42LTQ3LjMsMTMuNmMtMjEuOSwwLTQwLjMtNi45LTU1LjItMjAuN2MtMTUuOC0xNC42LTIzLjYtMzMuOC0yMy42LTU3LjYNCgkJYzAtMjMuOCw3LjktNDMsMjMuNi01Ny42YzE1LTEzLjgsMzMuNC0yMC43LDU1LjItMjAuN2MxMS44LDAsMjEuNSwxLjUsMjkuMSw0LjZjNy42LDMuMSwxMy42LDYuMSwxOC4yLDljNC41LDMsNi44LDYuMiw2LjgsOS43DQoJCXMtMS4xLDYuNi0zLjIsOS4yYy0yLjIsMi42LTQuMywzLjgtNi41LDMuOGMtMy40LDAtNi44LTEtMTAuMy0zYy0xMC01LjUtMjAuNi04LjMtMzEuNi04LjNjLTE3LjMsMC0zMC43LDQuOS00MC4yLDE0LjYNCgkJYy05LjUsOS43LTE0LjIsMjIuNi0xNC4yLDM4LjVzNC43LDI4LjgsMTQuMiwzOC41QzE2MzcuOCwyNTIuNiwxNjUxLjIsMjU3LjUsMTY2OC41LDI1Ny41eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNzc2LjksMTUzLjhjMTMuOC0xOC41LDI5LjItMjcuOCw0Ni40LTI3LjhoMS41YzMuNywwLDYuOCwxLjMsOS4zLDMuOGMyLjUsMi42LDMuNyw1LjgsMy43LDkuNg0KCQlzLTEuMyw2LjktMy44LDkuMmMtMi42LDIuMy01LjgsMy40LTkuNywzLjRoLTEuNWMtOS44LDAtMTguNywyLjQtMjYuNCw3LjJjLTcuOCw0LjgtMTQuMiwxMS4xLTE5LjMsMTguOHY4OS44YzAsMy43LTEuMyw2LjktNCw5LjUNCgkJYy0yLjcsMi42LTUuOSwzLjgtOS42LDMuOGMtMy43LDAtNi45LTEuMy05LjUtMy44Yy0yLjYtMi42LTMuOC01LjctMy44LTkuNVYxNDEuMWMwLTMuNywxLjMtNi45LDMuOC05LjZjMi42LTIuNyw1LjctNCw5LjUtNA0KCQljMy43LDAsNi45LDEuMyw5LjYsNGMyLjcsMi43LDQsNS45LDQsOS42VjE1My44eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xODY0LDEzMS40YzIuNi0yLjYsNS44LTMuOCw5LjYtMy44czcsMS4zLDkuNiwzLjhjMi42LDIuNiwzLjgsNS44LDMuOCw5Ljd2MTI2LjdjMCwzLjctMS4zLDYuOS0zLjgsOS41DQoJCWMtMi42LDIuNi01LjgsMy44LTkuNiwzLjhzLTctMS4zLTkuNi0zLjhjLTIuNi0yLjYtMy44LTUuNy0zLjgtOS41VjE0MS4xQzE4NjAuMiwxMzcuMiwxODYxLjQsMTM0LDE4NjQsMTMxLjR6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE5NTYuNCwxNDguNWMxNC42LTE1LDMxLjQtMjIuNCw1MC41LTIyLjRjMTkuMSwwLDM1LjQsNi44LDQ5LDIwLjRjMTUsMTUsMjIuNCwzNC4zLDIyLjQsNTcuOQ0KCQljMCwyNC03LjUsNDMuNC0yMi40LDU4LjJjLTEzLjgsMTMuNC0zMC4yLDIwLjEtNDkuMiwyMC4xYy0xOSwwLTM1LjgtNy41LTUwLjQtMjIuNHY3NS4zYzAsMy45LTEuMyw3LjItMy44LDkuNw0KCQljLTIuNiwyLjYtNS44LDMuOC05LjYsMy44Yy0zLjgsMC03LTEuMy05LjYtMy44Yy0yLjYtMi42LTMuOC01LjgtMy44LTkuN1YxNDAuOGMwLTMuNywxLjMtNi45LDMuOC05LjVjMi42LTIuNiw1LjgtMy44LDkuNi0zLjgNCgkJYzMuOCwwLDcsMS4zLDkuNiwzLjhjMi42LDIuNiwzLjgsNS43LDMuOCw5LjVWMTQ4LjV6IE0xOTU2LjQsMjM1LjRjMTMuNCwxNC44LDI4LjksMjIuMSw0Ni43LDIyLjFjMjIuNCwwLDM3LjQtMTAsNDQuOS0zMC4xDQoJCWMyLjQtNi43LDMuNS0xNC40LDMuNS0yM2MwLTE2LjktNC41LTMwLjItMTMuNi0zOS45Yy04LjctOC45LTIwLjMtMTMuMy0zNC44LTEzLjNjLTE3LjcsMC0zMy4zLDcuNC00Ni43LDIyLjFWMjM1LjR6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIxNjQuNSwyNTljNS4yLDAsOS0wLjQsMTEuMi0xLjNjMi4zLTAuOSw0LjctMS4zLDcuNC0xLjNjMi43LDAsNS4xLDEsNy4yLDNjMi4yLDIsMy4yLDQuOSwzLjIsOC45DQoJCWMwLDMuOS0yLDYuOC01LjksOC42Yy04LjUsMy45LTE1LjcsNS45LTIxLjcsNS45Yy02LDAtMTEuNS0wLjMtMTYuNC0wLjljLTQuOS0wLjYtOS42LTIuMy0xNC4yLTVjLTEwLjgtNi4zLTE2LjItMTcuMy0xNi4yLTMzLjENCgkJdi05MS42aC0yMWMtMy43LDAtNS42LTEuOS01LjYtNS42YzAtMS44LDAuOS0zLjQsMi43LTVsNDAuMi0zOS4zYzEuOC0xLjgsMy40LTIuNyw1LTIuN2MxLjYsMCwyLjksMC42LDQsMS44DQoJCWMxLjEsMS4yLDEuNiwyLjYsMS42LDQuMVYxMjloMzMuNGMzLjMsMCw2LjEsMS4xLDguMywzLjJjMi4yLDIuMiwzLjIsNC45LDMuMiw4LjNjMCwzLjQtMS4xLDYuMS0zLjIsOC4zYy0yLjIsMi4yLTQuOSwzLjItOC4zLDMuMg0KCQlIMjE0NnY4OS4yYzAsNy41LDIuMywxMi42LDYuOCwxNS40QzIxNTUuNCwyNTguMiwyMTU5LjMsMjU5LDIxNjQuNSwyNTl6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ni42LDEwLjlDNzguMSwxMC45LDYuNCw4Mi42LDYuNCwxNzEuMXM3MS43LDE2MC4xLDE2MC4xLDE2MC4xczE2MC4xLTcxLjcsMTYwLjEtMTYwLjFTMjU1LDEwLjksMTY2LjYsMTAuOQ0KCQl6IE0xNjYuNiwzMTIuNGMtNzguMSwwLTE0MS4zLTYzLjMtMTQxLjMtMTQxLjNTODguNSwyOS43LDE2Ni42LDI5LjdTMzA3LjksOTMsMzA3LjksMTcxLjFTMjQ0LjYsMzEyLjQsMTY2LjYsMzEyLjR6Ii8+DQoJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMTA0LjUiIGN5PSIxMTcuNSIgcj0iMzUuMSIvPg0KCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9Ijk0LjciIGN5PSIyMTEuNiIgcj0iMTQuMSIvPg0KCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjE1Ny42IiBjeT0iMjYyIiByPSIyMi42Ii8+DQoJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjQ0LjgiIGN5PSIxOTEuOCIgcj0iMzAuNSIvPg0KCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjIxMy4xIiBjeT0iOTcuMiIgcj0iMTguNSIvPg0KCTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjExMzAuMSIgY3k9IjgyLjciIHI9IjE1LjkiLz4NCgk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxODczLjciIGN5PSI4Mi43IiByPSIxNS45Ii8+DQo8L2c+DQo8L3N2Zz4NCg==" /></a>\n                          <div id="cookiescript_close" tabindex="0" role="button" aria-label="Close">\u00d7</div>\n          </div>\n    <div class="cookiescript_fsd_main">\n      <div class="cookiescript_fsd_main_info">\n        <!-- TITLE -->\n                  <div class="cookiescript_fsd_title" data-cs-i18n-text="{&quot;pl&quot;:&quot;Ta strona u\\u017cywa plik\\u00f3w cookie&quot;}">\n            Ta strona u\u017cywa plik\u00f3w cookie          </div>\n                <!-- END TITLE -->\n\n        <!-- DESCRIPTION -->\n                  <div class="cookiescript_fsd_description">\n            <span data-cs-desc-box="true" data-cs-i18n-text="{&quot;pl&quot;:&quot;Ta strona korzysta z plik\\u00f3w cookie, aby zapewni\\u0107 lepsz\\u0105 wygod\\u0119 u\\u017cytkowania. Korzystaj\\u0105c z tej strony, wyra\\u017casz zgod\\u0119 na u\\u017cywanie przez nas wszystkich plik\\u00f3w cookie zgodnie z warunkami naszej polityki plik\\u00f3w cookie.&quot;}" data-cs-i18n-read="Ta strona korzysta z plik\u00f3w cookie, aby zapewni\u0107 lepsz\u0105 wygod\u0119 u\u017cytkowania. Korzystaj\u0105c z tej strony, wyra\u017casz zgod\u0119 na u\u017cywanie przez nas wszystkich plik\u00f3w cookie zgodnie z warunkami naszej polityki plik\u00f3w cookie.">\n              Ta strona korzysta z plik\u00f3w cookie, aby zapewni\u0107 lepsz\u0105 wygod\u0119 u\u017cytkowania. Korzystaj\u0105c z tej strony, wyra\u017casz zgod\u0119 na u\u017cywanie przez nas wszystkich plik\u00f3w cookie zgodnie z warunkami naszej polityki plik\u00f3w cookie.            </span>\n\n            \n              \n              <a\n                id="cookiescript_readmore"\n                data-cs-i18n-text="{&quot;pl&quot;:&quot;Dowiedz si\\u0119 wi\\u0119cej&quot;}"\n                data-cs-i18n-url="{&quot;pl&quot;:&quot;\\/policy.html&quot;}"\n                href="/policy.html"\n                target="_blank"\n              >\n                Dowiedz si\u0119 wi\u0119cej              </a>\n                      </div>\n                <!-- END DESCRIPTION -->\n      </div>\n    </div>\n    <div class="cookiescript_fsd_tabs" data-cs-maintabs="cookiescript">\n      <div id="cookiescript_declaration" class="cookiescript_active" data-cs-maintab="declaration" data-cs-i18n-text="{&quot;pl&quot;:&quot;O\\u015bwiadczenie o plikach cookie&quot;}">\n        O\u015bwiadczenie o plikach cookie      </div>\n      <div id="cookiescript_aboutcookies" data-cs-maintab="aboutcookies" data-cs-i18n-text="{&quot;pl&quot;:&quot;O plikach cookie&quot;}">\n        O plikach cookie      </div>\n          </div>\n    <div class="cookiescript_fsd_tabs_content">\n      <div id="cookiescript_declarationwrap" data-cs-maintab-content="declaration">\n              </div>\n      <div id="cookiescript_aboutwrap" class="cookiescript_hidden" data-cs-maintab-content="aboutcookies">\n        <span data-cs-i18n-text="{&quot;pl&quot;:&quot;Pliki cookie to ma\\u0142e pliki tekstowe przechowywane na Twoim komputerze przez strony internetowe, kt\\u00f3re przegl\\u0105dasz. Strony internetowe korzystaj\\u0105 z plik\\u00f3w cookie w celu u\\u0142atwienia u\\u017cytkownikom sprawnej nawigacji i wykonywania okre\\u015blonych funkcji. Pliki cookie, kt\\u00f3re s\\u0105 niezb\\u0119dne do prawid\\u0142owego funkcjonowania strony internetowej, nie wymagaj\\u0105 Twojej zgody. Wszystkie inne pliki cookie wymagaj\\u0105 zgody przed ustawieniem ich obs\\u0142ugi w przegl\\u0105darce. \\r\\n\\r\\nMo\\u017cesz w ka\\u017cdej chwili zmieni\\u0107 decyzj\\u0119 na temat korzystania z plik\\u00f3w cookie na naszej stronie dotycz\\u0105cej polityki prywatno\\u015bci.&quot;}">\n          Pliki cookie to ma\u0142e pliki tekstowe przechowywane na Twoim komputerze przez strony internetowe, kt\u00f3re przegl\u0105dasz. Strony internetowe korzystaj\u0105 z plik\u00f3w cookie w celu u\u0142atwienia u\u017cytkownikom sprawnej nawigacji i wykonywania okre\u015blonych funkcji. Pliki cookie, kt\u00f3re s\u0105 niezb\u0119dne do prawid\u0142owego funkcjonowania strony internetowej, nie wymagaj\u0105 Twojej zgody. Wszystkie inne pliki cookie wymagaj\u0105 zgody przed ustawieniem ich obs\u0142ugi w przegl\u0105darce. \r\n\r\nMo\u017cesz w ka\u017cdej chwili zmieni\u0107 decyzj\u0119 na temat korzystania z plik\u00f3w cookie na naszej stronie dotycz\u0105cej polityki prywatno\u015bci.        </span>\n        <div style="display: none;" data-cs-consent-key-box="cookie-script">\n          <span data-cs-i18n-text="{&quot;pl&quot;:&quot;Identyfikator zgody na pliki cookie&quot;}">\n            Identyfikator zgody na pliki cookie          </span>:\n          <span data-cs-consent-key="cookie-script"></span>\n        </div>\n      </div>\n          </div>\n    <div class="cookiescript_fsd_footer">\n      <div id="cookiescript_buttons">\n        <div id="cookiescript_accept" tabindex="0" role="button" data-cs-i18n-text="{&quot;pl&quot;:&quot;Akceptuj wszystkie&quot;}">\n          Akceptuj wszystkie        </div>\n        <div id="cookiescript_reject" tabindex="0" role="button" data-cs-i18n-text="{&quot;pl&quot;:&quot;Odrzu\\u0107 wszystkie&quot;}">\n          Odrzu\u0107 wszystkie        </div>\n        <div id="cookiescript_save" tabindex="0" role="button" data-cs-i18n-text="{&quot;pl&quot;:&quot;Zapisz i zamknij&quot;}">\n          Zapisz i zamknij        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n',
        r = "CookieScriptConsent",
        q = 30,
        ft = window.location.href,
        we = "59e18c80b25f644d82cd94712d76ae67",
        Tt = !1,
        wt = [],
        St = [],
        Ct = [],
        i = [],
        U = 0,
        bt = "bohatertygodnia.pl",
        Dt = "",
        jt = [],
        gt = {};
    var B = !1,
        J = !1,
        be = "0",
        je = "",
        ge = null,
        ye = null,
        G = !1,
        yt = [],
        Lt = !1,
        P = !1,
        s = "pl",
        xt = !1,
        Le = function () {
            return !1;
        },
        T = function (e) {
            if (!B) {
                if (e) {
                    o(!0, "ad", e);
                    o(!0, "analytics", e);
                } else {
                    o(!0, "ad");
                    o(!0, "analytics");
                }
                if (window.gtag) {
                    B = !0;
                }
            }
            if (!J) {
                if (e) {
                    f(!0, e);
                } else {
                    f(!0);
                    if (window.fbq) {
                        J = !0;
                    }
                }
            }
        },
        W = function () {
            S();
            setTimeout(function () {
                S();
            }, 500);
        },
        S = function () {
            var c = function (e) {
                    var t = typeof e === "undefined" ? i : e;
                    if (t.length === i.length) {
                        u();
                        T();
                    } else {
                        u(t);
                        T(t);
                    }
                    for (var c = 0; c < t.length; c++) {
                        a(t[c]);
                    }
                    L(t);
                },
                e = function () {
                    L();
                    u(["strict"]);
                };
            Le();
            if (de()) {
                Z();
                return !0;
            }
            if (E()) {
                if (se()) {
                    var t = M();
                    c(t);
                    return !0;
                } else {
                    e();
                    a("strict");
                    return !0;
                }
            } else {
                e();
                return !0;
            }
        },
        C = function () {
            return !1;
        },
        xe = function (e) {
            return !1;
        },
        Me = function (e, t) {
            if (t === undefined) {
                t = {};
            }
            var o = e;
            if (e === "def_cookie_lang") {
                o = s;
            }
            var m = t["nodeScope"]
                    ? t["nodeScope"].querySelectorAll("[data-cs-i18n-text]")
                    : document.querySelectorAll("[data-cs-i18n-text]"),
                h = t["nodeScope"]
                    ? t["nodeScope"].querySelectorAll("[data-cs-i18n-url]")
                    : document.querySelectorAll("[data-cs-i18n-url]"),
                u,
                k;
            if (typeof m !== "undefined") {
                u = Array.prototype.slice.call(m);
                for (var l = 0; l < u.length; l++) {
                    var d = u[l];
                    try {
                        var i = JSON.parse(d.getAttribute("data-cs-i18n-text"));
                        if (i && i[o] && i[o].length > 0) {
                            d.innerHTML = i[o];
                            if (d.getAttribute("data-cs-i18n-read")) {
                                d.setAttribute("data-cs-i18n-read", i[o]);
                            }
                        } else if (i && i[s] && i[s].length > 0) {
                            d.innerHTML = i[s];
                            if (d.getAttribute("data-cs-i18n-read")) {
                                d.setAttribute("data-cs-i18n-read", i[s]);
                            }
                        }
                    } catch (n) {}
                }
            }
            if (typeof h !== "undefined") {
                k = Array.prototype.slice.call(h);
                for (var p = 0; p < k.length; p++) {
                    var a = k[p];
                    try {
                        var r = JSON.parse(a.getAttribute("data-cs-i18n-url"));
                        if (r && r[o] && r[o].length > 0) {
                            a.setAttribute("href", r[o]);
                        } else if (r && r[s] && r[s].length > 0) {
                            a.setAttribute("href", r[s]);
                        }
                    } catch (n) {}
                }
            }
            if (t["rebuildIab"] && t["rebuildIab"] === !0) {
                re();
            }
            xe(e);
            c.currentLang = o;
        },
        y = function (e) {
            c.currentLang = "pl";
            return !1;
        },
        R = function () {
            var e = document.querySelectorAll('table[data-cs-table-report="cookiescript"]');
            Array.prototype.slice.call(e).forEach(function (e) {
                var i = e.querySelectorAll("thead th"),
                    t = [];
                Array.prototype.slice.call(i).forEach(function (e) {
                    t.push(e.innerText);
                });
                var c = e.querySelectorAll("tbody tr");
                Array.prototype.slice.call(c).forEach(function (e) {
                    Array.prototype.slice.call(e.children).forEach(function (e, c) {
                        e.setAttribute("label", t[c]);
                    });
                });
            });
        },
        u = function (e) {
            var t =
                e && e.length > 0
                    ? '[data-cookiescript="accepted"][data-cookiecategory]'
                    : '[data-cookiescript="accepted"]';
            ve(t, e);
            ze(t, e);
            Ne(t, e);
            Te(t, e);
            Se(t, e);
            Ce(t, e);
        },
        L = function (e) {
            var d = t.get();
            for (var c in d) {
                if (c === r || We(c) || Re(c, e) || Ze(c)) {
                    continue;
                }
                jt.push(c);
                gt[c] = d[c];
                t.remove(c);
                if (t.get(c) !== "undefined") {
                    var s = window.location.hostname.split(".");
                    while (s.length > 0 && t.get(c) !== "undefined") {
                        var n = s.join("."),
                            o = location.pathname.split("/"),
                            i = "/";
                        t.remove(c, { path: i, domain: "" });
                        t.remove(c, { path: i, domain: n });
                        t.remove(c, { path: i, domain: "." + n });
                        while (o.length > 0 && t.get(c) !== "undefined") {
                            i = o.join("/");
                            t.remove(c, { path: i, domain: "" });
                            t.remove(c, { path: i, domain: n });
                            t.remove(c, { path: i, domain: "." + n });
                            o.pop();
                        }
                        s.shift();
                    }
                }
            }
        },
        D = function (e) {
            return !1;
        },
        Z = function (e) {
            if (e === undefined) {
                e = { console: !0 };
            }
            var c = ["strict", "performance", "targeting", "functionality", "unclassified"];
            n("action", "accept");
            var o = O(i);
            n("categories", JSON.stringify(o));
            u();
            D();
            T();
            for (var t = 0; t < c.length; t++) {
                a(c[t]);
            }
            a("all");
            if (e.console) {
                l("_forceAllow - TRUE");
            }
        },
        ve = function (e, t) {
            var o = document.querySelectorAll("img" + e);
            if (o) {
                for (var n = 0; n < o.length; n++) {
                    var i = o[n];
                    if (t && t.length > 0) {
                        var c = i.getAttribute("data-cookiecategory");
                        if (c) {
                            t.forEach(function (e) {
                                c = c.replace(e, "").trim();
                            });
                            if (c.length > 0) {
                                continue;
                            }
                        }
                    }
                    i.setAttribute("src", i.getAttribute("data-src"));
                    i.removeAttribute("data-cookiescript");
                }
            }
        },
        ze = function (e, t) {
            var s = !1,
                r = document.querySelectorAll('script[type="text/plain"]' + e);
            if (r) {
                for (var o = 0; o < r.length; o++) {
                    var i = r[o];
                    if (t && t.length > 0) {
                        var n = i.getAttribute("data-cookiecategory");
                        if (n) {
                            t.forEach(function (e) {
                                n = n.replace(e, "").trim();
                            });
                            if (n.length > 0) {
                                continue;
                            }
                        }
                    }
                    if (i.getAttribute("data-reload") === "true") {
                        s = !0;
                    }
                    var c = document.createElement("script");
                    c.innerHTML = i.innerHTML;
                    var d = Array.prototype.slice.call(i.attributes);
                    d.forEach(function (e) {
                        c.setAttribute(e.name, e.value);
                    });
                    c.setAttribute("type", "text/javascript");
                    c.removeAttribute("data-cookiescript");
                    st(i, c);
                }
            }
            if (s) {
                ct();
            }
        },
        Ne = function (e, t) {
            var o = document.querySelectorAll("iframe" + e);
            if (o) {
                for (var n = 0; n < o.length; n++) {
                    var i = o[n];
                    if (t && t.length > 0) {
                        var c = i.getAttribute("data-cookiecategory");
                        if (c) {
                            t.forEach(function (e) {
                                c = c.replace(e, "").trim();
                            });
                            if (c.length > 0) {
                                continue;
                            }
                        }
                    }
                    i.setAttribute("src", i.getAttribute("data-src"));
                    i.removeAttribute("data-cookiescript");
                }
            }
        },
        Te = function (e, t) {
            var o = document.querySelectorAll("embed" + e);
            if (o) {
                for (var n = 0; n < o.length; n++) {
                    var c = o[n];
                    if (t && t.length > 0) {
                        var i = c.getAttribute("data-cookiecategory");
                        if (i) {
                            t.forEach(function (e) {
                                i = i.replace(e, "").trim();
                            });
                            if (i.length > 0) {
                                continue;
                            }
                        }
                    }
                    c.setAttribute("src", c.getAttribute("data-src"));
                    c.removeAttribute("data-cookiescript");
                    var r = c.outerHTML;
                    ke(c, r);
                }
            }
        },
        Se = function (e, t) {
            var o = document.querySelectorAll("object" + e);
            if (o) {
                for (var n = 0; n < o.length; n++) {
                    var c = o[n];
                    if (t && t.length > 0) {
                        var i = c.getAttribute("data-cookiecategory");
                        if (i) {
                            t.forEach(function (e) {
                                i = i.replace(e, "").trim();
                            });
                            if (i.length > 0) {
                                continue;
                            }
                        }
                    }
                    c.setAttribute("data", c.getAttribute("data-data"));
                    c.removeAttribute("data-cookiescript");
                    var r = c.outerHTML;
                    ke(c, r);
                }
            }
        },
        Ce = function (e, t) {
            var o = document.querySelectorAll("link" + e);
            if (o) {
                for (var n = 0; n < o.length; n++) {
                    var i = o[n];
                    if (t && t.length > 0) {
                        var c = i.getAttribute("data-cookiecategory");
                        if (c) {
                            t.forEach(function (e) {
                                c = c.replace(e, "").trim();
                            });
                            if (c.length > 0) {
                                continue;
                            }
                        }
                    }
                    i.setAttribute("href", i.getAttribute("data-href"));
                    i.removeAttribute("data-cookiescript");
                }
            }
        },
        X = function (e) {
            var t = document.getElementById("cookiescript_wrapper"),
                c = document.getElementById("cookiescript_injected");
            if (t && c) {
                if (!c.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();
                    t.focus();
                }
            }
        },
        H = function () {
            document.addEventListener("focusin", X);
        },
        K = function () {
            document.removeEventListener("focusin", X);
        },
        V = function () {
            if (se()) {
                var e = M();
                pe(e);
            }
        },
        I = function () {
            De();
            var e = document.getElementById("cookiescript_injected");
            if (e) {
                setTimeout(function () {
                    k(e, 200);
                }, 200);
                H();
            } else {
                setTimeout(function () {
                    ne();
                }, 150);
            }
        },
        w = function (e) {
            var c = document.getElementById("cookiescript_injected"),
                t = document.getElementById("cookiescript_injected_fsd");
            if (c) {
                g(c, e || 200);
                Ie();
            }
            if (t) {
                g(t, 200, function () {
                    t.parentNode.removeChild(t);
                });
            }
            K();
        },
        b = function () {
            var e = document.getElementById("cookiescript_badge");
            if (e) {
                setTimeout(function () {
                    k(e, 200);
                }, 200);
            } else {
                oe();
            }
        },
        De = function (e) {
            var t = document.getElementById("cookiescript_badge");
            if (t) {
                g(t, e || 200);
            }
        },
        Mt = function () {
            var e = document.getElementById("cookiescript_cookietablewrap");
            if (e && e.classList.contains("cookiescript_hidden")) {
                e.classList.remove("cookiescript_hidden");
            }
            var t = document.getElementById("cookiescript_injected");
            if (t) {
                t.classList.add("hascookiereport");
            }
            ee(!0);
        },
        Ie = function () {
            var e = document.getElementById("cookiescript_cookietablewrap");
            if (e && !e.classList.contains("cookiescript_hidden")) {
                e.classList.add("cookiescript_hidden");
            }
            var t = document.getElementById("cookiescript_injected");
            if (t) {
                t.classList.remove("hascookiereport");
            }
            ee(!1);
        },
        ee = function (e) {
            var t = document.querySelector(
                    '#cookiescript_manage_wrap span[data-cs-show-title="cookie-script"]'
                ),
                c = document.querySelector(
                    '#cookiescript_manage_wrap span[data-cs-hide-title="cookie-script"]'
                );
            if (t && c) {
                if (e) {
                    g(t, 1);
                    k(c, 1);
                } else {
                    g(c, 1);
                    k(t, 1);
                }
            }
        },
        te = function (e, t, c) {
            var p = e.target || e.srcElement,
                d = p.getAttribute(t);
            if (d && d.length > 0) {
                var s = document.querySelectorAll("div[" + c + "]");
                if (s) {
                    for (var r = 0; r < s.length; r++) {
                        var i = s[r],
                            n = i.getAttribute(c),
                            a = n && n === d,
                            o = document.querySelector("div[" + t + '="' + n + '"]');
                        if (o) {
                            o.classList.remove("cookiescript_active");
                            a && o.classList.add("cookiescript_active");
                        }
                        i.classList.add("cookiescript_hidden");
                        a && i.classList.remove("cookiescript_hidden");
                    }
                }
            }
        },
        ce = function () {
            var t = document.querySelector('[data-cs-consent-key-box="cookie-script"]'),
                c = document.querySelector('[data-cs-consent-key="cookie-script"]');
            if (t && c) {
                var e = d("key");
                if (e && typeof e === "string" && e.length > 0) {
                    c.innerText = e;
                    t.style.display = "";
                }
            }
        },
        Ee = function () {
            var e = document.getElementById("cookiescript_injected");
            if (e) {
                e.parentNode.removeChild(e);
            }
            Qe();
        },
        Oe = function () {
            var t = Ke(),
                c = function (e) {
                    e.classList.remove("mdc-switch--unselected");
                    e.classList.add("mdc-switch--selected");
                },
                i = function (e) {
                    e.classList.remove("mdc-switch--selected");
                    e.classList.add("mdc-switch--unselected");
                };
            e(
                t,
                "click",
                function (e) {
                    var t = e.currentTarget,
                        n,
                        r = t.getAttribute("data-cs-switch");
                    if (t.classList.contains("mdc-switch--selected")) {
                        i(t);
                        n = !1;
                    } else {
                        c(t);
                        n = !0;
                    }
                    var o = document.querySelector(
                        'input[data-cookiescript="checkbox-input"][value="' + r + '"]'
                    );
                    if (r === "strict") {
                        o.checked = !0;
                    } else {
                        o.checked = n;
                    }
                },
                !0
            );
            var n = j();
            e(
                n,
                "change",
                function (e) {
                    var n = e.currentTarget;
                    t.forEach(function (e) {
                        if (n.value === e.getAttribute("data-cs-switch")) {
                            if (n.checked) {
                                c(e);
                            } else {
                                i(e);
                            }
                        }
                    });
                },
                !0
            );
        },
        ie = function () {
            var t = document.getElementById("cookiescript_save"),
                i = document.getElementById("cookiescript_accept"),
                n = document.getElementById("cookiescript_reject"),
                o = document.getElementById("cookiescript_close");
            e(t, "click", function () {
                c.acceptAction();
            });
            e(t, "keydown", function (e) {
                if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                    e.preventDefault();
                    t.click();
                }
            });
            e(i, "click", function () {
                c.acceptAllAction();
            });
            e(i, "keydown", function (e) {
                if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                    e.preventDefault();
                    i.click();
                }
            });
            e(n, "click", function () {
                c.rejectAllAction();
            });
            e(n, "keydown", function (e) {
                if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                    e.preventDefault();
                    n.click();
                }
            });
            e(document.getElementById("cookiescript_readmore"), "click", function () {
                h("readmore", "");
            });
            e(o, "click", function () {
                w();
                b();
                h("close", "");
                rt();
            });
            e(o, "keydown", function (e) {
                if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                    e.preventDefault();
                    o.click();
                }
            });
            e(
                document.querySelectorAll('div[data-cs-maintabs="cookiescript"] > div'),
                "click",
                function (e) {
                    te(e, "data-cs-maintab", "data-cs-maintab-content");
                },
                !0
            );
            ce();
            window.addEventListener("CookieScriptConsentKeyUpdate", ce);
        },
        Ae = function () {
            var i = j(),
                o = function () {
                    var e = document.getElementById("cookiescript_accept"),
                        t = document.getElementById("cookiescript_save");
                    if (!e.classList.contains("cookiescript_hidden")) {
                        e.classList.add("cookiescript_hidden");
                        e.classList.add("cookiescript_bigger");
                        t.classList.add("cookiescript_bigger");
                        setTimeout(function () {
                            e.style.display = "none";
                            t.style.display = "inline-block";
                            t.classList.remove("cookiescript_bigger");
                        }, 100);
                    }
                };
            for (var c = 0; c < i.length; c++) {
                var n = i[c];
                e(n, "click", o);
            }
            var t = document.getElementById("cookiescript_manage_wrap");
            e(t, "click", function () {
                Ee();
            });
            e(t, "keydown", function (e) {
                if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                    e.preventDefault();
                    t.click();
                }
            });
            e(
                document.querySelectorAll('div[data-cs-tabs="cookiescript"] > div'),
                "click",
                function (e) {
                    te(e, "data-cs-tab", "data-cs-tab-content");
                },
                !0
            );
            H();
        },
        Ye = function () {
            Oe();
            e(
                document.querySelectorAll("[data-cs-cookies-info-control]"),
                "click",
                function (e) {
                    var t = e.currentTarget,
                        i = t.getAttribute("data-cs-cookies-info-control"),
                        c = document.querySelector('[data-cs-cookies-info="' + i + '"]');
                    if (t.classList.contains("active")) {
                        c.classList.add("cookiescript_hidden");
                        t.querySelector("[data-cs-cookies-open-text]").classList.remove(
                            "cookiescript_hidden"
                        );
                        t.querySelector("[data-cs-cookies-close-text]").classList.add(
                            "cookiescript_hidden"
                        );
                        t.classList.remove("active");
                    } else {
                        c.classList.remove("cookiescript_hidden");
                        t.querySelector("[data-cs-cookies-open-text]").classList.add(
                            "cookiescript_hidden"
                        );
                        t.querySelector("[data-cs-cookies-close-text]").classList.remove(
                            "cookiescript_hidden"
                        );
                        t.classList.add("active");
                    }
                },
                !0
            );
            if (!P) {
                re();
                P = !0;
            }
        },
        Qe = function () {
            z(document.body, ht);
            y();
            R();
            var e = document.getElementById("cookiescript_injected_fsd");
            k(e, 200);
            ie();
            Ye();
            V();
        },
        ne = function () {
            z(document.body, mt);
            y();
            R();
            var e = document.getElementById("cookiescript_injected");
            k(e, 200);
            ie();
            Ae();
            V();
        },
        oe = function () {
            if (fe.length > 0) {
                z(document.body, fe);
                var t = document.getElementById("cookiescript_badge");
                setTimeout(function () {
                    y(t);
                    k(t, 200);
                }, 200);
                e(t, "click", function () {
                    I();
                });
            }
        },
        re = function () {
            return !1;
        },
        Fe = function () {
            var e = document.querySelector('style[data-type="cookiescriptstyles"]'),
                t = document.getElementById("cookiescript_injected"),
                c = document.getElementById("cookiescript_badge");
            if (t) {
                t.parentNode.removeChild(t);
            }
            if (c) {
                c.parentNode.removeChild(c);
            }
            if (e) {
                e.parentNode.removeChild(e);
            }
            K();
        },
        qe = function () {
            var s = document.querySelectorAll('iframe[data-cookiescript="accepted"]'),
                i = Array.prototype.slice.call(s);
            if (i.length > 0) {
                for (var c = 0; c < i.length; c++) {
                    var e = i[c];
                    if (!e.getAttribute("src")) {
                        var n = e.getAttribute("alt") || "",
                            o = e.getAttribute("data-alt-img"),
                            r = n;
                        if (o) {
                            r = '<img alt="' + n + '" src="' + o + '" />';
                        }
                        var t = e.contentWindow
                            ? e.contentWindow
                            : e.contentDocument.document
                            ? e.contentDocument.document
                            : e.contentDocument;
                        t.document.open();
                        t.document.write(r);
                        t.document.close();
                    }
                }
            }
        },
        x = function (e) {
            var t = document.getElementById("csconsentcheckbox");
            if (t) {
                t.checked = e;
            }
        },
        Ue = function () {
            var i = document.getElementById("csconsentcheckbox");
            e(i, "change", function (e) {
                var t = e.target || e.srcElement;
                if (t.checked) {
                    c.acceptAllAction();
                } else {
                    c.rejectAllAction();
                }
            });
            var t = document.getElementById("csconsentlink");
            e(t, "click", function () {
                I();
            });
        },
        Be = function () {
            return !1;
        },
        vt = function () {
            return !1;
        },
        Je = function () {
            return !1;
        },
        Ge = function () {
            return !1;
        },
        Pe = function () {
            return !1;
        },
        We = function (e) {
            var i = [];
            for (var c = 0; c < i.length; c++) {
                var t = i[c];
                if (t.regexp) {
                    var n = at(t.name);
                    if (e.match(n)) {
                        return !0;
                    }
                } else {
                    if (e === t.name) {
                        return !0;
                    }
                }
            }
            return !1;
        },
        Re = function (e, t) {
            var c = ["strict"];
            if (typeof t !== "undefined") {
                c = t.slice();
                c.push("strict");
                c = m(c);
            }
            for (var n = 0; n < c.length; n++) {
                var i = wt[c[n]];
                if (i) {
                    if (v(i, e) || Xe({ cNames: i, cookieName: e })) {
                        return !0;
                    }
                }
            }
            return !1;
        },
        Ze = function (e) {
            return !1;
        },
        Xe = function (e) {
            var o = e.cNames,
                r = e.cookieName,
                s = !!e.onlyCheckPattern,
                c = [
                    { pattern: "^[a-f0-9]{32}$", name: "[abcdef0123456789]{32}" },
                    {
                        pattern: "^PrestaShop-[a-f0-9]{32}$",
                        name: "PrestaShop-[abcdef0123456789]{32}",
                    },
                    {
                        pattern: "^LF_session_[a-f0-9]{32}$",
                        name: "LF_session_[abcdef0123456789]{32}",
                    },
                    { pattern: "^cid_[a-f0-9]{32}$", name: "cid_[abcdef0123456789]{32}" },
                    {
                        pattern: "^wp_woocommerce_session_[a-f0-9]{32}$",
                        name: "wp_woocommerce_session_[abcdef0123456789]{32}",
                    },
                    { pattern: "^visa_1_[a-f0-9]{32}$", name: "visa_1_[abcdef0123456789]{32}" },
                    {
                        pattern: "^yith_wcwl_session_[a-f0-9]{32}$",
                        name: "yith_wcwl_session_[abcdef0123456789]{32}",
                    },
                    {
                        pattern: "^mp_[a-f0-9]{32}_mixpanel$",
                        name: "mp_[abcdef0123456789]{32}_mixpanel",
                    },
                    { pattern: "^ps[a-f0-9]{24}$", name: "ps[abcdef0123456789]{24}" },
                ];
            for (var t = 0; t < c.length; t++) {
                var i = c[t]["pattern"],
                    n = new RegExp(i, "i");
                if (n.test(r)) {
                    if (s) {
                        return !0;
                    } else {
                        if (v(o, c[t]["name"])) {
                            return !0;
                        }
                    }
                }
            }
            return !1;
        },
        se = function () {
            var e = d("action");
            return Boolean(e && e === "accept");
        },
        He = function () {
            var e = d("action"),
                t = M();
            return Boolean(e && e === "accept" && t.length === i.length);
        },
        E = function () {
            var e = d("action");
            return Boolean(e && (e === "accept" || e === "reject"));
        },
        de = function () {
            return t.get("CookieScriptScanner");
        },
        Ke = function () {
            var e = document.querySelectorAll("[data-cs-switch]");
            if (typeof e !== "undefined") {
                return Array.prototype.slice.call(e);
            }
            return [];
        },
        j = function () {
            var e = document.querySelectorAll('input[data-cookiescript="checkbox-input"]');
            if (typeof e !== "undefined") {
                return Array.prototype.slice.call(e);
            }
            return [];
        },
        O = function (e) {
            var c = [];
            for (var t = 0; t < e.length; t++) {
                if (e[t] !== "strict") {
                    c.push(e[t]);
                }
            }
            return c;
        },
        ae = function (e) {
            var i = j();
            for (var c = 0; c < i.length; c++) {
                var t = i[c];
                if (t.value === "strict") {
                    t.checked = !0;
                } else {
                    t.checked = e;
                }
                Q("change", t);
            }
        },
        pe = function (e) {
            var i = j();
            for (var c = 0; c < i.length; c++) {
                var t = i[c];
                if (t.value === "strict" || v(e, t.value)) {
                    t.checked = !0;
                } else {
                    t.checked = !1;
                }
                Q("change", t);
            }
        },
        A = function (e) {
            if (typeof CookieScriptReport !== "undefined" && CookieScriptReport.instance) {
                CookieScriptReport.instance.setStateCheckboxes(e);
            }
        },
        Ve = function () {
            var c = [],
                i = j();
            for (var t = 0; t < i.length; t++) {
                var e = i[t];
                if (e.checked || e.value === "strict") {
                    c.push(e.value);
                }
            }
            return m(c);
        },
        M = function () {
            var i = d("categories"),
                t = [];
            if (U) {
                t = ["strict"];
            }
            if (i) {
                try {
                    var c = JSON.parse(i);
                    if (U) {
                        c.push("strict");
                    }
                    return m(c);
                } catch (e) {
                    return t;
                }
            }
            return t;
        },
        et = function () {
            var e = document.querySelector('span[data-cs-desc-box="true"]');
            if (e) {
                return e.getAttribute("data-cs-i18n-read");
            }
            return "";
        },
        tt = function (e) {
            try {
                var c = new XMLHttpRequest();
                c.open("GET", e.url);
                c.onload = function () {
                    if (c.status === 200) {
                        try {
                            var i = JSON.parse(c.responseText);
                            e.done(i);
                        } catch (t) {
                            e.done(c.responseText);
                        }
                    } else {
                        l("ERROR: Request failed.  Returned status for " + url + " of " + c.status);
                    }
                };
                c.send();
            } catch (t) {
                l("ERROR: Yor browser not support request");
            }
        },
        n = function (e, c) {
            var n = le();
            n[e] = c;
            try {
                var o = ue(JSON.stringify(n));
                t.set(r, o, { expires: Number(q), domain: Y });
            } catch (i) {
                l("Error: Write " + r + "value =>" + i);
            }
        },
        d = function (e) {
            var t = le();
            return t[e];
        },
        le = function () {
            var c = t.get(r, { domain: Y });
            try {
                return JSON.parse(c);
            } catch (e) {
                return {};
            }
        },
        ue = function (e) {
            return e;
        },
        ct = function () {
            Q("DOMContentLoaded", window.document);
        },
        it = function () {
            c.onAcceptAll();
            p("CookieScriptAcceptAll");
            if (typeof i !== "undefined" && i.length > 0) {
                for (var e = 0; e < i.length; e++) {
                    a(i[e]);
                }
            } else {
                a("all");
            }
        },
        nt = function (e) {
            var i = { categories: m(e) };
            c.onAccept(i);
            p("CookieScriptAccept", i);
            for (var t = 0; t < e.length; t++) {
                a(e[t]);
            }
        },
        ot = function () {
            c.onReject();
            p("CookieScriptReject");
            a("strict");
        },
        rt = function () {
            c.onClose();
            p("CookieScriptClose");
        },
        a = function (e) {
            var t = "CookieScriptCategory-" + e;
            if (v(c.dispatchEventNames, t)) return;
            c.dispatchEventNames.push(t);
            c.dispatchEventNames = m(c.dispatchEventNames);
            p(t);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: t });
        },
        Y = (function () {
            return null;
        })(),
        p = function (e, t) {
            try {
                var i;
                if (typeof Event === "function") {
                    i = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: t });
                } else {
                    i = document.createEvent("CustomEvent");
                    i.initCustomEvent(e, !0, !0, t);
                }
                window.document.dispatchEvent(i);
            } catch (c) {
                l("Warning: You browser not support dispatch event");
            }
        },
        Q = function (e, t) {
            try {
                var i;
                if (typeof Event === "function") {
                    i = new Event(e, { bubbles: !0, cancelable: !0 });
                } else {
                    i = document.createEvent("Event");
                    i.initEvent(e, !0, !0);
                }
                t.dispatchEvent(i);
            } catch (c) {
                l("Warning: You browser not support dispatch event");
            }
        },
        k = function (e, t) {
            var n = me(e, "opacity"),
                o = n ? n : 1;
            e.style.opacity = 0;
            e.style.display = "";
            var i = +new Date(),
                c = function () {
                    e.style.opacity = +e.style.opacity + (new Date() - i) / t;
                    i = +new Date();
                    if (+e.style.opacity < o) {
                        (window.requestAnimationFrame && requestAnimationFrame(c)) ||
                            setTimeout(c, 16);
                    } else {
                        e.style.opacity = "";
                    }
                };
            c();
        },
        g = function (e, t, c) {
            var o = me(e, "opacity");
            e.style.opacity = o ? o : 1;
            var n = +new Date(),
                i = function () {
                    e.style.opacity = +e.style.opacity - (new Date() - n) / t;
                    n = +new Date();
                    if (+e.style.opacity > 0) {
                        (window.requestAnimationFrame && requestAnimationFrame(i)) ||
                            setTimeout(i, 16);
                    } else {
                        e.style.display = "none";
                        e.style.opacity = "";
                        if (c !== undefined) {
                            c();
                        }
                    }
                };
            i();
        },
        v = function (e, t) {
            var c = !1,
                i = e.indexOf(t);
            if (i >= 0) {
                c = !0;
            }
            return c;
        },
        st = function (e, t) {
            e.insertAdjacentElement("afterend", t);
            e.parentNode.removeChild(e);
        },
        ke = function (e, t) {
            e.insertAdjacentHTML("afterend", t);
            e.parentNode.removeChild(e);
        },
        z = function (e, t) {
            e.insertAdjacentHTML("beforeend", t);
        },
        m = function (e) {
            var c = [];
            for (var t = 0; t < e.length; t++) {
                if (c.indexOf(e[t]) === -1 && e[t] !== "") {
                    c.push(e[t]);
                }
            }
            return c;
        },
        l = function (e) {
            console &&
                ("function" == typeof console.warn
                    ? console.warn(e)
                    : console.log && console.log(e));
        },
        dt = function (e) {
            throw e;
        },
        e = function (e, t, c, n) {
            var o = function (e, t, c) {
                if (!e) return;
                try {
                    if (e.attachEvent) {
                        e["e" + t + c] = c;
                        e[t + c] = function () {
                            e["e" + t + c](window.event);
                        };
                        e.attachEvent("on" + t, e[t + c]);
                    } else {
                        e.addEventListener(t, c, !1);
                    }
                } catch (i) {}
            };
            if (n && e && e.length > 0) {
                for (var i = 0; i < e.length; i++) {
                    o(e[i], t, c);
                }
            } else {
                o(e, t, c);
            }
        },
        zt = function (e, t, c, n) {
            var o = function (e, t, c) {
                if (!e) return;
                if (e.detachEvent) {
                    e.detachEvent("on" + t, e[t + c]);
                    e[t + c] = null;
                } else {
                    e.removeEventListener(t, c, !1);
                }
            };
            if (n && e && e.length > 0) {
                for (var i = 0; i < e.length; i++) {
                    o(e[i], t, c);
                }
            } else {
                o(e, t, c);
            }
        },
        me = function (e, t) {
            if (typeof getComputedStyle !== "undefined") {
                return getComputedStyle(e, null).getPropertyValue(t);
            } else {
                return e.currentStyle[t];
            }
        },
        t = (function () {
            /*! js-cookie v3.0.0-rc.0 | MIT */
            function e(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var c in i) {
                        e[c] = i[c];
                    }
                }
                return e;
            }
            var t = {
                read: function (e) {
                    return e.replace(/%3B/g, ";");
                },
                write: function (e) {
                    return e.replace(/;/g, "%3B");
                },
            };
            function c(i, n) {
                function o(c, o, r) {
                    if (typeof document === "undefined") {
                        return;
                    }
                    r = e({}, n, r);
                    if (typeof r.expires === "number") {
                        var a = new Date();
                        a.setTime(a.getTime() + r.expires * 864e5);
                        r.expires = a;
                    }
                    if (r.expires) {
                        r.expires = r.expires.toUTCString();
                    }
                    c = t.write(c).replace(/=/g, "%3D");
                    o = i.write(String(o), c);
                    var d = "";
                    for (var s in r) {
                        if (!r[s]) {
                            continue;
                        }
                        d += "; " + s;
                        if (r[s] === !0) {
                            continue;
                        }
                        d += "=" + r[s].split(";")[0];
                    }
                    return (document.cookie = c + "=" + o + d);
                }
                function r(e) {
                    if (typeof document === "undefined" || (arguments.length && !e)) {
                        return;
                    }
                    var s = document.cookie ? document.cookie.split("; ") : [],
                        o = {};
                    for (var n = 0; n < s.length; n++) {
                        var r = s[n].split("="),
                            d = r.slice(1).join("="),
                            c = t.read(r[0]).replace(/%3D/g, "=");
                        o[c] = i.read(d, c);
                        if (e === c) {
                            break;
                        }
                    }
                    return e ? o[e] : o;
                }
                return Object.create(
                    {
                        set: o,
                        get: r,
                        remove: function (t, c) {
                            o(t, "", e({}, c, { expires: -1 }));
                        },
                        withAttributes: function (t) {
                            return c(this.converter, e({}, this.attributes, t));
                        },
                        withConverter: function (t) {
                            return c(e({}, this.converter, t), this.attributes);
                        },
                    },
                    {
                        attributes: { value: Object.freeze(n) },
                        converter: { value: Object.freeze(i) },
                    }
                );
            }
            var i = window.location.protocol == "https:";
            return c(t, { path: "/", secure: i });
        })(),
        at = function (e) {
            if (typeof e !== "string") {
                return e;
            }
            var t = e.match(/(\/?)(.+)\1([a-z]*)/i);
            if (t[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(t[3])) {
                return RegExp(e);
            }
            return new RegExp(t[2], t[3]);
        },
        Nt = function () {
            var i = "cookie-script.com/s/59e18c80b25f644d82cd94712d76ae67.js",
                c = document.getElementsByTagName("script");
            for (var e = 0; e < c.length; e++) {
                var t = c[e].getAttribute("src");
                if (t && t.indexOf(i) >= 0) {
                    return !0;
                }
            }
            dt("not allowed use of Cookie-Script");
        },
        pt = function (e, t) {
            e = e.replace(/[\[\]]/g, "\\$&");
            var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
                c = i.exec(t);
            if (!c) return null;
            if (!c[2]) return "";
            return decodeURIComponent(c[2].replace(/\+/g, " "));
        },
        lt = function () {
            var c = pt(r, window.location.href);
            if (c) {
                try {
                    c = ue(c);
                    t.set(r, c, { expires: Number(q), domain: Y });
                } catch (e) {
                    l("Error: Write(_loadCookieValueFromUrlArgs) " + r + "value =>" + e);
                }
            }
        },
        h = function (e, t) {
            return !1;
        },
        N = function (e, t) {
            G = !0;
            var c = et(),
                i =
                    "yes" === navigator.doNotTrack ||
                    "1" === navigator.msDoNotTrack ||
                    "1" === navigator.doNotTrack ||
                    !1 === navigator.cookieEnabled;
            tt({
                url:
                    "https://consent.cookie-script.com/collect?action=" +
                    e +
                    "&time=" +
                    new Date().getTime() +
                    "&page=" +
                    encodeURIComponent(ft) +
                    "&dnt=" +
                    i +
                    "&script=" +
                    we +
                    "&consenttext=" +
                    encodeURIComponent(c) +
                    "&category=" +
                    t,
                done: function (e) {
                    if (e !== null && e.key) {
                        n("key", e.key);
                        p("CookieScriptConsentKeyUpdate");
                        G = !1;
                    }
                },
            });
        },
        o = function (e, t, c) {
            return !1;
        },
        f = function (e, t) {
            return !1;
        },
        ut = function (e) {},
        F = function (e) {
            return !1;
        },
        he = function () {
            var t = document.querySelector('script[data-cs-restrict-domain="true"]');
            if (t) {
                var e = window.location.host.replace(/^www\./, "");
                if (e !== bt) {
                    Z({ console: !1 });
                    return;
                }
            }
            lt();
            Fe();
            z(document.body, kt);
            if (!de()) {
                W();
            }
            if (He()) {
                x(!0);
            }
            if (E()) {
                oe();
            } else {
                if (!Pe()) {
                    ne();
                    Je();
                    Ge();
                }
            }
            qe();
            Ue();
            Be();
            p("CookieScriptLoaded");
            ut(E());
        };
    (function () {
        if (CookieScript.instance) return;
        W();
        if (document.readyState === "complete") {
            he();
        } else {
            window.addEventListener("load", he);
        }
    })();
};
CookieScript.init = function () {
    if (CookieScript.instance) {
        return CookieScript.instance;
    }
    CookieScript.instance = new CookieScript();
    return CookieScript.instance;
};
CookieScript.init();
