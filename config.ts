import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

const inits = () => {
  if (Deno.env.get("MODE") === "NOFS") {
    return Deno.env.toObject();
  } else {
    return config();
  }
};

const dots = inits();

export default dots;
