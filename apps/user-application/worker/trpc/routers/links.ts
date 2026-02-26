import { t } from "@/worker/trpc/trpc-instance";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createLink,
  getLink,
  getLinks,
  updateLinkDestinations,
  updateLinkName,
} from "@repo/data-ops/queries/links";
import { createLinkSchema, destinationsSchema } from "@repo/data-ops/zod-schema/links";

// update procedures
export const linksRouter = t.router({
  linkList: t.procedure
    .input(
      z.object({
        offset: z.number().optional(),
      }),
    )
    .query(async ({ctx, input}) => {

      return await getLinks(ctx.userInfo.userId, input.offset?.toString())
    }),
  createLink: t.procedure.input(createLinkSchema).mutation(async ({ctx, input}) => {
    const linkId = await createLink({
      accountId: ctx.userInfo.userId,
      ...input,
    });
    return linkId;
  }),
  updateLinkName: t.procedure
    .input(
      z.object({
        linkId: z.string(),
        name: z.string().min(1).max(300),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input.linkId, input.name);
      await updateLinkName(input.linkId, input.name)
    }),
  getLink: t.procedure
    .input(
      z.object({
        linkId: z.string(),
      }),
    )
    .query(async ({input}) => {
      const data = await getLink(input.linkId)
 
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });
      return data;
    }),
  updateLinkDestinations: t.procedure
    .input(
      z.object({
        linkId: z.string(),
        destinations: destinationsSchema,
      }),
    )
        .mutation(async ({ input }) => {
          await updateLinkDestinations(input.linkId, input.destinations)
        }),
    });