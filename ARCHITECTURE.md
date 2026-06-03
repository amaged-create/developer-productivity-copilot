
# ARCHITECTURE.md
# Cloudflare One Zero Trust Demo Architecture
## Purpose
This architecture demonstrates how Cloudflare One can secure three common enterprise access patterns:
1. SaaS application access
2. Private application access
3. Internet access
The demo is designed to show business value, not just technical configuration.
---
# High-Level Architecture
```text
                         Cloudflare One
                +-----------------------------+
                | Access / ZTNA               |
                | Gateway / SWG               |
                | Device Posture              |
                | Tunnel                      |
                +-------------+---------------+
                              |
        +---------------------+---------------------+
        |                                           |
        v                                           v
 SaaS / Cloud Apps                         Private Applications
 demo.aelbornou.com                        tunnelz.aelbornou.com
                                                |
                                                v
                                      Cloudflare Tunnel
                                                |
                                                v
                                      MacBook localhost:8080

⸻

Component 1: SaaS / Developer Productivity Application

URL

demo.aelbornou.com

Purpose

Represents a SaaS-style developer productivity application.

Business Value

* Secure access to cloud-hosted applications
* Apply identity-aware access controls
* Support modern developer workflows
* Demonstrate Cloudflare as an application and security platform

⸻

Component 2: Private Engineering Portal

URL

tunnelz.aelbornou.com

Origin

MacBook Air
localhost:8080
Express application

Purpose

Represents an internal private application such as:

* Jenkins
* Grafana
* Confluence
* GitLab
* Internal APIs
* Security dashboards

Flow

User
  ↓
Cloudflare Access
  ↓
Cloudflare Tunnel
  ↓
Private Engineering Portal

Business Value

* Replace VPN access with application-level access
* Avoid exposing private applications directly to the Internet
* Eliminate inbound firewall rules and port forwarding
* Reduce attack surface
* Improve user experience

⸻

Component 3: Cloudflare Tunnel

Purpose

Cloudflare Tunnel connects the private application to Cloudflare using outbound-only connectivity.

Flow

MacBook Air
  ↓ outbound tunnel
Cloudflare Edge
  ↓
User request

Key Security Benefit

The origin does not require:

* Public IP address
* Inbound firewall rule
* Port forwarding
* VPN concentrator

Business Value

* Reduced infrastructure exposure
* Simpler remote access model
* Faster deployment of private applications

⸻

Component 4: Cloudflare Access

Purpose

Cloudflare Access enforces Zero Trust policies before users reach the private application.

Policy Inputs

Access decisions can use:

* User identity
* Email address
* Identity provider group
* Device posture
* MFA
* Location
* Risk signals

Demo Policy Example

Allow access if:
  User is authorized
  AND device posture requirements are met

Business Value

* Grant access to applications, not networks
* Reduce lateral movement risk
* Improve control over third-party and remote access

⸻

Component 5: Device Posture

Purpose

Device posture checks verify that the accessing endpoint meets security requirements.

Configured Posture Checks

Disk Encryption Enabled
Firewall Enabled

Business Value

* Reduce risk from unmanaged or unhealthy devices
* Enforce corporate security standards
* Protect sensitive applications even if credentials are compromised

⸻

Component 6: Cloudflare One Client

Purpose

The Cloudflare One Client connects the endpoint to Cloudflare One and reports device posture.

Device

MacBookAir.lan

Business Value

* Security follows the user wherever they work
* Enables Gateway filtering
* Enables posture-based access controls
* Supports remote and hybrid workforces

⸻

Component 7: Secure Web Gateway

Purpose

Cloudflare Gateway protects outbound Internet access.

Demo Example

reddit.com → blocked by policy
github.com → allowed

Capabilities

* DNS filtering
* HTTP filtering
* HTTPS inspection
* Category blocking
* Malware and phishing protection
* Activity logging

Business Value

* Protect users from risky destinations
* Enforce acceptable use policies
* Reduce phishing and malware exposure
* Provide visibility into Internet activity

⸻

End-to-End SASE Story

Traditional Model

User
  ↓
VPN
  ↓
Corporate Network
  ↓
Applications / Internet

Challenges:

* Broad network access
* Lateral movement risk
* Inconsistent security controls
* Poor user experience
* Infrastructure complexity

⸻

Cloudflare One Model

User
  ↓
Cloudflare One
  ↓
Policy Decision
  ↓
Specific Resource

Cloudflare evaluates:

* Who is the user?
* Is the device trusted?
* Is the device healthy?
* What resource is being accessed?
* What policy applies?

⸻

Business Outcomes

Reduced Attack Surface

Private applications are not directly exposed to the Internet.

VPN Replacement

Users access specific applications instead of entire networks.

Better User Experience

Users access resources through normal browser workflows.

Stronger Security

Access requires identity and device trust.

Simplified Operations

One platform protects SaaS, private apps, and Internet access.

⸻

Demo Summary

This architecture demonstrates how Cloudflare One provides:

Secure SaaS Access
+
Secure Private Application Access
+
Secure Internet Access

using one policy-driven platform.

The core message:

User Identity
+
Device Trust
+
Policy
=
Access Decision

