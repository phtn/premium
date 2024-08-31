import { env } from "@/env";
import Paymongo, { type PublicKey } from "@paymongo/core";

const paymongo = new Paymongo(env.PM_SC_TEST_KEY as PublicKey);
export default paymongo;
