import { expect, describe, it } from "bun:test";
import { insertUser, getUser } from "./user"; // Adjust the import path as necessary
import type { InsertUser, SelectUser } from "../schema";

describe("User Queries", () => {
  const userId = Date.now().toString(36);
  const email = `${userId}@re-up.ph`;
  it("should insert a user", async () => {
    const user = {
      userId,
      displayName: "John T",
      email,
      phoneNumber: "09158884422",
      photoURL: "https://avatars.githubusercontent.com/u/7326331?v=4",
      active: true,
      verified: false,
      createdBy: "xpriori",
    } as InsertUser;
    await insertUser(user);
    const result = (await getUser({ userId })) as SelectUser[];
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).not.toBe(!undefined);
    expect(result[0]?.userId).toContain(user.userId);
  });
});
