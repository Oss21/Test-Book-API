/**
 * This test have how objective verify if it can insert new element to the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
const baseURL = "http://localhost:8080/books";

//Correspond the element that it want add
const bookToInsert = {
  name: "The Pragmatic Programmer",
  author: "Andy Hunt and Dave Thomas",
};

let uuidAdded = "";

/**
 * ACT: Act :
 * Here the methods or functions that you want to test are called,
 * in other words the behaviors of the application are called
 */

// syntax: cy.request(method, url, body)
const addBook = (bookToInsert) => {
  cy.request("POST", baseURL, bookToInsert)
    .its("body")
    .then((result) => {
      uuidAdded = result.id;
      cy.log("Id of the element added", uuidAdded);
      //baseURL = baseURL+"/"+uuidAdded
      cy.log("Base url", baseURL);
    });
};

//ASS: Assert

describe("Verify if it can insert new element to the API", () => {
  beforeEach(() => {
    addBook(bookToInsert);
  })
  it("Allows verify if the reponds was 200 Ok", () => {
    cy.request("GET", `${baseURL}`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.status);
    });
  });

  it("Check if the elements inside of the json file contains the keys: id, name and author", () => {
    cy.request("GET", `${baseURL}`).then((response) => {
      expect(response.body[0]).to.have.all.keys("id", "name", "author");
      cy.log(response.body.length)
    });
  });


  it("Check if the book was save in the API", () => {
    cy.request("GET", `${baseURL}`).its('body').then((response)=> {
        let bookAdded = response.find( (book) => book.id === uuidAdded)
        assert.isTrue(bookAdded.id === uuidAdded, 'Exist the id create previusly')
        assert.isTrue(bookAdded.name === bookToInsert.name, 'Both elements have the same name')
        assert.isTrue(bookAdded.author === bookToInsert.author, 'Both elements have the same author')

    
    });
  });
});
