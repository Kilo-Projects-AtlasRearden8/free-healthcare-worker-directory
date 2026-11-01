# Freebies Directory for Healthcare Workers

A static, client-side-searchable directory of free resources for healthcare workers: continuing education (CE) courses, scholarships and grants, printables and handouts, and support lines. Official links only. Education only &mdash; never medical advice.

Published and maintained by **Asdale Dynamics, LLC** (Indiana, formed October 2026). See [dylanasdale.github.io](https://dylanasdale.github.io).

## What's inside

- **Continuing education** &mdash; CDC TRAIN / CDC Learning Lab, OpenWHO (WHO), ANA free CE
- **Scholarships & grants** &mdash; HRSA Nurse Corps, ANA Foundation
- **Printables & handouts** &mdash; CDC printable resources, MedlinePlus handouts
- **Support & crisis lines** &mdash; 988 Suicide & Crisis Lifeline, SAMHSA National Helpline, Emotional PPE Project, NIOSH safety topics

## How to run

This is a static site with no build step. Open `index.html` in any browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Client-side search and category filtering run entirely in the browser from `resources.json`.

## Credits

Copyright (c) 2026 **Asdale Dynamics, LLC**. Licensed under the MIT License &mdash; see `LICENSE`.
