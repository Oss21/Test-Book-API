/**
 * This test have how objective verify if it can consult a element to the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
 const baseURL = "http://localhost:8080/books";

 /**
  * ACT: Act :
  * Here the methods or functions that you want to test are called,
  * in other words the behaviors of the application are called
  */
 
//  Here I don't need to organize anything, since when I query the api, I can only query all the elements and not one in particular.
 const bookToConsult ={
     id: "ecd51931-a637-441b-81f6-d97964a7e13c",
     name: "The Pragmatic Programmer",
     author: "Andy Hunt and Dave Thomas",
 }






 //ASS: Assert
 
 describe("Verify if  elements can be consult of the API", () => {
   it("Allows verify if the reponds was 200 Ok", () => { 
     cy.request("GET", `${baseURL}`).then((response) => {
       expect(response.status).to.eq(200);
       assert.isArray(response.body, 'Books response is an array')
       assert.isObject(response.body[0],"This element is object")
    });
   });
 
   it("Check if the elements inside of the json file contains the keys: id, name and author", () => {
     cy.request("GET", `${baseURL}`).then((response) => {
       expect(response.body[0]).to.have.all.keys("id", "name", "author");
     });
   });

   it("Verifies that when only one book is consulted an error 405 is returned",()=>{
    cy.request({
        method: "GET",
        url: `${baseURL}/${bookToConsult.id}`,
        failOnStatusCode: false
         }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body.error).to.eq("Method Not Allowed");
      });
   })

 });
 