import booking from "../fixtures/booking.json"
import update from "../fixtures/update.json"

describe('Booker API', () => {

  before("Creat Token", () => {
    cy.createToken()
  });

  it("Creat Booking", () => {
    cy.request({
      method: "POST",
      url: "/booking",
      body: booking
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      Cypress.env("bookingid", body.bookingid);
      expect(body.booking.firstname).to.eq("Indiana");
      expect(body.booking.lastname).to.eq("Jones");
      expect(body.booking.totalprice).to.eq(500);
      expect(body.booking.depositpaid).to.eq(true);
      expect(body.booking.bookingdates.checkin).to.eq("2024-09-20");
      expect(body.booking.bookingdates.checkout).to.eq("2024-09-25");
      expect(body.booking.additionalneeds).to.eq("Breakfast");
      
    });

  });

  it("Get Booking", () => {
    cy.request({
      method: "GET",
      url: `/booking/${Cypress.env("bookingid")}`,
      body: booking,
      headers: {
        Cookie: `token=${Cypress.env("token")}`
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.firstname).to.eq("Indiana");
      expect(body.lastname).to.eq("Jones");
      expect(body.totalprice).to.eq(500);
      expect(body.depositpaid).to.eq(true);
      expect(body.bookingdates.checkin).to.eq("2024-09-20");
      expect(body.bookingdates.checkout).to.eq("2024-09-25");
      expect(body.additionalneeds).to.eq("Breakfast");
    });

  });

  it("Patch Booking", () => {
    cy.request({
      method: "PATCH",
      url: `/booking/${Cypress.env("bookingid")}`,
      body: update,
      headers: {
        Cookie: `token=${Cypress.env("token")}`
      }
      }).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.firstname).to.eq("Indiana");
        expect(body.lastname).to.eq("Jones");
        expect(body.totalprice).to.eq(500);
        expect(body.depositpaid).to.eq(true);
        expect(body.bookingdates.checkin).to.eq("2024-09-20");
        expect(body.bookingdates.checkout).to.eq("2024-09-25");
        expect(body.additionalneeds).to.eq("Dinner");
      });

  });

    it("Delete Booking", () => {
      cy.request({
        method: "DELETE",
        url: `/booking/${Cypress.env("bookingid")}`,
        headers: {
          Cookie: `token=${Cypress.env("token")}`
        }
      }).then(({ status }) => {
        expect(status).to.eq(201);
      })

    });
});
