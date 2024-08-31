import { env } from "@/env";
import { Paymongo } from "@sdk/paymongo";

const paymongo = new Paymongo(env.PM_SC_TEST_KEY);
export default paymongo;
