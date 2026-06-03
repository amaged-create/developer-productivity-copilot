import { Container, getContainer } from "@cloudflare/containers";
import { Hono } from "hono";

export class MyContainer extends Container<Env> {
	defaultPort = 8080;
	sleepAfter = "10m";

	override onStart() {
		console.log("Private Engineering Portal container started");
	}

	override onStop() {
		console.log("Private Engineering Portal container stopped");
	}

	override onError(error: unknown) {
		console.log("Container error:", error);
	}
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
	const container = getContainer(c.env.MY_CONTAINER, "private-engineering-portal");
	return await container.fetch(c.req.raw);
});

app.get("/health", async (c) => {
	const container = getContainer(c.env.MY_CONTAINER, "private-engineering-portal");
	return await container.fetch(c.req.raw);
});

export default app;
