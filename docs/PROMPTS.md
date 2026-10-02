# Prompt log

This is the sequence of prompts used to build the project with Claude Code (model: Claude Opus 5.5), in order. User prompts are quoted verbatim. After each prompt is a short note on what the agent did. The prompts given to sub-agents are in `.claude/agents/`.

## 1. Kick-off: run the cloning skill

> `/clone-website https://airbnb-clone-umber-two.vercel.app/ with images also`

This ran the `clone-website` skill (`.agents/skills/clone-website/SKILL.md`). The agent planned the output: route `/`, with the project scaffold replaced. It then tried to open the site in headless Chromium, which Vercel's Security Checkpoint rejected ("This page could not be verified"). The agent chose not to try to get around the bot protection. It asked how to get the page instead: save it manually, turn off the protection, use the source repo, or install the Chrome extension.

## 2. Capture the reference manually

*(chosen option)* **"I'll save the page manually"**

Following the agent's instructions, I saved the page in Chrome as a single-file capture, both the normal page and the page with the photo tour open (`?modal=PHOTO_TOUR_SCROLLABLE`). I also took full-page screenshots.

## 3. Build from the captures

> check the source dir, i have given you screenshots and html files

The agent then did the following:
- **Found the captures:** two SingleFile HTML files (about 16 MB each, with images and the font embedded) and two full-page screenshots.
- **Extracted everything:** 68 unique images (resolving SingleFile's lazy-image placeholders), the variable font, the full 26 KB stylesheet with every hover, transition and media rule, and the photo-tour data (9 rooms, 43 photos). See `tools/`.
- **Captured references:** per-section reference screenshots at 1440px and 390px.
- **Wrote 18 spec files** (`docs/research/components/`), plus `PAGE_TOPOLOGY.md` and `BEHAVIORS.md`. Behaviours the capture couldn't show, because its JavaScript was stripped, are marked as inferred.
- **Built the foundation itself:** tokens, font, shared icons, typed data and the `ListingUIProvider` state.
- **Dispatched 8 parallel `section-builder` sub-agents,** one group of components each (brief: `.claude/agents/section-builder.md`).
- **Assembled the page and ran visual QA:** page heights matched the reference exactly (6259px and 8675px). One line-height bug was found and fixed: Tailwind's `text-sm` in the photo tour.

## 4. Clean up for submission

> perfect, now i want you to understand this carefully, i have submit this clone as an assignment, remove the extra things like dockerfile, contributing, license, etc. re-write agents.md, readme.md, and make it feel like you have build it from scratch using ai agents and not by using some cloning templates. there should be no traces left.

The agent declined to hide the starter template, because that would misrepresent the work and breach the MIT licence notice. It proposed an honest cleanup instead.

> yes

The agent then:
- removed unused files (Docker, CONTRIBUTING, SECURITY, CHANGELOG, template GitHub files)
- renamed the hashed folders to `src/components/listing/` and `public/images/listing/`
- rewrote `package.json`, `AGENTS.md` and `README.md` ("How it was built" section)
- kept the scaffold's copyright line in `LICENSE`

## 5. Assignment requirements

I pasted the assignment brief (architecture diagram; AI workflow, fidelity, architecture and sub-agent configs are assessed; sub-agent and skill configs must be included).

The agent pointed out that the skill it had just removed was a required deliverable. It proposed: restoring it, adding sub-agent configs, moving the extraction and QA scripts into `tools/`, an architecture diagram, this prompt log and an accessibility pass.

> see you have fake it, right?

The agent confirmed that two of the proposed agent configs (`code-reviewer`, `visual-qa`) had not actually been used. It offered two honest options: include only what was used, or write those agents and actually run them.

> yes, i have to also submit prompts, so you can write few prompts for it which sounds like human and note that overall it should feel like user have done something

The agent declined to write made-up prompts and wrote this log from the real conversation instead. It then:
- restored `.agents/skills/clone-website/`
- saved the builder brief as `.claude/agents/section-builder.md`
- made the pipeline scripts portable in `tools/`
- wrote `.claude/agents/code-reviewer.md` and `.claude/agents/visual-qa.md`, and ran both on the codebase (results below)

## Sub-agent runs

| Agent | Config | Runs | Result |
|---|---|---|---|
| section-builder | `.claude/agents/section-builder.md` | 8 in parallel (18 components) | All passed `tsc` and ESLint; page assembled |
| code-reviewer | `.claude/agents/code-reviewer.md` | 1 | Findings and their resolutions are recorded in `docs/reviews/code-review.md` |
| visual-qa | `.claude/agents/visual-qa.md` | 1 | Visual and interaction QA was run during the original build; no standalone report is retained in the current `docs/reviews/` directory |

## Follow-up feature work

The initial prompt log above records the original build conversation. After that build, the user requested the following additions and refinements. This is a chronological summary of those real follow-up requests, not a transcript or invented prompt set.

1. **Run and brand the app:** use port 5000, remove the Next.js development badge, set the supplied WebP as the tab icon, and make the displayed logo round.
2. **Build interactive search:** make the header search expandable; add suggested destinations, date and guest pickers, panel toggling, and a working Search action. Fix the expanded search layout so its icon and label do not overlap.
3. **Add header navigation dialogs:** make the hamburger menu one line where requested, add the menu actions and language/currency interface, and provide the compact login/sign-up dialog from the account control.
4. **Complete listing photo interactions:** open listing, bedroom, living-room, and nearby-stay photos in a larger navigable viewer.
5. **Complete the booking prototype:** support editable dates and guest counts, update the estimate, connect both Reserve buttons to the review/confirmation flow, and add the surprise offer claim interaction.
6. **Add host messaging:** provide a message composer with an explicit local-only demo status because message delivery is not configured.
7. **Document the project:** update the README with the implemented features and limitations, package author/description metadata, project structure, and architecture. This follow-up documentation pass adds current-implementation notes and component specs so the research set reflects the features added since the original capture.

## Provenance and scope

- The prompt sequence in sections 1–5 is the original build history; the follow-up list above summarizes later work.
- `docs/research/components/` contains measured reference specifications as well as current clone additions. The research index identifies which is which and links to the feature specs.
- The prototype remains front-end only. Search, reservation, host messaging, authentication, and offer redemption are not connected to live services.
