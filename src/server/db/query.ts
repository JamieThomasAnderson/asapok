import "server-only";

import { db } from "~/server/db";
import { posts } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function createPost(content: object) {
  const insert = await db
    .insert(posts)
    .values({
      uuid: uuidv4(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return insert;
}

export async function retrievePost(uuid: string) {
  const result = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.uuid, uuid),
  });

  return result;
}
