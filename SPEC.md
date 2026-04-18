# AI Code Radar Specification

Version 1.0
Released under CC0 1.0 Universal (public domain).

This specification is released under CC0 1.0 Universal (public domain). You may copy, modify, and use this specification without attribution for any purpose.

## What This Is

AI Code Radar aggregates public ai-attestation data from open source repositories and provides live, quantitative statistics on AI code adoption across languages, tools, ecosystems, industries, and regions.

## Scope

AI Code Radar covers:

- Aggregate statistics derived from public ai-attestation files.
- Time series data showing trends.
- Tool market share across public repositories.
- Ecosystem breakdowns by package manager.
- Regional and industry segmentation where sample size permits.

## Data Sources

All source data comes from publicly available ai-attestation files in public GitHub repositories and from the Korext supply chain registry.

No private repository data is included. No individual developer data is exposed. All statistics are aggregated with k-anonymity thresholds.

## Aggregation Methodology

See METHODOLOGY.md for the complete methodology including weighting algorithms, sample size gates, outlier detection, and quality controls.

## Output Format

The radar produces timestamped snapshots in YAML format. See the full schema in the project README.

## Privacy

Aggregate only. No individual repos displayed unless opted in. No PII. Regional data only at country level with minimum 100 repo sample size.

## Licensing

This specification is CC0 1.0 Universal (public domain). The code is Apache 2.0. The data is CC BY 4.0.
