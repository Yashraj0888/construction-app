Clean, standard visual redesign of the Construction Worker Support site — single calm-blue accent (`#2563EB`) on neutral slate/white, removing the loud amber, dark hero gradient, wave divider, pulsing animations, and competing multi-color cards. No logic changes.

## Palette
- Accent `#2563EB` (hover `#1D4ED8`, soft `#EFF6FF`) for buttons, links, focus, active/selected states.
- Neutrals: headings `#0F172A`, body `#475569`/`#64748B`, borders `#E2E8F0`, surfaces white / `#F8FAFC`.
- Semantic green `#16A34A` retained only for: progress "completed" ✓, "Included", and "secure" lock cues.
- Removed: `#F59E0B`, `#D97706`, `#FFFBEB`, navy hero gradient, wave-divider SVG, `btn-pulse`.

## Files (13)
1. `app/globals.css` — swap amber vars→blue; `.form-input:focus`, `.radio-card`, `.card-option`, `.step-connector.active`, `.progress-fill`→blue; delete `btn-pulse` + unused `slideDown` keyframe.
2. `app/page.tsx` — stats icons + "Service Selected" badge→blue; flatten sidebar (Need Help navy box→bordered white card, blue call btn; processing-time pills→neutral); replace amber CTA banner with white section + blue button; standardize section padding `py-16 sm:py-20`.
3. `app/components/AnnouncementBar.tsx` — dark navy strip→`bg-slate-50` + bottom border; hovers→blue.
4. `app/components/Navbar.tsx` — amber CTA→blue; "Support" label→blue; remove amber logo hover; dropdown hover→slate-50.
5. `app/components/HeroSection.tsx` — remove dark gradient→white; heading→dark, "To Get On Site"→blue; amber pulse badge→static blue badge (no anim); unify all 3 service cards to identical neutral cards (slate icon chips, blue hover/price); delete wave-divider SVG.
6. `app/components/ProgressBar.tsx` — completed/active circles→blue (✓ vs number distinguishes them).
7. `app/components/Step1PersonalDetails.tsx` — info "i" circle→blue; Privacy link→blue.
8. `app/components/Step2ApplicationDetails.tsx` — radio `accent-`→blue. Keep CSCS card colour strips (informational).
9. `app/components/Step3Review.tsx` — dark navy section headers→light `bg-slate-50`; amber order-summary box→slate; Pay button→blue, drop `btn-pulse`; links→blue.
10. `app/components/CheckoutSkeleton.tsx` — spinner + progress bar→blue.
11. `app/components/Footer.tsx` — keep dark but flatten double-layer; amber logo box + social hovers→blue.

## Layout/alignment fixes
- Remove wave divider (awkward gap hero→stats).
- Consistent `max-w-7xl mx-auto px-4 sm:px-6` + uniform vertical rhythm.
- Unified hero cards (equal height, neutral) fix the uneven/competing look.

No state/validation/flow logic changes. Verify with `npm run build` at the end.