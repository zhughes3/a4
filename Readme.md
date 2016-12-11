#A4: Drawing App with Restful Interface

##Basic idea
User goes to the app's main webpage, and  uploads an image immediately.
This image is immediately uploaded to our server where it is sliced n pieces of equivalent square proportions. These new images, or slices, then get stored in the backend to be retrieved later.
At this point, the initial picture uploader (or project originator) is emailed a link to the project and is immediately shown the first slice and our Drawing Canvas.

The idea is to try your best to recreate the slice of the image on the screen as best as you can. Once done drawing, you submit the image where we store it in-place of the original slice.

Using the emailed link (sent at project origination), you can get all of your friends/family to help draw the rest of the slices.

By the time all slices are redrawn, you have an original artistic creation from the crowdsourced members of your network.

##Code
1. *Backend*
 Php scripts to handle login and image-upload endpoints.

2. *Frontend*
A nice drawing canvas with tools for the user to easily recreate the image on-screen.
3. *Testing*
Test for different sizes when you slice the pictures.

##Project Highlights
* Uses HTML5 Canvas, AJAX for async frontend requests and a RESTful PHP backend to handle http requests and server operations
* Drawing functionality created using javascript and jquery
  *   Recognizes touch and mouse events 
* Lightweight backend database implemented using mysql