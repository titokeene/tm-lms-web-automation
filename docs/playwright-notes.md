# Playwright Notes & Gotchas

## Why some clicks use `{ force: true }`
In some cases (e.g., sidebar navigation like **Courses**), Playwright’s normal `.click()` 
fails because it considers the element not fully "interactable." This can happen due to:

- A transparent overlay or animation briefly covering the element
- The element being partially hidden or offscreen
- Another DOM element overlapping its clickable center

In these cases, `.click({ force: true })` bypasses Playwright’s checks and fires 
the click directly.  

⚠️ Important:
- This should be used sparingly. Always try `toBeVisible()`, `scrollIntoViewIfNeeded()`, 
or waiting for overlays to disappear before falling back to `{ force: true }`.
- If a `force` click is consistently needed, it may indicate a frontend/UI issue 
(e.g., lingering animations or incorrect z-index layering).
