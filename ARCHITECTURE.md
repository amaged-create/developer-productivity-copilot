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
```

# Business Outcomes

- Secure SaaS Access
- Secure Private Application Access
- Secure Internet Access
- Reduced Attack Surface
- VPN Replacement
- Consistent Security Policies

Core principle:

User Identity + Device Trust + Policy = Access Decision
