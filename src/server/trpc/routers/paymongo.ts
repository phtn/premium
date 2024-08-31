import { CreateSourceSchema } from "@/server/paymongo/resource/zod.checkout";
import { procedure, router } from "..";
import { createSource } from "@/server/paymongo/requests/source";

const createSourceProcedure = procedure.input(CreateSourceSchema);
export const paymongoRouter = router({
  createSource: createSourceProcedure.mutation(async ({ input }) =>
    createSource(input),
  ),
});
