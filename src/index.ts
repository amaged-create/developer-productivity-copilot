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
	<title>Developer Productivity ChatBot</title>
	<link rel="stylesheet" href="/styles.css">
</head>
<body>
	<div class="page">
		<div class="shell">
			<header class="hero">
				<div class="brand">
					<img class="cf-logo-main" src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/CHOl0sUhrumCxOXfRotGt/081f81d52274080b2d026fdf163e3009/cloudflare-icon-color_3x.png" alt="Cloudflare logo">
					<div>
						<h1>Developer Productivity ChatBot</h1>
						<p class="subtitle">An internal AI assistant protected by Cloudflare Zero Trust.</p>
					</div>
				</div>
				<div class="verified-badge">Verified at the edge • Cloudflare Access</div>
			</header>

			<div class="grid">
				<main>
					<section class="ask-card">
						<textarea id="q">How can a platform engineering team improve developer productivity without weakening security?</textarea>

						<div class="actions">
							<button class="primary" onclick="ask()">Ask ChatBot</button>
							<button onclick="history()">Show History</button>
							<button onclick="tools()">Show Tools</button>
							<button onclick="searchKb()">Search Knowledge</button>
						</div>
					</section>

					<section>
						<h2>Response</h2>
						<pre id="out" class="response">Ready.</pre>
					</section>

					<section class="architecture-card">
						<div>
							<h2>Architecture</h2>
							<pre class="ascii">User
 |
 v
Cloudflare Access
 |
 v
Identity verified at the edge
 |
 v
Worker + Workers AI
 |
 v
Knowledge Base + D1</pre>
						</div>

						<div class="architecture-note">
							<img class="shield-img" src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/CHOl0sUhrumCxOXfRotGt/081f81d52274080b2d026fdf163e3009/cloudflare-icon-color_3x.png" alt="Cloudflare">
							<h3>Protected before the app.</h3>
							<p>Cloudflare Access evaluates identity before traffic reaches the Worker.</p>
						</div>
					</section>
				</main>

				<aside class="side-card">
					<div class="side-header">
						<img class="side-logo" src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/CHOl0sUhrumCxOXfRotGt/081f81d52274080b2d026fdf163e3009/cloudflare-icon-color_3x.png" alt="Cloudflare">
						<div>
							<h2>Built with Cloudflare</h2>
							<p>Built in a weekend. Protected before Monday.</p>
						</div>
					</div>

					<div class="feature-list">
						<div class="feature">
							<span>Protected by Cloudflare Zero Trust</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>Identity verified at the edge</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>Cloudflare Workers</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>Workers AI</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>AI Gateway</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>D1 persistence</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>Custom Enterprise zone</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
						<div class="feature">
							<span>MCP-style tools</span>
							<span class="reaction-icons">
								<img src="https://api.iconify.design/twemoji:smiling-face-with-smiling-eyes.svg" alt="smile">
								<img src="https://api.iconify.design/twemoji:thumbs-up.svg" alt="thumbs up">
							</span>
						</div>
					</div>
				</aside>
			</div>

			<footer>
				Developer Productivity ChatBot • Powered by Cloudflare • Protected by Zero Trust
			</footer>
		</div>
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

function styles(): Response {
	return new Response(
		`body {
	margin: 0;
	font-family: Arial, sans-serif;
	background:
		radial-gradient(circle at top left, rgba(243,128,32,.14), transparent 30%),
		radial-gradient(circle at top right, rgba(37,99,235,.10), transparent 30%),
		#f8fafc;
	color: #111827;
}

* { box-sizing: border-box; }

.page {
	max-width: 1320px;
	margin: 0 auto;
	padding: 32px;
}

.shell {
	background: rgba(255,255,255,.96);
	border: 1px solid #e5e7eb;
	border-radius: 22px;
	box-shadow: 0 24px 70px rgba(15,23,42,.10);
	padding: 28px;
}

.hero {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	margin-bottom: 24px;
}

.brand {
	display: flex;
	align-items: center;
	gap: 16px;
}

.cf-logo-main {
	width: 64px;
	height: 64px;
	object-fit: contain;
	background: #fff7ed;
	border: 1px solid #fed7aa;
	border-radius: 18px;
	padding: 8px;
	box-shadow: 0 10px 25px rgba(243,128,32,.18);
}

h1 {
	font-size: 40px;
	line-height: 1.05;
	margin: 0;
	background: linear-gradient(90deg, #f38020, #6d28d9, #2563eb);
	-webkit-background-clip: text;
	color: transparent;
}

.subtitle {
	margin: 8px 0 0;
	color: #6b7280;
	font-size: 16px;
}

.verified-badge {
	background: #dcfce7;
	color: #166534;
	border: 1px solid #86efac;
	border-radius: 999px;
	padding: 10px 16px;
	font-weight: 700;
	white-space: nowrap;
}

.grid {
	display: grid;
	grid-template-columns: minmax(0, 1fr) 360px;
	gap: 28px;
}

.ask-card, .architecture-card, .side-card {
	background: #fff;
	border: 1px solid #e5e7eb;
	border-radius: 16px;
	box-shadow: 0 12px 30px rgba(15,23,42,.05);
}

.ask-card {
	padding: 18px;
}

textarea {
	width: 100%;
	height: 130px;
	padding: 16px;
	border: 1.5px solid #a78bfa;
	border-radius: 12px;
	font-size: 16px;
	line-height: 1.45;
	resize: vertical;
	outline: none;
	background: #fff;
}

textarea:focus {
	box-shadow: 0 0 0 4px rgba(109,40,217,.10);
}

.actions {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 14px;
}

button {
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	background: #fff;
	padding: 12px 16px;
	font-weight: 700;
	cursor: pointer;
}

button.primary {
	border: 0;
	color: #fff;
	background: linear-gradient(135deg, #f38020, #6d28d9, #2563eb);
	box-shadow: 0 8px 22px rgba(37,99,235,.22);
}

button:hover {
	transform: translateY(-1px);
}

h2 {
	margin: 18px 0 10px;
	font-size: 20px;
}

.response {
	background: #0b1220;
	color: #e5e7eb;
	border: 1px solid #1f2937;
	border-radius: 14px;
	padding: 18px;
	min-height: 230px;
	white-space: pre-wrap;
	font-size: 15px;
	line-height: 1.55;
	font-family: "SFMono-Regular", Consolas, monospace;
}

.architecture-card {
	margin-top: 18px;
	padding: 18px;
	display: grid;
	grid-template-columns: 310px 1fr;
	gap: 24px;
	align-items: center;
}

.ascii {
	margin: 0;
	padding: 16px;
	border: 1px dashed #cbd5e1;
	border-radius: 12px;
	background: #f8fafc;
	font-family: "SFMono-Regular", Consolas, monospace;
	font-size: 13px;
	text-align: center;
}

.architecture-note {
	border-left: 1px solid #e5e7eb;
	padding-left: 24px;
}

.shield-img {
	width: 70px;
	height: 70px;
	object-fit: contain;
	background: #fff7ed;
	border: 1px solid #fed7aa;
	border-radius: 18px;
	padding: 10px;
}

.side-card {
	padding: 20px;
}

.side-header {
	display: flex;
	gap: 14px;
	align-items: center;
	margin-bottom: 14px;
}

.side-logo {
	width: 48px;
	height: 48px;
	object-fit: contain;
}

.side-header h2 {
	margin: 0;
}

.side-header p {
	margin: 6px 0 0;
	color: #9a3412;
	font-weight: 700;
	font-size: 13px;
}

.feature {
	display: grid;
	grid-template-columns: 1fr 62px;
	gap: 12px;
	align-items: center;
	padding: 14px 0;
	border-bottom: 1px solid #eef2f7;
	font-weight: 700;
}

.feature:last-child {
	border-bottom: 0;
}

.reaction-icons {
	display: flex;
	gap: 8px;
	justify-content: flex-end;
	align-items: center;
}

.reaction-icons img {
	width: 22px;
	height: 22px;
	display: block;
}

footer {
	text-align: center;
	color: #6b7280;
	font-size: 13px;
	margin-top: 20px;
}

@media (max-width: 1050px) {
	.grid {
		grid-template-columns: 1fr;
	}

	.hero {
		align-items: flex-start;
		flex-direction: column;
	}

	.architecture-card {
		grid-template-columns: 1fr;
	}

	.architecture-note {
		border-left: 0;
		border-top: 1px solid #e5e7eb;
		padding-left: 0;
		padding-top: 18px;
	}
}`,
		{ headers: { "content-type": "text/css" } }
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
			const score = terms.reduce(
				(acc, term) => acc + (lower.includes(term) ? 1 : 0),
				0
			);
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
		answer:
			service && explanations[service]
				? explanations[service]
				: "Unknown service. Try workers, workers ai, ai gateway, d1, r2, or vectorize.",
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
	const relevantContext = searchKnowledgeBaseText(knowledgeBase, question).join(
		"\n\n---\n\n"
	);

	const prompt = `
You are a Developer Productivity ChatBot.

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
			zero_trust: "Protected by Cloudflare Access",
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

function handleVerifyAccess(request: Request): Response {
	const email =
		request.headers.get("cf-access-authenticated-user-email") || "not-present";

	const jwt = request.headers.get("cf-access-jwt-assertion")
		? "present"
		: "not-present";

	return json({
		status: "ok",
		message:
			"Request reached the application after Cloudflare Access evaluation.",
		access: {
			authenticated_user_email: email,
			jwt_assertion: jwt,
			protected_by: "Cloudflare Zero Trust Access",
		},
		architecture: [
			"User",
			"Cloudflare Access",
			"Identity verification at the edge",
			"Cloudflare Worker",
			"Workers AI",
			"D1",
		],
	});
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

		if (url.pathname === "/styles.css") {
			return styles();
		}

		if (url.pathname === "/api/ask" && request.method === "POST") {
			return handleAsk(request, env);
		}

		if (url.pathname === "/api/history" && request.method === "GET") {
			return handleHistory(env);
		}

		if (url.pathname === "/api/tools" && request.method === "GET") {
			return json({
				description:
					"MCP-style tool registry for the Developer Productivity ChatBot.",
				tools: getTools(),
			});
		}

		if (url.pathname === "/api/tool/search" && request.method === "POST") {
			return handleToolSearch(request, env);
		}

		if (url.pathname === "/api/tool/cloudflare" && request.method === "POST") {
			return handleCloudflareTool(request);
		}

		if (url.pathname === "/api/verify-access" && request.method === "GET") {
			return handleVerifyAccess(request);
		}

		if (url.pathname === "/api/health") {
			return json({
				status: "ok",
				service: "developer-productivity-chatbot",
			});
		}

		return json({ error: "Not found" }, 404);
	},
} satisfies ExportedHandler<Env>;
