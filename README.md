# Credibute

**Every commit counts. Every contribution matters.**

Credibute is an open-source tool that helps students understand and communicate individual contributions to group software projects through transparent, evidence-based analysis of Git repository activity.

Connect a repository, map contributors to group members, define an assignment-specific rubric or use the default scoring system, and generate a report showing how contributions are distributed—with evidence behind every result.

No AI. No unexplained scores. Just deterministic, reproducible analysis.

> **Important:** Credibute estimates contribution shares from available repository data. It does not measure a student's complete effort, determine the true difficulty or value of every task, or assign academic grades.

## ✨ Why Credibute?

Group projects can make it difficult to understand how work was distributed. Git history provides useful evidence, but raw commit counts alone don't tell the whole story.

Credibute aims to make repository activity easier to interpret by combining multiple signals into a transparent contribution report.

- **Evidence-based analysis** — examine commits, changed files, additions and deletions, pull requests, reviews, documentation, and other available repository signals.
- **Flexible scoring** — use a built-in rubric or configure criteria provided by an instructor.
- **Explainable results** — show score breakdowns, supporting evidence, exclusions, and limitations.
- **Deterministic scoring** — apply documented rules instead of AI-generated judgments.
- **Contributor identity mapping** — associate Git accounts and commit identities with actual group members.
- **Exportable reports** — make analysis easier to review and share.
- **Open source** — build a transparent tool that students and educators can inspect and improve.

## 🎯 How It Works

1. **Connect a repository**  
   Select a supported GitHub or GitLab repository.

2. **Identify team members**  
   Map repository usernames, commit emails, and other available identities to group members.

3. **Choose a scoring rubric**  
   Enter instructor-provided criteria and map them to observable repository evidence, or use Credibute's default rubric.

4. **Analyze repository activity**  
   Evaluate available changes and collaboration signals using documented, deterministic rules.

5. **Review the results**  
   Explore estimated contribution shares, criterion-level scores, supporting evidence, and excluded activity.

6. **Export a report**  
   Generate a structured report for review and discussion.

## 📊 What Does Credibute Analyze?

Depending on the repository provider and available data, analysis may include:

- Commits and commit history
- Files changed, additions, and deletions
- Pull requests or merge requests
- Code reviews and review comments
- Merged changes
- Tests and test-related changes
- Documentation and configuration changes
- Reverts, generated files, and duplicate or overlapping changes

Not every signal is available for every repository. Credibute should disclose missing data rather than invent evidence or silently treat unavailable criteria as zero.

## ⚖️ Transparent by Design

Credibute is designed around a few important principles:

- **No AI-based scoring.** Results come from documented rules and available evidence.
- **No commit-count-only rankings.** Commit quantity is not a reliable standalone measure of contribution.
- **No hidden scores.** Users should be able to understand how the scoring system reached a result.
- **No claim of perfect fairness.** Repository activity is only one view of collaborative work.
- **No fabricated evidence.** Missing or unsupported criteria must be clearly identified.
- **Reproducible results.** The same repository snapshot and scoring configuration should produce the same result.

### Understanding contribution percentages

A contribution percentage represents a member's estimated share of the repository activity captured by the selected scoring model. It is not a direct measurement of hours worked, creativity, task difficulty, or overall academic performance.

Research, planning, meetings, mentoring, debugging outside version control, and other valuable work may not appear in Git history. Results should therefore support discussion and reflection—not automatically determine grades or accusations of unequal effort.

## 🛠️ Tech Stack

The initial implementation is planned around:

- **Frontend:** React, JavaScript, and Vite
- **Backend:** Node.js and JavaScript
- **Repository integration:** GitHub API first, with GitLab planned
- **Validation:** Zod
- **Testing:** Vitest
- **Data storage:** PostgreSQL, if persistence is required

The scoring engine should remain independent of the frontend and repository provider so that its rules can be tested, documented, and extended.

_The stack and integrations above describe the intended architecture and may change during development._

## 🚧 Project Status

Credibute is in the early development and planning stage.

Planned milestones:

- [ ] Define and document the default scoring rubric
- [ ] Implement GitHub repository integration
- [ ] Build contributor identity mapping
- [ ] Analyze commits and file-level changes
- [ ] Support custom assignment criteria
- [ ] Generate transparent score breakdowns and evidence
- [ ] Exclude or account for generated files, reverts, and duplicate changes
- [ ] Export contribution reports as CSV
- [ ] Add GitLab integration
- [ ] Add additional report formats and analysis signals

Features may change as the project develops. Please check the issue tracker for current priorities and implementation status.

## 🔐 Privacy and Security

Repository access should follow the principle of least privilege.

Credibute aims to:

- Request only the permissions needed for analysis.
- Handle access tokens securely on the server.
- Avoid collecting unrelated repository or personal data.
- Explain what data is processed and why.
- Provide appropriate ways to disconnect integrations and delete stored project data.

Do not submit credentials, access tokens, or other secrets in issues or public discussions. Security issues should be reported privately through the repository's supported reporting channel.

## 🤝 Contributing

Contributions, ideas, bug reports, and thoughtful feedback are welcome.

To contribute:

1. Check existing issues and discussions before starting substantial work.
2. Open an issue to discuss significant features or changes.
3. Create a branch for your changes.
4. Add or update tests where appropriate.
5. Submit a pull request describing what changed and why.

Scoring logic deserves particular care. Changes to the rubric should include documentation, test cases, and an explanation of how the change affects transparency and reproducibility.

Contribution guidelines will be expanded as the project matures.

## 🗺️ Roadmap

The long-term goal is to support a transparent contribution-analysis workflow for student software projects across repository providers.

Potential future improvements include:

- More configurable scoring criteria
- Stronger duplicate-change and generated-file detection
- Better review and collaboration analysis
- Snapshot comparisons across project milestones
- PDF report generation
- Additional repository providers and integrations

Roadmap items are proposals, not promises of delivery.

## 📄 License

The project's license has not yet been selected. A license should be added before the repository is publicly released for community reuse and contributions.

---

**Credibute — clearer evidence for collaborative work.**
