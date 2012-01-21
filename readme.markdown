Documentation

# General

Feedback is a tool designed to enable the user to interact with the
developers.

A user can simply click on a DOM element, enter a message and send it to
the developers. Feedback allows you to easily add additional Info such
as user email, without having to ask the user manually.

Requirements: Server: Node.js and Mongodb. Client: jQuery Plugin.

# Usage

## Server

1.  Install Node.js

2.  Download bejoo/feedback. Cd into your Feedback directory. Run
    `node server/app.js`

3.  Start MongoDB

Please not that bejoo/feedback by default runs on port 3000. You can
modify app.js to change the port. The MongoDB Database will
automatically be created and is called feedback.

## Client

Include `<script link to source>` in your code.

# Client Side

## The Feedback Obje

### Methods

1.  `addUrl(url)` used without arguments it passes the current url to
    the feedback

2.  addMessage

### Attributes
