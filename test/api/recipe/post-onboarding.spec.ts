import request from "supertest";
import { app } from "../../../src/app";
import organizationIdMissingRequest from "../../assets/e-signature/post-onboarding/organizationId-missing-request.json";
import validRequest from "../../assets/e-signature/post-onboarding/valid-request.json";

describe("e-signature controller", () => {
  describe("POST /onboarding", () => {
    test.skip("should return 400 when organizationId is missing", async () => {
      const res = await request(app)
        .post("/e-signature/onboarding")
        .send(organizationIdMissingRequest);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "message",
        "organizationId is a required field"
      );
    });
    test.skip("should return 201 when onboarding documents are stored successfully", async () => {
      const res = await request(app)
        .post("/e-signature/onboarding")
        .send(validRequest);
      expect(res.statusCode).toEqual(201);
    });
  });
});

describe("recipe controller", () => {
  describe("POST /recipe", () => {
    test.todo("should return 201 when proper recipe is provided");
    test.todo("should return 400 if recipe is invalid");
  });
  describe("DELETE /recipe", () => {
    test.todo("should return 202 when recipe is deletec");
    test.todo("should return 400 if id is invalid");
  });
  describe("PUT /recipe", () => {
    test.todo("should return 201 if recipe is updated");
    test.todo("should return 400 if recipe id is invalid");
  });
  describe("GET /recipe", () => {
    test("should return 200 when recipe is returned", async () => {
      const res = await request(app).get("/recipe");
      expect(res.statusCode).toEqual(200);
    });
    test.todo("should return 400 if recipe id is invalid");
  });
});
