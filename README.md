# Wikipedia Current Events Portal RSS

This [express](https://expressjs.com) server fetches the last 14 days of pages
from the
[Wikipedia Current Events Portal](https://en.wikipedia.org/wiki/Portal:Current_events)
and renders them in a clean, easy-to-read, UTF-8 encoded RSS feed. I created
this because
[the one I was using](https://patrick.cloke.us/posts/2017/05/26/rss-feeds-for-wikipedia-current-events-and-nhl-news/)
keeps going out of service, and I couldn't figure out how to host my own copy
of [it](https://gitlab.com/clokep/to-rss/) due to my unfamiliarity with Python.
Feel free to host your own using the instructions below.

## Installation

```
$ yarn
```

## Configuration

Set the environment variable `EXPRESS_PORT` to host the server on a port of your
choosing.

## Running

```
$ yarn start
```

Then, you can load the feed from http://localhost:EXPRESS_PORT/feed.xml.

## Contributing

Unfortunately, I don't have much time to work on this, so if you encounter any
bugs, feel free to fork and fix, and I'll try to review and merge any PRs when I
get a spare moment. But don't expect any timely resolution to issues. This is a
free (as in both freedom and lunch) project with zero funding, so please act
accordingly.

I explicitly deny permission to train LLMs on this code. I reserve the right to
close and/or ignore issue and PR submissions that seem to be LLM-generated in
any way.
