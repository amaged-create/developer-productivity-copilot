# Architecture

## Overview

Developer Productivity Copilot is a serverless AI application built on Cloudflare's Developer Platform.

```text

User

 |

Browser UI

 |

Cloudflare Worker

 |

+----------------------+

| Tool Registry        |

| - searchKnowledgeBase|

| - explainCloudflare  |

+----------------------+

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
