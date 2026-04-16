# AI Code Radar

The real-time pulse of AI code adoption across open source.

[![License: Code](https://img.shields.io/badge/code-Apache%202.0-blue)](LICENSE)
[![License: Spec](https://img.shields.io/badge/spec-CC0%201.0-green)](LICENSE-SPEC)
[![License: Data](https://img.shields.io/badge/data-CC%20BY%204.0-orange)](LICENSE-DATA)

Every article about AI coding cites "a recent survey of 200 developers" or anecdotes. There has been no public, quantitative, live data source for AI code adoption.

Until now.

AI Code Radar aggregates public ai-attestation data from thousands of open source repositories and provides the first live, methodologically rigorous view of how the software industry is actually using AI coding tools.

## Live Dashboard

[oss.korext.com/radar](https://oss.korext.com/radar)

## Data License

All radar data is released under [CC BY 4.0](LICENSE-DATA). You may use it freely in articles, research, and analyses with attribution to "AI Code Radar, Korext Open Source."

## API

```bash
curl https://oss.korext.com/api/radar/current
```

See [API documentation](https://oss.korext.com/radar/api).

## SDKs

JavaScript:
```bash
npm install @korext/radar-data
```

Python:
```bash
pip install korext-radar-data
```

## Embed Live Charts

Use the embeddable iframe in articles or dashboards:

```html
<iframe
  src="https://oss.korext.com/radar/embed/global-percentage"
  width="600"
  height="400"
  frameborder="0"
  title="AI Code Radar">
</iframe>
```

The chart updates automatically. No article republishing needed.

## Reports

- **Weekly reports**: auto generated every Monday, covering week over week change
- **Quarterly deep dives**: written analysis, 30 to 50 pages
- **Annual state of AI code**: the definitive industry reference

Subscribe at [oss.korext.com/radar](https://oss.korext.com/radar).

## Methodology

Every statistic on the dashboard links to its methodology. See [METHODOLOGY.md](METHODOLOGY.md) for the full methodological approach.

Key points:

- Data sourced from public ai-attestation files
- k-anonymity thresholds (minimum 50 to 100 samples per cut)
- Outlier winsorization and repo contribution caps
- Quality scorecard published with every snapshot
- Transparent limitations acknowledged

## Privacy and Ethics

- Aggregate only. No individual repos displayed (unless opted in).
- Public data only. No scraping, no private repos.
- Opt out supported via `radar.include_in_aggregates: false`.
- No PII. Patterns, not people.
- Regional data only at country level with minimum sample size.

## For Data Journalists

Resources:
- [API documentation](https://oss.korext.com/radar/api)
- [Attribution guide](ATTRIBUTION.md)
- [Press contact](mailto:press@korext.com)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

To improve the aggregation methodology, submit a PR to METHODOLOGY.md with rationale.

To add a new metric to the dashboard, submit an issue describing the metric and its intended use.

## Built by

[Korext](https://korext.com) builds AI code governance tools. AI Code Radar is an open community resource powered by the ai-attestation ecosystem.
