import { registerAs } from "@nestjs/config";

//解决 scope 和 敲错字
export default registerAs("coffees", () => ({
  foo: "bar",
}));
