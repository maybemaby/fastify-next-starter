import { db } from "../data/db";
import { PostUser } from "../schema/user";

export async function createUser(
  data: PostUser & { provider: string; providerId: string }
) {
  return await db.profile.create({
    data: {
      name: data.name,
      provider: data.provider,
      providerId: data.providerId,
    },
  });
}
