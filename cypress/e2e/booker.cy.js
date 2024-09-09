import booking from "../fixtures/booking.json"

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

});
