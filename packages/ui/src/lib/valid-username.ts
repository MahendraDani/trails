export const isValidUsername = (input: string): boolean => {
  const validPattern = /^[a-zA-Z0-9_]+$/;
  if (input.length < 6) {
    return false;
  }
  if (!validPattern.test(input)) {
    return false;
  }
  return true;
};
