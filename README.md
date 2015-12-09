# protractor-helper
**A PageObject class that provides convenience methods for your e2e Protractor tests**

On my current project we use [PageObjects](https://code.google.com/p/selenium/wiki/PageObjects) to keep our Protractor tests clean and DRY, but I found that there was a lot of duplication and tedious boilerplate code between our different PageObjects.

Also, people had to keep finding solutions to Protractor / Selenium peculiarities that had already been encountered by another developer.

So, I wrote a helper file that enormously reduces the amount of code we have to (re)write and that provides a central place for us to put reusable workarounds.

You can see in more detail why I created this helper and how it can be used in these blog posts: 

- [A PageObject helper for Protractor tests](http://www.competa.com/blog/2015/10/a-pageobject-helper-for-protractor-tests/).
- [Getting an angle on Protractor - Part 1](http://www.competa.com/blog/2015/12/getting-an-angle-on-protractor-part-1/)