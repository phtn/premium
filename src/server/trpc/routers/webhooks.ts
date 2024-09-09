import { z } from "zod";
import { procedure, router } from "..";
import { queryAll } from "./utils";

export const webhookRouter = router({
  sendMessage: procedure
    .input(z.object({ query: z.string() }).optional())
    .query(async ({ input }) => ({ input, answer: "fuck nah" })),
  send: queryAll().query(() => "hello"),
});
// const sendWebhook = async (endpoint: string, message: object) => {
//   await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// };
// curl -X POST -H "Accept: application/json" \ -H "Content-Type: application/json"  \ "http://localhost:3000/api/trpc/webhooks.send/"
// curl -X POST "http://localhost:3000/api/trpc/webhooks.send/"
