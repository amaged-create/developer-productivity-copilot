export interface Env {
	AI: Ai;
	ASSETS: Fetcher;
	developer_productivity_copilot_db: D1Database;
}

function json(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data, null, 2), {
		status,
		headers: {
			"content-type": "application/json",
			"access-control-allow-origin": "*",
			"access-control-allow-methods": "GET, POST, OPTIONS",
			"access-control-allow-headers": "content-type",
		},
	});
}

function html(): Response {
	return new Response(
		`<!doctype html>
<html>
<head>
	<title>Developer Productivity Copilot</title>
	<style>
		body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 0 20px; background: #f7f7f7; }
		.card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
		textarea { width: 100%; height: 110px; font-size: 16px; padding: 12px; box-sizing: border-box; }
		button { margin-top: 12px; padding: 12px 18px; font-size: 16px; cursor: pointer; }
		pre { background: #111; color: #eee; padding: 16px; white-space: pre-wrap; border-radius: 8px; min-height: 140px; }
		.small { color: #666; font-size: 14px; }
	</style>
</head>
<body>
	<div class="card">
		<h1>Developer Productivity Copilot</h1>
		<p class="small">Workers + Workers AI + AI Gateway + D1 + MCP-style tools</p>

		<textarea id="q">How can a platform engineering team improve developer productivity without weakening security?</textarea>
		<br />
		<button onclick="ask()">Ask Copilot</button>
		<button onclick="history()">Show History</button>
		<button onclick="tools()">Show Tools</button>
		<button onclick="searchKb()">Search Knowledge</button>

		<h3>Response</h3>
		<pre id="out">Ready.</pre>
	</div>

<script>
async function ask() {
	const question = document.getElementById("q").value;
	document.getElementById("out").textContent = "Thinking...";

	const res = await fetch("/api/ask", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ question })
	});

	const data = await res.json();
	document.getElementById("out").textContent = data.answer || JSON.stringify(data, null, 2);
}

async function history() {
	document.getElementById("out").textContent = "Loading history...";
	const res = await fetch("/api/history");
	const data = await res.json();
	document.getElementById("out").textContent = JSON.stringify(data, null, 2);
}

async function tools() {
	document.getElementById("out").textContent = "Loading tools...";
	const res = await fetch("/api/tools");
	const data = await res.json();
	document.getElementById("out").textContent = JSON.stringify(data, null, 2);
}

async function searchKb() {
	const query = document.getElementById("q").value;
	document.getElementById("out").textContent = "Searching knowledge base...";

	const res = await fetch("/api/tool/search", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ query })
	});

	const data = await res.json();
	document.getElementById("out").textContent = JSON.stringify(data, null, 2);
}
</script>
</body>
</html>`,
		{ headers: { "content-type": "text/html" } }
	);
}

async function getKnowledgeBase(env: Env): Promise<string> {
	const response = await env.ASSETS.fetch("http://assets.local/knowledge-base.md");

	if (!response.ok) {
		return "Knowledge base unavailable.";
	}

	return await response.text();
}

function getTools() {
	return [
		{
			name: "searchKnowledgeBase",
			description: "Searches the developer productivity knowledge base for relevant concepts.",
			input_schema: {
				type: "object",
				properties: {
					query: { type: "string" },
				},
				required: ["query"],
			},
		},
		{
			name: "listDeveloperTools",
			description: "Lists common developer productivity tools from the knowledge base.",
			input_schema: {
				type: "object",
				properties: {},
			},
		},
		{
			name: "explainCloudflareService",
			description: "Explains a Cloudflare Developer Platform service at a high level.",
			input_schema: {
				type: "object",
				properties: {
					service: { type: "string" },
				},
				required: ["service"],
			},
		},
	];
}

function searchKnowledgeBaseText(kb: string, query: string): string[] {
	const terms = query
		.toLowerCase()
		.split(/\s+/)
		.filter((t) => t.length > 3);

	const sections = kb
		.split(/\n---\n|(?=\n## )|(?=\n# )/)
		.map((s) => s.trim())
		.filter(Boolean);

	const scored = sections
		.map((section) => {
			const lower = section.toLowerCase();
			const score = terms.reduce((acc, term) => acc + (lower.includes(term) ? 1 : 0), 0);
			return { section, score };
		})
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 5)
		.map((x) => x.section);

	return scored.length ? scored : ["No strong match found in the knowledge base."];
}

async function handleToolSearch(request: Request, env: Env): Promise<Response> {
	let body: { query?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid JSON body" }, 400);
	}

	const query = body.query?.trim();

	if (!query) {
		return json({ error: "Missing query" }, 400);
	}

	const kb = await getKnowledgeBase(env);
	const matches = searchKnowledgeBaseText(kb, query);

	return json({
		tool: "searchKnowledgeBase",
		query,
		results: matches,
	});
}

async function handleCloudflareTool(request: Request): Promise<Response> {
	let body: { service?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid JSON body" }, 400);
	}

	const service = body.service?.toLowerCase().trim();

	const explanations: Record<string, string> = {
		workers: "Cloudflare Workers provide serverless compute at the edge for APIs, event-driven workloads, and globally distributed applications.",
		"workers ai": "Workers AI provides serverless AI inference integrated with Cloudflare Workers.",
		"ai gateway": "AI Gateway provides visibility, governance, caching, analytics, and control for AI traffic.",
		d1: "D1 is Cloudflare's serverless SQL database based on SQLite.",
		r2: "R2 is Cloudflare's object storage service with S3 compatibility and no egress fees.",
		vectorize: "Vectorize is Cloudflare's vector database for embeddings and semantic search used in RAG applications.",
	};

	return json({
		tool: "explainCloudflareService",
		service,
		answer: service && explanations[service] ? explanations[service] : "Unknown service. Try workers, workers ai, ai gateway, d1, r2, or vectorize.",
	});
}

async function handleAsk(request: Request, env: Env): Promise<Response> {
	let body: { question?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid JSON body" }, 400);
	}

	const question = body.question?.trim();

	if (!question) {
		return json({ error: "Missing question" }, 400);
	}

	const knowledgeBase = await getKnowledgeBase(env);
	const relevantContext = searchKnowledgeBaseText(knowledgeBase, question).join("\n\n---\n\n");

	const prompt = `
You are a Developer Productivity Copilot.

Use ONLY the relevant knowledge base excerpts below to answer the user's question.
If the excerpts do not contain enough information, say what is missing.
Do not invent facts.
Answer in a practical, concise, interview-friendly way.

Relevant Knowledge Base Excerpts:
${relevantContext}

User Question:
${question}
`;

	const result = await env.AI.run(
		"@cf/meta/llama-3.1-8b-instruct-fast",
		{ prompt },
		{
			gateway: {
				id: "default",
				skipCache: false,
				cacheTtl: 3600,
			},
		}
	);

	const anyResult = result as any;
	const answer =
		anyResult.response ||
		anyResult.result?.response ||
		JSON.stringify(result);

	await env.developer_productivity_copilot_db
		.prepare("INSERT INTO chats (question, answer) VALUES (?, ?)")
		.bind(question, answer)
		.run();

	return json({
		question,
		answer,
		architecture: {
			compute: "Cloudflare Workers",
			ai: "Workers AI",
			ai_gateway: "AI Gateway default gateway with caching enabled",
			knowledge_base: "knowledge-base.md via Workers static assets",
			retrieval: "Simple keyword-based retrieval before LLM call",
			database: "D1",
			tools: "MCP-style internal tool abstraction",
		},
	});
}

async function handleHistory(env: Env): Promise<Response> {
	const result = await env.developer_productivity_copilot_db
		.prepare(
			"SELECT id, question, answer, created_at FROM chats ORDER BY id DESC LIMIT 20"
		)
		.all();

	return json(result.results);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
			return json({});
		}

		if (url.pathname === "/") {
			return html();
		}

		if (url.pathname === "/api/ask" && request.method === "POST") {
			return handleAsk(request, env);
		}

		if (url.pathname === "/api/history" && request.method === "GET") {
			return handleHistory(env);
		}

		if (url.pathname === "/api/tools" && request.method === "GET") {
			return json({
				description: "MCP-style tool registry for the Developer Productivity Copilot.",
				tools: getTools(),
			});
		}

		if (url.pathname === "/api/tool/search" && request.method === "POST") {
			return handleToolSearch(request, env);
		}

		if (url.pathname === "/api/tool/cloudflare" && request.method === "POST") {
			return handleCloudflareTool(request);
		}

		if (url.pathname === "/api/health") {
			return json({
				status: "ok",
				service: "developer-productivity-copilot",
			});
		}

		return json({ error: "Not found" }, 404);
	},
} satisfies ExportedHandler<Env>;
