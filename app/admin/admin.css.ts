/** Shared admin UI stylesheet injected via <style> */

export const ADMIN_CSS = `
  .admin-page {
    min-height: 100vh;
    background: #f4f6f8;
    font-family: Inter, system-ui, sans-serif;
    color: #0f172a;
  }
  .admin-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 16px 48px;
  }
  @media (min-width: 768px) {
    .admin-inner { padding: 40px 36px 80px; }
  }

  .admin-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-end;
    margin-bottom: 28px;
  }
  .admin-header h1 {
    margin: 6px 0 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 800;
    letter-spacing: -0.03em;
  }
  .admin-header p {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
  }
  .admin-header-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  .btn {
    min-height: 44px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: #fff;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #0f172a;
    text-decoration: none;
  }
  .btn:hover { background: #f8fafc; }
  .btn-primary {
    background: #0f172a;
    border-color: #0f172a;
    color: #fff;
  }
  .btn-primary:hover { background: #1e293b; }

  .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  @media (min-width: 720px) {
    .stats { grid-template-columns: repeat(4, 1fr); gap: 16px; }
  }
  .stat {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 24px 26px;
  }
  .stat span { display: block; font-size: 12px; color: #64748b; font-weight: 600; }
  .stat strong {
    display: block;
    margin-top: 8px;
    font-size: 28px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
  @media (min-width: 800px) {
    .toolbar {
      flex-direction: row;
      align-items: center;
    }
  }
  .search-box {
    position: relative;
    flex: 1;
  }
  .search-box svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
  .search-box input, .login-card input {
    width: 100%;
    min-height: 48px;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 14px;
    background: #fff;
    box-sizing: border-box;
  }
  .search-box input { padding-left: 42px; }

  /* Custom select */
  .admin-select {
    position: relative;
    min-width: 170px;
  }
  .admin-select.is-pill { min-width: 140px; }
  .admin-select-trigger {
    width: 100%;
    min-height: 48px;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 10px 14px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    text-align: left;
  }
  .admin-select.is-pill .admin-select-trigger {
    min-height: 40px;
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
  }
  .admin-select.is-open .admin-select-trigger {
    border-color: #0f766e;
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
  }
  .admin-select-caret {
    flex-shrink: 0;
    color: #64748b;
    transition: transform 0.15s ease;
  }
  .admin-select.is-open .admin-select-caret { transform: rotate(180deg); }
  .admin-select-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .admin-select-menu {
    position: absolute;
    z-index: 40;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    margin: 0;
    padding: 8px;
    list-style: none;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
    max-height: 280px;
    overflow: auto;
  }
  .admin-select.is-pill .admin-select-menu {
    min-width: 180px;
    right: auto;
  }
  .admin-select-option {
    width: 100%;
    border: none;
    background: transparent;
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    text-align: left;
  }
  .admin-select-option:hover { background: #f8fafc; }
  .admin-select-option.is-active { background: #f0fdfa; color: #0f766e; }

  .panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
  }

  .row {
    width: 100%;
    border: none;
    border-bottom: 1px solid #f1f5f9;
    background: #fff;
    padding: 24px 28px;
    text-align: left;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: inherit;
  }
  .row:hover { background: #f8fafc; }
  .row-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
  }
  .row-name { font-weight: 700; font-size: 15px; margin: 0 0 6px; }
  .row-line { margin: 0; font-size: 13px; color: #64748b; line-height: 1.45; }
  .row-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
  .pill {
    display: inline-flex;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
  }
  .row-chevron { color: #94a3b8; }

  .detail {
    padding: 28px 24px 36px;
  }
  @media (min-width: 768px) {
    .detail { padding: 36px 36px 40px; }
  }
  .detail-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e8f0;
  }
  .detail-head h1, .detail-head h2 {
    margin: 0 0 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(22px, 3vw, 28px);
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .detail-head p { margin: 0; color: #64748b; font-size: 14px; }

  .quick-contact {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }
  @media (min-width: 560px) {
    .quick-contact { grid-template-columns: 1fr 1fr; }
  }
  .quick-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    background: #f8fafc;
    text-decoration: none;
    color: inherit;
  }
  .quick-link:hover { background: #f0fdfa; border-color: #99f6e4; }
  .quick-link small {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .quick-link strong {
    display: block;
    font-size: 15px;
    font-weight: 700;
    word-break: break-word;
  }

  .section { margin-bottom: 28px; }
  .section h3 {
    margin: 0 0 14px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
  }
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
  }
  .info-item {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 20px 22px;
    border-bottom: 1px solid #f1f5f9;
    background: #fff;
  }
  @media (min-width: 560px) {
    .info-item {
      grid-template-columns: 200px 1fr auto;
      align-items: center;
      gap: 20px;
      padding: 20px 24px;
    }
  }
  .info-item:last-child { border-bottom: none; }
  .info-item:nth-child(even) { background: #fafbfc; }
  .info-label {
    font-size: 12px;
    font-weight: 700;
    color: #64748b;
  }
  .info-value {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    word-break: break-word;
  }
  .copy-btn {
    width: 34px;
    height: 34px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #475569;
    justify-self: start;
  }
  @media (min-width: 560px) {
    .copy-btn { justify-self: end; }
  }

  .detail-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 8px;
  }

  .empty {
    padding: 56px 32px;
    text-align: center;
    color: #64748b;
    font-size: 14px;
  }
  .error { color: #b91c1c; font-weight: 600; font-size: 13px; }

  .login-wrap {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #f4f6f8;
  }
  .login-card {
    width: 100%;
    max-width: 420px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 40px 32px;
  }
  .login-card h1 {
    margin: 8px 0 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 24px;
    font-weight: 800;
  }
  .login-card .btn { width: 100%; justify-content: center; margin-top: 12px; }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    color: #475569;
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
  }
  .back-link:hover { color: #0f172a; }
`;
