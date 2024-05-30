import slugify from "@sindresorhus/slugify";

export const createSlug = (str: string) => {
  const slug = str
    .split(" ")
    .filter((v) => {
      return v.length !== 0;
    })
    .join(" ");
  return slugify(slug, {
    separator: "-",
    preserveLeadingUnderscore: true,
    preserveTrailingDash: false,
    lowercase: true,
    decamelize: true,
  });
};
