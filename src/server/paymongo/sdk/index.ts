import { env } from "@/env";
import { Paymongo } from "./sdk-fn";

const paymongo = Paymongo(env.PM_SC_TEST_KEY);
export default paymongo;
