# React Aria Menu focus repro

Minimal repro for three focus problems in a `react-aria-components` `Menu` opened from a `MenuTrigger`, with `react-aria-components@1.22.1`, `react-aria@3.53.1` and `react@19.3.1`.

Run with `npm install && npm run dev`. The page shows `document.activeElement` and every menu action live, so no devtools are needed.

1. **Tab does nothing in an open menu.** Focus "Menu 1", press Enter, then press Tab. Focus stays on item A and the menu stays open. Shift+Tab does the same.
2. **A menu reopened during its exit animation takes no focus.** Click "Menu 2", press Escape, and click "Menu 2" again within 300 ms. The menu is open but `document.activeElement` is `<body>`, and the arrow keys do nothing.
3. **Focus stays in the closing menu until the exit animation ends.** Focus "Menu 2", press Enter, press Escape and then press Enter within 300 ms. Focus is still on item A of the closing menu, so the Enter runs item A's action ("Actions: Menu 2: A") instead of reopening the menu.
