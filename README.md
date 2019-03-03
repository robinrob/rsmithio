## Setup
* [Jekyll](http://jekyllrb.com/docs/installation/)
* [BrowserSync](http://www.browsersync.io/#install)
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) 0.12.5-rc or later


## Route syntax highlighting filetypes
https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers

## Fixes
### WKHtmlToPDF Fix!
It's the left/right margin being too wide which messes it up! This command works:
`wkhtmltopdf --page-size A4 --margin-left 10mm --margin-right 10mm --encoding UTF-8 --quiet`

Or just remove margin completely.

### HTTPS Site not loading (when in Library!)
This is actually just because I'm in the library, and I've always had to use my phone's hotspot connection to load my website in there ... or run checkbot on it! The Symantec firewall blocks the certificate verification process from working on my computer.

