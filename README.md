# React + Vite

This is a simple coding exercise for Virtuoso's coding interview utilizing [Met Museum Art collection API](https://metmuseum.github.io/)

## To run locally
- run `npm i`
- run `npm run dev`
- view url provided by console.

## To view online

Site can be found hosted on aws [here](http://virtuoso-bucket.s3-website-us-west-2.amazonaws.com/)

## Criteria

### `SearchResult` component acceptance criteria
- Accepts an array of search result items
- Renders a header container displaying the total count of SearchResultItems
- Renders a summary card, box, or other container as a list of items in a vertical layout.
- Bonus: if the SearchResult header shows the top 3 departments in the results, allowing
the user to filter the local results by the value of the department property.

### `SearchResultItem` component acceptance criteria
- Displays the object’s summary detail in a card, box, or other container in the list of
items. If any property doesn’t have a value, render “Not Available” instead.
    - primaryImageSmall
    - title
    - objectDate
    - department
    - artistRole
    - artistDisplayName
    - artistNationality
    - Up to 3 tags. When no tag is present, do not show the tag label or tag value(s).

### Bonus
- We use Nuxt: The Intuitive Vue Framework · Nuxt. If you have experience with Nuxt,
great, we would love to see an implementation using Nuxt. If your experience is with
React, Angular or Html, JavaScript, and CSS, that is OK, too. We assume if you can pick
up one framework you can adapt to Nuxt.
- By clicking the SearchResultItem small thumbnail image, a lightbox displays the
primaryImage. The lightbox can be canceled to return the user back to the search
results.
- By clicking anywhere on the SearchResultItem, that is NOT the small thumbnail image,
navigate the user to the value of the objectURL in a new tab.
- Host the solution at a public location where the interview team can review the finished
submission