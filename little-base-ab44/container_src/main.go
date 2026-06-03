package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func htmlPage() string {
	return `<!doctype html>
<html>
<head>
	<title>Private Engineering Portal</title>
	<style>
		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background: #0f172a;
			color: #e5e7eb;
		}
		.page {
			max-width: 900px;
			margin: 60px auto;
			padding: 32px;
		}
		.card {
			background: #111827;
			border: 1px solid #334155;
			border-radius: 18px;
			padding: 32px;
			box-shadow: 0 20px 60px rgba(0,0,0,.35);
		}
		.badge {
			display: inline-block;
			background: #dcfce7;
			color: #166534;
			padding: 8px 14px;
			border-radius: 999px;
			font-weight: 700;
			margin-bottom: 20px;
		}
		h1 {
			font-size: 42px;
			margin: 0 0 12px;
		}
		p {
			color: #cbd5e1;
			font-size: 18px;
			line-height: 1.6;
		}
		pre {
			background: #020617;
			border: 1px solid #334155;
			border-radius: 12px;
			padding: 20px;
			color: #93c5fd;
			white-space: pre-wrap;
		}
		.grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16px;
			margin-top: 22px;
		}
		.box {
			background: #020617;
			border: 1px solid #334155;
			border-radius: 12px;
			padding: 18px;
		}
	</style>
</head>
<body>
	<div class="page">
		<div class="card">
			<div class="badge">Private App Emulation</div>
			<h1>Private Engineering Portal</h1>

			<p>This application is running inside a Cloudflare Container.</p>

			<p>For the interview demo, this container emulates an internal private application. In a real customer environment, this same access model could protect Jenkins, GitLab, Jira, Grafana, SSH, RDP, databases, or a private app in a datacenter, VPC, or Kubernetes cluster.</p>

			<pre>User
 |
 v
Cloudflare Access
 |
 v
private.aelbornou.com
 |
 v
Cloudflare Worker
 |
 v
Cloudflare Container
 |
 v
Private Engineering Portal</pre>

			<div class="grid">
				<div class="box">
					<strong>Demo value</strong>
					<p>Shows app-level access without granting broad network access.</p>
				</div>
				<div class="box">
					<strong>Production version</strong>
					<p>Swap the container origin with Cloudflare Tunnel to a private network app.</p>
				</div>
			</div>
		</div>
	</div>
</body>
</html>`
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "text/html; charset=utf-8")
	fmt.Fprint(w, htmlPage())
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	fmt.Fprint(w, `{"status":"ok","service":"private-engineering-portal-container"}`)
}

func main() {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)

	router := http.NewServeMux()
	router.HandleFunc("/", handler)
	router.HandleFunc("/health", healthHandler)

	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	go func() {
		log.Printf("Private Engineering Portal listening on %s\n", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()

	sig := <-stop
	log.Printf("Received signal (%s), shutting down server...", sig)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal(err)
	}

	log.Println("Server shutdown successfully")
}
