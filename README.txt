PASS STEEL — BOOTSTRAP WEBSITE
================================

HOW TO OPEN
------------
Just double-click "index.html" to open it in your browser.
No installation needed. (Internet connection is needed once,
because Bootstrap + icon fonts load from a CDN.)


HOW TO ADD YOUR OWN PHOTOS
----------------------------
All images live in the "images" folder. Each one is currently a
placeholder. To use your own photo, just replace the file with
the SAME NAME — the website will automatically show your new photo.

  images/hero-chair.jpg   -> big photo at the top of the homepage
  images/chair-1.jpg      -> product card 1 photo
  images/chair-2.jpg      -> product card 2 photo
  images/chair-3.jpg      -> product card 3 photo
  images/chair-4.jpg      -> product card 4 photo
  images/owner.jpg        -> owner / founder photo
  images/about.jpg        -> (not used yet — free to use if you add a section)

TIP: Keep roughly the same shape/ratio as the placeholder so your
photo isn't stretched:
  - hero-chair.jpg : wide (landscape), e.g. 1600x1000px
  - chair-1 to 4    : tall (portrait),  e.g. 800x900px
  - owner.jpg       : tall (portrait),  e.g. 800x1000px


HOW TO ADD MORE PRODUCTS
---------------------------
Open index.html, find the "PRODUCTS SECTION" comment block.
Copy one whole product card, from:
  <div class="col-md-6 col-lg-3"> ... </div>
and paste it again right after. Then change the image file name,
title and description text.


HOW TO EDIT TEXT
------------------
All the text you'd want to change (headline, product names,
descriptions, owner bio, phone/email/address) is written directly
in index.html, with comments like <!-- EDIT: ... --> right above
each part that's meant to be edited.


HOW TO CHANGE COLORS
-----------------------
Open css/style.css and look at the very top — the ":root" block.
  --gold      -> the main accent color (buttons, highlights)
  --charcoal  -> dark text/background color
  --ivory     -> light background color
Change these hex codes and the whole site updates automatically.


MAKING THE CONTACT FORM ACTUALLY SEND EMAILS
-----------------------------------------------
Right now the contact form does not send real emails — it's just
the visual design. To make it work, sign up for a free service like:
  - Formspree (formspree.io)
  - EmailJS (emailjs.com)
and follow their instructions to connect your form (usually just
adding an "action" link and a hidden field).


FOLDER STRUCTURE
-------------------
pass-steel-bootstrap/
  index.html        <- the whole website (one page)
  css/style.css      <- all custom styling + 3D hover effect
  js/script.js       <- navbar scroll effect, 3D tilt, smooth scroll
  images/             <- all photos (replace these with your own)
  README.txt          <- this file
