---
title: 'Accessible HTML File Input'
pubDate: 26 Sep 2018
description: 'By being more thoughtful, we can have a file input that is beautiful but still accessible.'
---

Disclaimer: no testing had been done via screen reader. It would be great if you can inform me if you find anything that is not accessible.

## The Markup

```html
<div class="file-input">
  <input type="file" class="file-input--input" id="my-file-input" />
  <label for="my-file-input" class="file-input--label button" tabindex="-1"
    >Upload</label
  >
  <!-- setting for attribute of label to the id of the file input so clicking
    it would simulate click on the file input  -->
  <!-- setting tabindex to -1 so that label will not be tab target  -->
</div>
```

## The Style

```scss
.file-input {
  &--input {
    position: fixed;
    left: -1000px; /* putting the input off the screen so that
    it cannot be seen visually, but still be focusable by
    screen reader / keyboard tab
    using display: none or visibility:hidden or opacity: 0
    can cause some screen reader to ignore it */
    top: 0;
    cursor: pointer;
    z-index: -1;
  }

  &--input:focus + &--label {
    // rules for focused button
  }
}

.button {
  // rules to style the label like a button
}
```
