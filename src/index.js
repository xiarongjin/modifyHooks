import { hooks } from "./hook";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
  await hooks();
} else {
  console.log("abc");
}
