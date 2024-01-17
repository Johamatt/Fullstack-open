describe("Blog app", function () {
  describe("Login", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      cy.visit("http://localhost:5173");
    });

    it("Login form is shown", function () {
      cy.contains("log in to application");
    });

    it("user can log in", function () {
      const user = {
        name: "Matti",
        username: "user",
        password: "salainen2",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.get("#username").type("user");
      cy.get("#password").type("salainen2");
      cy.get("#login-button").click();
      cy.contains("Matti logged in");
    });

    it("login fails with wrong password", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      cy.visit("http://localhost:5173");
      const user = { name: "Matti", username: "user", password: "salainen2" };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.get("#username").type("user");
      cy.get("#password").type("salainen2");
      cy.get("#login-button").click();
      cy.contains("Matti logged in");
    });

    // it("front page can be opened", function () {
    //   cy.contains("Blogs");
    // });

    // it("a new blog can be created", function () {
    //   cy.contains("new blog").click();

    //   cy.get("#blog-title-input").type("a blog created by cypress");
    //   cy.get("#url-input").type("url by cypress");
    //   cy.get("#author-input").type("author by cypress");

    //   cy.contains("save").click();
    //   cy.contains("a blog created by cypress");
    // });

    // it("a blog can be liked", function () {
    //   cy.contains("new blog").click();

    //   cy.get("#blog-title-input").type("a blog created by cypress");
    //   cy.get("#url-input").type("url by cypress");
    //   cy.get("#author-input").type("author by cypress");

    //   cy.contains("save").click();
    //   cy.get("#view0").click();
    //   cy.get("#like-value-0").contains("0");
    //   cy.get("#like0").click();
    //   cy.get("#like-value-0").contains("1");
    // });

    // it("a blog can be deleted by owner", function () {
    //   cy.contains("new blog").click();
    //   cy.get("#blog-title-input").type("a blog created by cypress");
    //   cy.get("#url-input").type("url by cypress");
    //   cy.get("#author-input").type("author by cypress");
    //   cy.contains("save").click();
    //   cy.get("#view0").click();
    //   cy.get("#delete0").click();
    //   cy.get("body")
    //     .invoke("text")
    //     .should("not.include", "a blog created by cypress");
    // });

    // it("a blog only visible for owner", function () {
    //   cy.contains("new blog").click();
    //   cy.get("#blog-title-input").type("a blog created by cypress");
    //   cy.get("#url-input").type("url by cypress");
    //   cy.get("#author-input").type("author by cypress");
    //   cy.contains("save").click();
    //   cy.get("#logout-btn").click();
    //   cy.visit("http://localhost:5173");
    //   const user = { name: "Pekka", username: "user2", password: "salainen2" };
    //   cy.request("POST", "http://localhost:3001/api/users/", user);
    //   cy.get("#username").type("user2");
    //   cy.get("#password").type("salainen2");
    //   cy.get("#login-button").click();
    //   cy.contains("View").click();
    //   cy.get("#show-more-div").should("not.contain", "delete");
    // });

    it("blogs should be sorted by likes", function () {
      cy.contains("new blog").click();
      cy.get("#blog-title-input").type("second most liked");
      cy.get("#url-input").type("second most liked url");
      cy.get("#author-input").type("second most liked author");
      cy.contains("save").click();

      cy.contains("new blog").click();
      cy.get("#blog-title-input").type("most liked");
      cy.get("#url-input").type("most liked url");
      cy.get("#author-input").type("most liked author");
      cy.contains("save").click();

      cy.get("#view1").click();
      cy.get("#like1").click();
      cy.visit("http://localhost:5173");

      cy.get(".blog").eq(0).should("contain", "most liked");
      cy.get(".blog").eq(1).should("contain", "second most liked");
    });
  });
});
