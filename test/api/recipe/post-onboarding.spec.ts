import request from "supertest";
import { app } from "../../../src/app";
import organizationIdMissingRequest from "../../assets/e-signature/post-onboarding/organizationId-missing-request.json";
import validRequest from "../../assets/e-signature/post-onboarding/valid-request.json";

describe("e-signature controller", () => {
  describe("POST /onboarding", () => {
    test("should return 400 when organizationId is missing", async () => {
      const res = await request(app)
        .post("/e-signature/onboarding")
        .send(organizationIdMissingRequest);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "message",
        "organizationId is a required field"
      );
    });
    test("should return 201 when onboarding documents are stored successfully", async () => {
      const res = await request(app)
        .post("/e-signature/onboarding")
        .send(validRequest);
      expect(res.statusCode).toEqual(201);
    });
  });
});
