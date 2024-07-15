import { onProcRequest } from "@/server/ocr/process";
import { router } from "..";
import { ProcRequestProcedure } from "../procedure/ocr";

export const ProcRequestRouter = router({
  procRequest: ProcRequestProcedure.query(async ({ input }) =>
    onProcRequest(input),
  ),
});
