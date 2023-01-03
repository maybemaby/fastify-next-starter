import t from "tap";
import { build } from "../app";

t.test("health endpoint", async (t) => {
  const app = build();

  const res = await app.inject({
    method: "GET",
    url: "/heartbeat",
  });
  const json: unknown = res.json();
  t.ok(res.statusCode >= 200);

  t.ok(json);
  t.has(json, { health: "Good" });
});
