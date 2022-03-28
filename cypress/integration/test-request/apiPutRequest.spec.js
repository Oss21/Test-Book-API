/**
 * This test have how objective update a element to the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
 const baseURL = "http://localhost:8080/books";

 let bookToUpdate = {};
 
 //Correspond the element that it want add
const bookToSave = {
    id: "120",
    name: "The Pragmatic Programmer",
    author: "Andy Hunt and Dave Thomas",
  };
 /**
  * ACT: Act :
  * Here the methods or functions that you want to test are called,
  * in other words the behaviors of the application are called
  */
 
 // syntax: cy.request(method, url, body)
 const getBooks = () => {
   let position = 0;
   cy.request("GET", `${baseURL}`)
     .its("body")
     .then((result) => {
       position = Math.floor(Math.random() * result.length);
       bookToUpdate = result[position];
       cy.log("Book to put", bookToUpdate);
     });
 };



 //ASS: Assert

describe("Verify if it can put a element to the API", () => {
    beforeEach(() => {
      getBooks();
      bookToUpdate.name = "This is a test"
      bookToUpdate.author = "Hello, I am"
    });
    it("Allows verify if the reponds was 200 Ok and the element is update", () => {
      cy.request("PUT", `${baseURL}/${bookToUpdate.id}`,bookToUpdate).then((response) => {
        expect(response.status).to.eq(200);
        assert.isObject(response.body,"This element is object")
        expect(bookToUpdate.id).to.eq(response.body.id)
        expect(bookToUpdate.name).to.eq(response.body.name)
        expect(bookToUpdate.author).to.eq(response.body.author)

        cy.log(bookToUpdate);
      });
    });

   it("Allows verify what happens when you want update a element that not exist. In this case the save element", () => {
        cy.request("PUT", `${baseURL}/${bookToSave.id}`,bookToSave).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(bookToSave);
      });
    });

});










