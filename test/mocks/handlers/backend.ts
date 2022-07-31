import { rest } from "msw";

export default [
  rest.get(/agreements\/123\/signingUrls/, (req, res, ctx) => {
    const retVal = {
      signingUrlSetInfos: [
        {
          signingUrlSetName: "Signing Url Set 1",
          signingUrls: [
            {
              esignUrl: "https://adobe-sign.com/s/e/1234567890",
              email: "test@test.test",
            },
          ],
        },
      ],
    };
    return res(
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(retVal)
    );
  }),
];
