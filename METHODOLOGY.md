# AI Code Radar Methodology

> This document is released under CC0 1.0 Universal (public domain).

Every statistic published on the AI Code Radar dashboard links back to a section of this document. Transparency is not optional. If a journalist, regulator, or researcher cannot trace a number to its formula, its sample size, and its known limitations, that number has no business being published.

## 1. Data Source

All data is sourced exclusively from public `.ai-attestation.yaml` files present in open source repositories. These files are voluntarily published by repository maintainers who have installed the [ai-attestation](https://oss.korext.com/ai-attestation) tool.

We do not infer, estimate, or guess AI usage for repositories that do not explicitly declare it. We do not scrape private repositories. We do not access any data that is not already public on GitHub.

## 2. Weighted AI Percentage

The primary headline metric. Weighted by total commits in each repository so that larger, more active repositories contribute proportionally more to the aggregate.

```
weighted_ai_percentage =
  sum(repo.ai_assisted_commits for all repos) /
  sum(repo.total_commits for all repos)
```

**Sample size:** All repositories with a valid `.ai-attestation.yaml` file accessible via public GitHub.

**Known limitations:**
- Only captures repos that have opted into tracking (selection bias toward transparency-forward organizations)
- Does not include private repositories or closed source code
- Larger repos with more commits contribute more weight, which may over-represent certain ecosystems

## 3. Median AI Percentage

The median of per-repo AI percentages. Each repository contributes one data point regardless of size. This complements the weighted metric by showing what a "typical" repository looks like rather than an aggregate dominated by large repos.

```
median_ai_percentage = median(repo.ai_percentage for all repos)
```

## 4. Tool Market Share

Each AI tool's share is calculated as the number of unique repositories where that tool was detected, divided by the total number of repositories with any AI tool detected.

```
tool_share = repos_where_tool_detected / total_repos_with_any_ai
```

Note: A single repository may use multiple tools. Tool shares therefore sum to more than 100%.

## 5. Language Breakdown

Repositories are bucketed by their primary language (as determined by the repository's dominant file extension). The weighted AI percentage is computed independently within each language bucket.

**Minimum sample size:** A language must have at least 50 repositories to be listed. Languages below this threshold are aggregated into "Other."

## 6. Industry and Regional Breakdowns

These dimensions are populated only when repositories include the optional `radar.industry` or `radar.region` fields in their attestation. Because these fields are optional, coverage is lower than global metrics.

**Minimum sample size:** 100 repositories per industry or region. This threshold is intentionally higher than language breakdowns to protect k-anonymity (a single organization should not be identifiable from a regional or industry cut).

**Regional granularity:** Country level only (ISO 3166-1 alpha-2 codes). City level and organization level breakdowns are never published.

## 7. Governance Percentage

For industry and maturity breakdowns, the governance percentage represents the fraction of repositories that have a governance scan result of either SCANNED or ATTESTED (as opposed to UNGOVERNED or absent).

```
governance_percentage =
  (repos_attested + repos_scanned) /
  total_repos_in_segment
```

## 8. Trend Calculations

The `trend_30d` field on each metric represents the absolute change in that metric's value compared to 30 days ago.

```
trend_30d = current_value - value_30_days_ago
```

Positive values indicate growth. Negative values indicate decline.

## 9. Outlier Detection and Winsorization

A single repository with an enormous number of commits could skew global statistics disproportionately. To prevent this:

1. **99th percentile Winsorization:** Any repository with a total commit count above the 99th percentile has its count capped at the 99th percentile value.
2. **1% contribution cap:** No single repository may contribute more than 1% of the total aggregate denominator.
3. **Logging:** Any repository that triggers either cap is logged for manual review.

## 10. Manipulation Prevention

Because attestation files are self-published, they could theoretically be fabricated. We implement the following mitigations:

- **Signature validation:** AI tool claims must align with plausible detection signatures (co-author trailers, commit message patterns). A commit claiming "Copilot" must have a valid Copilot co-author trailer or matching heuristic.
- **Rapid growth flagging:** If a repository suddenly reports more than 10,000 AI commits in a single attestation update, it is flagged for review and excluded from aggregates pending investigation.
- **Source verification:** For package attestations, the attestation's source repository URL must match the package's registered source. Mismatches are excluded.

## 11. Opt-Out

Any repository can exclude itself from radar aggregates by adding the following to its `.ai-attestation.yaml`:

```yaml
radar:
  include_in_aggregates: false
```

Opted-out repositories are excluded from all radar computations. The attestation itself continues to function normally.

## 12. Quality Scorecard

Every published radar snapshot includes a quality scorecard showing how many attestations were included, excluded (and why), and the overall confidence level. This scorecard is visible on the dashboard via the "Data Quality" section.

## 13. Limitations

This section is intentionally prominent because honest methodology acknowledges its boundaries.

1. **Selection bias:** The sample only includes repositories that have proactively installed ai-attestation. These repos are more likely to be transparency-forward, open source, and developer-tools-adjacent. The data should NOT be interpreted as "X% of all code globally is AI assisted."

2. **Public only:** Enterprise, private, and closed source repositories are entirely absent.

3. **Voluntary tagging:** Industry and region fields are optional. Coverage varies significantly across dimensions.

4. **Detection accuracy:** AI tool detection relies on publicly observable patterns (co-author trailers, commit messages). Tools that leave no trace are not detectable.

5. **Temporal skew:** Newer repositories are more likely to have AI tools. The sample over-represents recently created or recently active repositories.

We publish these limitations because hiding them would be dishonest. Every citation of radar data should acknowledge the sample composition.
