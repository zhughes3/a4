#A4: Drawing App with Restful Interface

##Basic idea
User goes to <drawing_app>.com, and  uploads an image immediately.
AJAX call posts image to PHP endpoint which slices the image into n pieces of equivalent square proportions. These images get stored in the backend to be retrieved with a GET request(and an id) when another person goes to our website to start drawing.

##Code
1. Backend
 Php scripts to handle login and image-upload endpoints.

2. Frontend
A nice drawing canvas with tools for the userto easily recreate the image on-screen.
3. #Testing
- Test for different sizes when you slice the pictures.
