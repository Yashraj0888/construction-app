/** Shared admin UI — ops desk style, not generic AI cards */

export const ADMIN_CSS = `
  .admin-shell {
    --ink: #15181e;
    --muted: #5c6573;
    --line: #9aa3b2;
    --paper: #f7f6f3;
    --surface: #ffffff;
    --accent: #c45c26;
    --accent-soft: #f3e6dc;
    font-family: var(--admin-font, 'IBM Plex Sans'), 'Segoe UI', system-ui, sans-serif;
    color: var(--ink);
    min-height: 100%;
  }

  .admin-page {
    min-height: calc(100vh - 64px);
    background: var(--paper);
    color: var(--ink);
  }

  .admin-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--surface);
    border-bottom: 1px solid var(--line);
  }
  .admin-nav-inner {
    width: 100%;
    margin: 0;
    padding: 0 18px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  @media (min-width: 768px) {
    .admin-nav-inner { padding: 0 28px; }
  }
  .admin-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--ink);
    margin-right: auto;
  }
  .admin-brand:hover { color: var(--ink); }
  .admin-brand-mark {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    color: var(--ink);
  }
  .admin-brand-name {
    font-size: 14px;
    font-weight: 650;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  @media (min-width: 480px) {
    .admin-brand-name { font-size: 15px; }
  }
  .admin-nav-logout {
    min-height: 40px;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid var(--line);
    background: var(--surface);
    font-weight: 600;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--ink);
    flex-shrink: 0;
    margin-left: auto;
  }
  .admin-nav-logout:hover { background: #efeee9; }
  .admin-inner {
    max-width: 1120px;
    margin: 0 auto;
    padding: 28px 18px 64px;
  }
  @media (min-width: 768px) {
    .admin-inner { padding: 40px 40px 80px; }
  }

  .admin-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 18px;
    align-items: flex-end;
    margin-bottom: 32px;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--line);
  }
  .admin-header h1 {
    margin: 4px 0 0;
    font-size: clamp(28px, 4vw, 36px);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }
  .admin-header p {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
  }
  .admin-header-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  .btn {
    min-height: 40px;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid var(--line);
    background: var(--surface);
    font-weight: 600;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--ink);
    text-decoration: none;
  }
  .btn:hover { background: #efeee9; }
  .btn-primary {
    background: var(--ink);
    border-color: var(--ink);
    color: #fff;
  }
  .btn-primary:hover { background: #2a303a; }
  .btn-danger {
    background: #9b2c1f;
    border-color: #9b2c1f;
    color: #fff;
  }
  .btn-danger:hover { background: #7f2419; }
  .btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .admin-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgba(21, 24, 30, 0.48);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .admin-modal {
    width: min(100%, 420px);
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 22px 20px 18px;
    box-shadow: 0 18px 40px rgba(21, 24, 30, 0.18);
  }
  .admin-modal h3 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .admin-modal p {
    margin: 0 0 18px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--muted);
  }
  .admin-modal-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* Pipeline filters — single segmented strip, not card grid */
  .tile-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin-bottom: 28px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--surface);
    overflow: hidden;
  }
  .tile {
    appearance: none;
    border: none;
    border-right: 1px solid var(--line);
    background: transparent;
    border-radius: 0;
    padding: 16px 18px;
    text-align: left;
    cursor: pointer;
    flex: 1 1 140px;
    min-width: 132px;
    min-height: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: background 0.12s ease, color 0.12s ease;
    font-family: inherit;
    position: relative;
  }
  .tile:last-child { border-right: none; }
  .tile:hover { background: #f0efeb; }
  .tile.is-active {
    background: var(--ink);
    color: #fff;
  }
  .tile.is-active .tile-label,
  .tile.is-active .tile-count,
  .tile.is-active .tile-hint { color: #fff; }
  .tile.is-active .tile-badge {
    background: rgba(255,255,255,0.14);
    color: #f3e6dc;
  }

  /* Sale — always green (idle + active); rows clearly light green */
  .tile.tile-sale {
    background: #c5e0cc;
  }
  .tile.tile-sale .tile-label { color: #1e4d2b; }
  .tile.tile-sale .tile-count { color: #163d22; }
  .tile.tile-sale .tile-hint { color: #3a6348; }
  .tile.tile-sale .tile-badge {
    border-color: #8fbf9c;
    color: #1e4d2b;
    background: rgba(255,255,255,0.4);
  }
  .tile.tile-sale:hover { background: #b6d7bf; }
  .tile.tile-sale.is-active {
    background: #2f6b42;
    color: #fff;
  }
  .tile.tile-sale.is-active .tile-label,
  .tile.tile-sale.is-active .tile-count,
  .tile.tile-sale.is-active .tile-hint { color: #fff; }
  .tile.tile-sale.is-active .tile-badge {
    background: rgba(255,255,255,0.18);
    border-color: transparent;
    color: #e6f5ea;
  }

  .row.row-sale {
    background: #d4edd9;
    border-bottom-color: #a8d4b4;
  }
  .row.row-sale:hover { background: #c4e4cc; }
  .row.row-sale .row-name { color: #14351e; }
  .row.row-sale .row-line { color: #3a6348; }
  .row.row-sale .pill {
    background: #a8d4b4 !important;
    color: #14351e !important;
    border-color: #7fbf90;
  }
  .tile.is-soon .tile-count { opacity: 0.55; }
  .tile-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .tile-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.01em;
  }
  .tile-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 3px;
    padding: 2px 6px;
    white-space: nowrap;
  }
  .tile-count {
    font-family: var(--admin-mono, 'IBM Plex Mono'), ui-monospace, monospace;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
    color: var(--ink);
  }
  .tile-hint {
    margin: 0;
    font-size: 11px;
    font-weight: 450;
    color: var(--muted);
    line-height: 1.3;
  }
  @media (max-width: 719px) {
    .tile-grid { display: grid; grid-template-columns: 1fr 1fr; }
    .tile { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .tile:nth-child(2n) { border-right: none; }
    .tile:nth-last-child(-n+2) { border-bottom: none; }
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  @media (min-width: 800px) {
    .toolbar { flex-direction: row; align-items: center; }
  }
  .search-box { position: relative; flex: 1; }
  .search-box svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8a93a1;
  }
  .search-box input, .login-card input {
    width: 100%;
    min-height: 42px;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    font-family: inherit;
    background: var(--surface);
    box-sizing: border-box;
    color: var(--ink);
  }
  .search-box input { padding-left: 38px; }
  .search-box input:focus, .login-card input:focus {
    outline: none;
    border-color: #9aa3b2;
  }

  .list-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 10px;
  }
  .list-head h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 650;
    letter-spacing: 0;
  }
  .list-head span {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    font-family: var(--admin-mono, 'IBM Plex Mono'), ui-monospace, monospace;
  }

  /* Custom select */
  .admin-select { position: relative; min-width: 168px; }
  .admin-select.is-pill { min-width: 150px; }
  .admin-select-trigger {
    width: 100%;
    min-height: 42px;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 8px 12px;
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    color: var(--ink);
    text-align: left;
  }
  .admin-select.is-pill .admin-select-trigger {
    min-height: 36px;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 12px;
  }
  .admin-select.is-open .admin-select-trigger {
    border-color: #9aa3b2;
  }
  .admin-select-caret { flex-shrink: 0; color: var(--muted); transition: transform 0.15s ease; }
  .admin-select.is-open .admin-select-caret { transform: rotate(180deg); }
  .admin-select-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .admin-select-menu {
    position: absolute;
    z-index: 40;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    margin: 0;
    padding: 4px;
    list-style: none;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 8px;
    box-shadow: 0 12px 28px rgba(21, 24, 30, 0.12);
    max-height: 280px;
    overflow: auto;
  }
  .admin-select.is-pill .admin-select-menu { min-width: 200px; right: auto; }
  .admin-select-option {
    width: 100%;
    border: none;
    background: transparent;
    border-radius: 5px;
    padding: 9px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 550;
    font-family: inherit;
    color: var(--ink);
    text-align: left;
  }
  .admin-select-option:hover { background: #f0efeb; }
  .admin-select-option.is-active { background: var(--accent-soft); color: #8a3d14; }

  .panel {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 8px;
    overflow: hidden;
  }

  .row {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--line);
    background: var(--surface);
    padding: 18px 20px;
    text-align: left;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: inherit;
  }
  @media (min-width: 768px) {
    .row { padding: 18px 22px; }
  }
  .row:last-child { border-bottom: none; }
  .row:hover { background: #f3f2ee; }
  .row-top {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: center;
  }
  .row-name {
    font-weight: 650;
    font-size: 15px;
    margin: 0 0 4px;
    letter-spacing: -0.015em;
  }
  .row-line { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.4; }
  .row-meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .pill {
    display: inline-flex;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  .row-chevron { color: #a0a8b5; }

  .detail {
    padding: 28px 22px 34px;
  }
  @media (min-width: 768px) {
    .detail { padding: 32px 32px 40px; }
  }
  .detail-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 22px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line);
  }
  .detail-head h1, .detail-head h2 {
    margin: 0 0 6px;
    font-size: clamp(22px, 3vw, 28px);
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  .detail-head p { margin: 0; color: var(--muted); font-size: 14px; }

  .quick-contact {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 26px;
  }
  @media (min-width: 560px) {
    .quick-contact { grid-template-columns: 1fr 1fr; }
  }
  .quick-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #f3f2ee;
    text-decoration: none;
    color: inherit;
  }
  .quick-link:hover { background: var(--accent-soft); border-color: #e0c4b0; }
  .quick-link small {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 2px;
  }
  .quick-link strong {
    display: block;
    font-size: 14px;
    font-weight: 650;
    word-break: break-word;
  }

  .section { margin-bottom: 26px; }
  .section h3 {
    margin: 0 0 10px;
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .info-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--line);
    border-radius: 6px;
    overflow: hidden;
  }
  .info-item {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--line);
    background: var(--surface);
  }
  @media (min-width: 560px) {
    .info-item {
      grid-template-columns: 180px 1fr auto;
      align-items: center;
      gap: 16px;
      padding: 14px 18px;
    }
  }
  .info-item:last-child { border-bottom: none; }
  .info-item:nth-child(even) { background: #faf9f6; }
  .info-label {
    font-size: 12px;
    font-weight: 550;
    color: var(--muted);
  }
  .info-value {
    font-size: 14px;
    font-weight: 550;
    color: var(--ink);
    word-break: break-word;
  }
  .copy-btn {
    width: 32px;
    height: 32px;
    border: 1px solid var(--line);
    border-radius: 5px;
    background: var(--surface);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--muted);
    justify-self: start;
  }
  @media (min-width: 560px) {
    .copy-btn { justify-self: end; }
  }

  .detail-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }

  .empty {
    padding: 48px 28px;
    text-align: center;
    color: var(--muted);
    font-size: 14px;
  }
  .error { color: #b42318; font-weight: 600; font-size: 13px; }

  .login-wrap {
    min-height: calc(100vh - 64px);
    display: grid;
    place-items: center;
    padding: 24px;
    background: var(--paper);
  }
  .login-card {
    width: 100%;
    max-width: 400px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 32px 28px;
  }
  .login-card h1 {
    margin: 6px 0 8px;
    font-size: 24px;
    font-weight: 700;
  }
  .login-card .btn { width: 100%; justify-content: center; margin-top: 12px; }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    color: var(--muted);
    text-decoration: none;
    font-weight: 600;
    font-size: 13px;
  }
  .back-link:hover { color: var(--ink); }

  /* Detail split: contact left / notes right */
  .detail-split {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: start;
  }
  @media (min-width: 960px) {
    .detail-split {
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
      gap: 20px;
    }
  }
  .detail-col {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 22px 20px 24px;
  }
  @media (min-width: 768px) {
    .detail-col { padding: 26px 24px 28px; }
  }
  .detail-col-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }
  .detail-col-head h2 {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  .detail-col-head p {
    margin: 0;
    font-size: 13px;
    color: var(--muted);
  }
  .contact-primary {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--line);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 14px;
  }
  .contact-primary .info-item { padding: 14px 16px; }
  .load-more-btn {
    width: 100%;
    min-height: 40px;
    border: 1px dashed var(--line);
    border-radius: 6px;
    background: #f3f2ee;
    font-family: inherit;
    font-weight: 600;
    font-size: 13px;
    color: var(--ink);
    cursor: pointer;
    margin-bottom: 14px;
  }
  .load-more-btn:hover { background: #efeee9; }

  .detail-col--notes {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .notes-list-scroll {
    overflow: auto;
    min-height: 0;
    margin-bottom: 4px;
    padding-right: 2px;
  }
  .notes-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
  }
  .note-card {
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #faf9f6;
    padding: 10px 12px;
  }
  .note-card.is-editing {
    background: #fff;
    border-color: #d2cfc6;
  }
  .note-card-meta {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
    margin-bottom: 6px;
  }
  .note-card-meta time {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    font-family: var(--admin-mono, ui-monospace), monospace;
  }
  .note-card-actions {
    display: flex;
    gap: 2px;
    align-items: center;
  }
  .note-icon-btn {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 5px;
    background: transparent;
    color: var(--muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .note-icon-btn:hover {
    background: #ebe9e3;
    color: var(--ink);
  }
  .note-icon-btn--danger:hover {
    background: #f5e6e4;
    color: #9b2c1f;
  }
  .note-icon-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .note-card-toggle {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    text-align: left;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }
  .note-card-preview {
    font-size: 14px;
    line-height: 1.45;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .note-expand-hint {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    opacity: 0;
    transition: opacity 0.12s ease;
  }
  .note-card-toggle:hover .note-expand-hint,
  .note-card-toggle:focus-visible .note-expand-hint {
    opacity: 1;
  }
  .note-card-body {
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink);
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .note-card-body p { margin: 0 0 0.55em; }
  .note-card-body p:last-child { margin-bottom: 0; }
  .note-card-body ul, .note-card-body ol { margin: 0.4em 0; padding-left: 1.25em; }
  .note-card-body a { color: #8a3d14; }
  .note-edit { margin-top: 4px; }
  .note-edit-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
  .note-composer {
    flex-shrink: 0;
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
  }
  .note-composer-label {
    margin: 10px 0 8px;
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .note-composer-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .notes-empty {
    padding: 16px;
    border: 1px dashed var(--line);
    border-radius: 6px;
    color: var(--muted);
    font-size: 13px;
    text-align: center;
  }

  /* TipTap notes editor */
  .nte-shell {
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #fff;
    overflow: hidden;
  }
  .nte-loading {
    padding: 24px;
    color: var(--muted);
    font-size: 13px;
  }
  .nte-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 8px;
    border-bottom: 1px solid var(--line);
    background: #f3f2ee;
  }
  .nte-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 5px;
    background: transparent;
    color: var(--ink);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .nte-btn:hover { background: #e6e4de; }
  .nte-btn.is-active {
    background: var(--accent-soft);
    color: #8a3d14;
  }
  .nte-sep {
    width: 1px;
    align-self: stretch;
    background: var(--line);
    margin: 4px 4px;
  }
  .nte-shell .ProseMirror {
    min-height: 180px;
    max-height: 320px;
    overflow: auto;
    padding: 14px 16px;
    outline: none;
    font-size: 14px;
    line-height: 1.55;
  }
  .nte-shell--compact .ProseMirror {
    min-height: 96px;
    max-height: 180px;
  }
  .nte-shell .ProseMirror p { margin: 0 0 0.65em; }
  .nte-shell .ProseMirror p:last-child { margin-bottom: 0; }
  .nte-shell .ProseMirror h2 {
    font-size: 1.15rem;
    margin: 0.4em 0 0.35em;
    font-weight: 700;
  }
  .nte-shell .ProseMirror h3 {
    font-size: 1.02rem;
    margin: 0.35em 0 0.3em;
    font-weight: 650;
  }
  .nte-shell .ProseMirror ul,
  .nte-shell .ProseMirror ol { padding-left: 1.3em; margin: 0.4em 0; }
  .nte-shell .ProseMirror blockquote {
    border-left: 3px solid var(--line);
    margin: 0.5em 0;
    padding-left: 0.85em;
    color: var(--muted);
  }
  .nte-shell .ProseMirror a { color: #8a3d14; text-decoration: underline; }
  .nte-shell .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #9aa3b2;
    pointer-events: none;
    height: 0;
  }
`;
