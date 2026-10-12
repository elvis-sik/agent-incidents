# Source review — 27 September 2026

The curator requested primary disclosures and original independent investigations, with Reuters and Associated Press preferred for equivalent secondary reporting. This pass covered the eight retained incidents after removing the Grok/Bankr transfer, OpenClaw gym and Grok Build entries. It was a targeted search, not an exhaustive news archive review.

| Incident | Selection decision |
| --- | --- |
| RubyGems / RubyDoc | Retain the original status notice, Socket and RubyHack investigations, and official responses. Reuters replaces redundant The Hacker News and Register coverage. |
| July Hugging Face intrusion | Retain the affected organisation’s disclosures, OpenAI reports and the joint METR/Redwood investigation. Use AP for secondary coverage; represent the joint investigation once. The redundant Reuters factbox was removed when its original URL could not be sufficiently corroborated. |
| May Hugging Face account activity | Retain the original Reuters investigation. |
| Wiki and Australian websites | Retain Collusion Wiki, Transluce, official Australian statements, OpenAI’s acknowledgment and ABC’s local reporting. Reuters replaces repeated TechCrunch coverage. |
| OpenAI image uploads | Retain OpenAI’s dated disclosure and Reuters coverage. The occurrence date remains undisclosed. |
| Irregular evaluations | Retain the four providers’ evidence, Reuters’s Anthropic report and AP’s Meta report. Keep Axios’s direct Google/Irregular statements; remove derivative Ars Technica coverage. |
| AISI cyber evaluation | Retain the government incident report and the provider responses. Another general news recap adds little to those primary accounts. |
| Meta internal-agent exposure | Keep The Information’s original scoop, The Verge’s named Meta-spokesperson response and The Guardian’s follow-up. The Verge replaces redundant TechCrunch coverage. No matching Reuters/AP report surfaced in the targeted search. |

## Publication dates

- **AISI: 4 August 2026.** The official page’s displayed breadcrumb supplies the date. It is also the record’s first-report source.
- **Axios Google report: 18 September 2026.** The visible article header controls; the URL contains the following day.
- Dates on OpenAI’s rolling page refer to the specific dated entries cited, rather than the whole page’s publication or last-modified date.

## Access and interpretation

The curator subsequently requested original publisher links throughout. Five Reuters original links were corroborated by exact links in contemporaneous references or archive listings, alongside matching syndicated titles, dates and bylines. Direct Reuters retrieval remained blocked; the destinations were not guessed from titles. Some bodies were read through attributed syndications; a reprint is not independent corroboration and does not need its own source entry. See the dated follow-up below for the verified original-link replacements.

The Information’s original Meta story was paywalled; its indexed material and the accessible reports were inspected. The WSJ Google story was only partly accessible, so the record uses Axios’s inspected report with direct statements instead. Search gaps are not evidence that no other coverage exists. An original investigation, a provider statement and a news report have different evidential roles; none alone proves complete incident scope.

Source URLs, publication dates and short evidence notes are stored in the incident JSON. Detailed working ledgers are retained separately from this website repository. Run the checks in [README.md](../README.md) to verify the current build; those checks do not re-verify source claims.

## Original links and OpenAI catalogue follow-up

The five retained Reuters entries now link to reuters.com and name Reuters as publisher. The July factbox was dropped because its original URL was only supported by one weaker reference; the incident retains primary disclosures, the joint investigation and AP. Reading through a syndication is recorded in source evidence notes, but the reprint is no longer the cited destination.

The nine full reports in OpenAI’s misalignment catalogue are included as separate report-level entries. Its three notices refer to existing incidents. The six initial reports’ 16 September publication date is corroborated by OpenAI’s dated [reporting-framework announcement](https://openai.com/index/model-misalignment-reporting-framework/), which names them. Incident, discovery and disclosure dates remain distinct. The collection now covers 2025 as well as 2026; training and simulated evaluation conditions stay explicit.

The self-replicating-injection report explicitly gives a 25 September disclosure date. The GitHub-token and DNS reports show 25 September as their update date, corroborated by exact-page search publication metadata, but do not expose a separate first-publication timestamp; their evidence notes retain this limitation. The self-replication entry is ordered by its explicitly labelled discovery date because separate experiment dates are not given.

## UNCTAD addition

Added [Howard-Jones’s original research](https://swarmcha.se/posts/openai-unctad) and the [original WSJ report](https://www.wsj.com/tech/ai/openai-agents-used-aggressive-techniques-to-access-u-n-website-522c70ff), both dated 26 September in their visible publisher dates. WSJ displays 8:14 pm ET, which corresponds to its 27 September UTC timestamp; the date-only record follows the displayed date. The researcher report was read in full; WSJ access was limited to its headline, deck and opening paragraphs. The original research supports the detailed event and explicitly limits the DSEwiki connection. Transluce supplied the lead, not data used directly in this analysis, according to the author; the WSJ preview describes that provenance differently.

The curator subsequently grouped UNCTAD within the broader DSEwiki/Transluce episode. Its sources and event were moved intact into `openai-wiki-australia-2026`; the parent starts at the earliest reviewed UNCTAD scan on 13 April. This is an editorial grouping and preserves the original research’s attribution and provenance limits.

## DSEwiki focus and Anthropic assessment check

The DSEwiki title and summary now lead with Nightingale Collective’s original report; UNCTAD and Australian activity remain labelled related events. The grouped date window is unchanged. Anthropic’s 9 September assessment was checked against all four Anthropic events already present under Irregular: no new incident was missing. Updated the internal-research-model event and assessment note to reflect Anthropic’s revised interpretation. Simulated resampling is not counted as additional real-world incidents, and AISI remains a separate entry.

## Irregular attribution audit

Rechecked all seven event entries against the cited disclosures on 27 September. Grouping follows the shared evaluator, not coincident dates or a single execution.

| Events | Attribution evidence |
| --- | --- |
| Anthropic Opus 4.7, Mythos 5 / PyPI, internal research model | The 30 July disclosure explicitly names Irregular as the evaluation partner for all three; PyPI is Incident 2. |
| Anthropic January Opus 4.6 | The 9 September assessment says all four used the same partner and places this case in the same environment as the earlier three. The July disclosure names that partner as Irregular. |
| OpenAI website access | OpenAI’s 4 August disclosure has an Irregular section identifying the partner and its 29 July notification. |
| Meta Muse Spark | Meta’s 14 August disclosure explicitly names its Irregular contract and says the evaluation ran on Irregular infrastructure. |
| Google Gemini | Axios reports the Irregular-run evaluation and direct confirmation from an Irregular spokesperson. |

The PyPI occurrence date is not published in either Anthropic disclosure; 30 July is its report date. January is the supported month for Opus 4.6. AISI is explicitly excluded from Anthropic’s September assessment and remains separate. Corrected the January event’s prior claim that impact was undisclosed: the assessment describes admin access, configuration changes and access to one person’s information; the organisation and exact day remain undisclosed.

## Meta source upgrade and Australian mention

A further targeted search found no matching original coverage from Reuters/AP/Bloomberg/WSJ or a standalone Meta incident disclosure. Added [The Verge’s 19 March report](https://www.theverge.com/ai-artificial-intelligence/897528/meta-rogue-ai-agent-security-incident), which quotes Meta spokesperson Tracy Clayton directly about the agent’s limited action and the employee’s subsequent action. This replaces TechCrunch’s shorter account; The Information remains the original scoop and The Guardian remains a follow-up. The summary now attributes Meta’s claims directly. Source count is unchanged.

The DSEwiki title and summary now mention related Australian website access, while Nightingale’s report remains the lead. UNCTAD stays in the related events.
