export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }
  renderItems() {
    this._items.forEach((data) => {
      this._renderer(data);
    });
  }

  addItem(listElement) {
    console.log("add item fired");
    this._container.prepend(listElement);
  }
}

// It has an object with two properties (items and renderer) as the first parameter of the constructor.

//The items property serves as an array of data, which you need to add on a page when initializing the
//class. The renderer property is a function responsible for creating and rendering data on a page.

// The second parameter should be a CSS class selector where you'll add the card elements.

// It stores a public method named renderItems() that renders all elements on the page. The renderer()
// function will render each element on a page.

// It stores a public method named addItem() that takes a DOM element and adds it to the container.
