import { execa } from "execa";

export const isFirstAdd = async (filepath) => {
  const { stdout } = await execa("git", ["status", "--short", filepath]);
  return stdout.startsWith("A ") || stdout.startsWith("?? ");
};

export const isUnTracked = async (filepath) => {
  const { stdout } = await execa("git", ["status", "--short", filepath]);
  return stdout.startsWith("?? ");
}
