# Developer Productivity Copilot

A serverless AI-powered Developer Productivity Copilot built on Cloudflare's Developer Platform.

## Features

- Cloudflare Workers for application logic and API handling
- Workers AI for LLM inference
- AI Gateway for AI traffic governance, observability, and caching
- D1 for conversation persistence and history
- Externalized knowledge base served through Worker assets
- Lightweight retrieval layer to select relevant knowledge before inference
- MCP-inspired tool architecture for knowledge search and platform-specific capabilities

## Architecture

User → Worker → Retrieval → Workers AI → Response

Additional services:

- AI Gateway for AI request management
- D1 for chat history persistence
- Static knowledge base for developer productivity, platform engineering, AI, and Cloudflare concepts
```text

User

 |

Browser UI

 |

Cloudflare Worker

 |

Retrieval Layer

 |

Knowledge Base

 |

AI Gateway

 |

Workers AI

 |

Response

Persistence:

Worker -> D1 -> Chat History

Tool Layer:

Worker -> MCP-inspired Tool Registry
## Purpose

This project was built to gain hands-on experience with Cloudflare's Developer Platform, AI application architectures, retrieval-augmented workflows, AI governance, and MCP-style tool integration patterns.

## Technologies

- Cloudflare Workers
- Workers AI
- AI Gateway
- D1
- TypeScript
- Serverless Architecture
- Retrieval-Augmented Generation concepts
- MCP-inspired tool calling patterns
