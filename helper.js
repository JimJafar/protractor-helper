'use strict';

module.exports = function () {
    /**
     * Generates convenience methods for your e2e tests
     *
     * @param page Your page object
     * @param elements A collection of elements like this: { myButton: element(by.id('myBtn')), ...}
     *                 This parameter is optional and is kept to support old code.
     *
     * @example
     * var Helper = require('../../../support/helper');
     * var MyPage = function () {
     *      'use strict';
     *      var helper = new Helper();
     *      var page = this;
     *      page.baseUrl = '/#/somepage';
     *
     *      page.elements = {
     *          editButton: element(by.id('edit-btn')),
     *          cancelButton: element(by.id('cancel-btn'))
     *      };
     *      helper.generatePageMethods(page);
     * };
     * module.exports = MyPage;
     */
    this.generatePageMethods = function(page, elements) {
        var flow = browser.controlFlow();
        var elem;
        elements = elements || page.elements;

        /**
         * Execute a sequence of promises sequentially
         * @param {array} actionPromises
         * @returns {Promise}
         */
        page.executeSequence = function(actionPromises) {
            return protractor.promise.all(
                actionPromises.map(function(promise) {
                    return flow.execute(function() { return promise; });
                })
            );
        };

        /**
         * Opens the page.baseUrl appending the suffix parameter
         * @param {string} suffix
         * @returns {Promise}
         */
        page.getUrl = function(suffix) {
            browser.ignoreSynchronisation = false;
            return browser.get(page.baseUrl + suffix)
                .then(page.pageIsOpen);
        };

        /**
         * Opens the page.baseUrl
         * @returns {Promise}
         */
        page.get = function() {
            browser.ignoreSynchronisation = false;
            return browser.get(page.baseUrl)
                .then(page.pageIsOpen);
        };

        /**
         * Waits for Angular to bootstrap before resolving
         * @returns {ElementFinder}
         */
        page.pageIsOpen = function () {
            browser.waitForAngular();
            return element(by.tagName('body')).isPresent();
        };

        /**
         * Clears focus from any element by clicking on the body
         * @returns {Promise}
         */
        page.clearFocus = function () {
            return page.click(element(by.tagName('body')))();
        };

        /**
         * Send a sequence of keystrokes to the element (e.g. for entering a value into an input)
         * @param {WebElement} element
         * @param {string} value
         * @returns {Promise}
         */
        page.fill = function (element, value) {
            return element.sendKeys(value);
        };

        /**
         * Clears any content from an input before entering a new value
         * @param {WebElement} element
         * @param {string} value
         * @returns {Promise}
         */
        page.clearAndFill = function(element, value) {
            return page.executeSequence([
                element.clear(),
                page.fill(element, value)
            ]);
        };

        /**
         * Gets the content of an element (value if an input)
         * @param {WebElement} element
         * @returns {Promise}
         */
        page.getContent = function(element) {
            return element.getAttribute('value')
                .then(function (val) {
                    return (val === null) ?
                        element.getText() :
                        val;
                });
        };

        /**
         * Click an element (uses browser.actions to avoid an IE bug)
         * @param {WebElement} element
         * @returns {Promise}
         */
        page.click = function(element) {
            return browser.actions().click(element).perform();
        };

        /**
         * Hover on an element
         * @param {WebElement} element
         * @returns {Promise}
         */
        page.hover = function(element) {
            return browser.actions().mouseMove(element).perform();
        };

        /**
         * Scroll to an element
         * @param {WebElement} element
         * @returns {Promise}
         */
        page.scrollTo = function(element) {
            return browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
        };

        /**
         * Give focus to an element (alias click)
         * @param {WebElement} element
         * @returns {Promise}
         */
        page.focus = function(element) {
            return page.click(element);
        };

        /**
         * Check to see if an element has a class assigned
         * @param {WebElement} element
         * @param {string} className
         * @returns {Promise}
         */
        page.hasClass = function(element, className) {
            return element.getAttribute('class').then(function (classes) {
                return !!classes && classes.split(' ').indexOf(className) !== -1;
            });
        };
    };
};
