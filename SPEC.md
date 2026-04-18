# AI Code Radar Specification

Version 1.0
Released under CC0 1.0 Universal (public domain).

This specification is released under CC0 1.0 Universal
(public domain). You may copy, modify, and use this
specification without attribution for any purpose.

## 1. Scope

AI Code Radar aggregates public ai-attestation data
from open source repositories and provides live,
quantitative statistics on AI code adoption across
languages, tools, ecosystems, industries, and regions.

The radar is a read-only data product. It does not
modify any repository or attestation file. It produces
aggregate statistics for public consumption.

## 2. Data Sources

All source data comes from three inputs:

1. **Attestation Registry**: Public `.ai-attestation.yaml`
   files in public GitHub repositories indexed by the
   Korext scanner pipeline.

2. **Supply Chain Registry**: Aggregate supply chain
   attestation reports published via
   `@korext/supply-check publish`.

3. **Scanner Feed**: Continuous scan results from the
   scanner pipeline (scripts/scanner/) that discovers
   new public repositories with attestation files.

No private repository data is included. No individual
developer data is exposed. All statistics are aggregated
with k-anonymity thresholds.

## 3. Aggregation Methodology

See METHODOLOGY.md for the complete methodology
including weighting algorithms, sample size gates,
outlier detection, and quality controls.

The aggregation pipeline runs hourly as a Cloud Run Job
and writes timestamped snapshots to storage.

## 4. Metrics Catalog

The radar produces the following metrics:

### 4.1 Global Metrics
- Global AI assisted percentage (weighted by repo size)
- Total repositories scanned
- Total AI assisted commits observed

### 4.2 By Language
- AI percentage per programming language
- Language ranking by AI adoption rate
- Language ranking by total AI commit volume

### 4.3 By Tool
- Market share per AI coding tool
- Tool adoption growth rate (week over week)
- Tool co-occurrence matrix

### 4.4 By Ecosystem
- AI percentage per package manager ecosystem
  (npm, PyPI, Cargo, Go, Maven, NuGet, Composer,
  RubyGems, Swift, CocoaPods, Pub, Hex, CPAN, Conda)
- Ecosystem ranking by attestation coverage

### 4.5 By Industry
- AI percentage per industry vertical
  (derived from GitHub topics and org metadata)

### 4.6 By Region
- AI percentage per country/region
  (derived from repository owner timezone)

### 4.7 By Repository Maturity
- AI percentage bucketed by repository age
  (< 1 year, 1-3 years, 3-5 years, 5+ years)

### 4.8 Governance Distribution
- Distribution of governance tiers across repos
  (UNGOVERNED, SCANNED, ATTESTED)

### 4.9 Time Series
- Weekly snapshots for all metrics above
- Trend calculation (4-week rolling average)

## 5. Quality Controls

### 5.1 Sample Size Gates
- Language/tool metrics require >= 50 repositories
- Regional metrics require >= 100 repositories
- Industry metrics require >= 100 repositories
- Metrics below threshold are suppressed, not estimated

### 5.2 Outlier Detection
- Winsorization at the 99th percentile
- Repositories with > 99% AI percentage are capped
  to prevent manipulation

### 5.3 Manipulation Prevention
- Repositories must have >= 10 commits to be included
- Forks are excluded from the primary index
- Archived repositories are excluded
- Single-commit repos are excluded

### 5.4 K-Anonymity
- No metric is published if it could identify
  fewer than 50 unique repositories (language/tool)
  or 100 unique repositories (region/industry)

## 6. API Specification

### 6.1 GET /api/radar/current
Returns the latest snapshot with all metrics.

### 6.2 GET /api/radar/history
Returns the last 52 weekly snapshots (1 year).

### 6.3 GET /api/radar/snapshot/[date]
Returns the snapshot for a specific ISO date.

### 6.4 GET /api/radar/methodology
Returns the current methodology document metadata.

All endpoints return JSON. All endpoints set
`Cache-Control: public, max-age=3600`.

## 7. Data Licensing

Radar data is licensed under CC BY 4.0.
Attribution requirement: "Data from AI Code Radar
by Korext (oss.korext.com/radar)".

The specification (this document) is CC0 1.0
(public domain). The code is Apache 2.0.

## 8. Embed Specification

Embeddable charts are available at:
`/radar/embed/[chart]`

Supported chart types: adoption-trend, tool-share,
language-breakdown, ecosystem-coverage.

Embed via iframe:
```html
<iframe
  src="https://oss.korext.com/radar/embed/adoption-trend"
  width="600" height="400"
  style="border:none;">
</iframe>
```

Charts auto-refresh every 60 minutes.

## 9. Privacy

- Aggregate data only
- No individual repositories displayed unless opted in
- No personally identifiable information
- Regional data only at country level with minimum
  100 repository sample size
- Opt out: add `radar: false` to `.ai-attestation.yaml`
