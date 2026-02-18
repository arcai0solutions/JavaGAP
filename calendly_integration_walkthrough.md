# Calendly Integration Verification Walkthrough

## Overview
We have integrated a Calendly popup modal into the AI Chat Widget's "Book a Meeting" button.

## Changes Made
1.  **Installed `react-calendly`**: Added the dependency to the project.
2.  **Updated `app/layout.tsx`**: Added `id="root"` to the `<body>` tag to provide a mounting point for the modal.
3.  **Modified `components/ai-chat-widget.tsx`**:
    -   Imported `PopupModal` from `react-calendly`.
    -   Added state to manage the modal's visibility (`isCalendarOpen`).
    -   Updated the calendar button to open the modal instead of navigating to a link.
    -   Set the modal to use the provided Calendly URL: `https://calendly.com/javagap-info/30min`.

## Verification Steps
1.  **Navigate to the Homepage**: Open the application in your browser.
2.  **Open the Chat Widget**: Look for the floating chat button in the bottom-right corner.
3.  **Click the "Book a Meeting" Button**: Find the calendar icon button above the main chat toggle button.
    -   Hover over it to see the "Book a Meeting" tooltip.
    -   Click the button.
4.  **Verify Popup**:
    -   Ensure a Calendly scheduling modal appears over the current page.
    -   Verify that you can interact with the Calendly interface (select a date/time).
    -   Close the modal and ensure it disappears correctly.

## Troubleshooting
-   **Modal doesn't appear?**: Ensure JavaScript is enabled and that no ad-blockers are preventing the Calendly script from loading.
-   **Z-Index Issues**: If the modal appears behind other elements, check the z-index of the chat widget compared to the modal overlay. The modal should typically be on top.
