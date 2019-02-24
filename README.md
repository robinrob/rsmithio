## Setup
* [Jekyll](http://jekyllrb.com/docs/installation/)
* [BrowserSync](http://www.browsersync.io/#install)
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) 0.12.5-rc or later


## WKHtmlToPDF Fix!
It's the left/right margin being too wide which messes it up! This command works:
`wkhtmltopdf --page-size A4 --margin-left 10mm --margin-right 10mm --encoding UTF-8 --quiet`

Or just remove margin completely.