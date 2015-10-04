# protractor-helper
**A helper that generates convenience methods for your e2e Protractor tests**

On my current project we use [PageObjects](https://code.google.com/p/selenium/wiki/PageObjects) to keep our Protractor tests clean and DRY, but I found that there was a lot of duplication and tedious boilerplate code between our different PageObjects.

Also, people had to keep solving challenges and overcoming Protractor / Selenium peculiarities that had been dealt with before by another developer.

So, I wrote a helper file that enormously reduces the amount of code we have to (re)write and that provides a central place for us to put reusable workarounds.

You can see in more detail why I created this helper and how it can be used in [this blog post](http://www.competa.com/blog/?p=841).
