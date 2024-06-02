import {
  type User,
  type Collections,
  type Trails,
  type Likes,
  type Session,
  type Account,
  Prisma,
} from "@prisma/client";

export type TUserDB = User;
export type TCollectionsDB = Collections;
export type TTrailsDB = Trails;
export type TLikesDB = Likes;
export type TSessionDB = Session;
export type TAccountDB = Account;

// Ref : https://stackoverflow.com/questions/68366105/get-full-type-on-prisma-client
const userInclude = Prisma.validator<Prisma.UserInclude>()({
  sessions: true,
  account: true,
});

export type TApiClient = Prisma.UserGetPayload<{
  include: typeof userInclude;
}>;

const trailsInclude = Prisma.validator<Prisma.CollectionsInclude>()({
  trails: true,
});

export type TCollectionsWithTrails = Prisma.CollectionsGetPayload<{
  include: typeof trailsInclude;
}>;
