# Data

- `build-log.json`: real status changes of every ticket on the Fredrin board for this project, from the Fredrin API. Times are UTC and shown as Tbilisi time on the page. Fredrin keeps no status history log, so each move is read from the ticket's own timestamps: created (backlog), first run started (running), PR opened (review), completed (done).
- `friction.json`: the friction log entries, written by hand.
- `field-report.json`: the ModelGrow before and after lanes. Keep `"status": "in_progress"` and `"after": null` until the run is done. When it is, set `"status": "done"` and fill `after` with the same shape as `before` and real numbers.

## Refresh the build log

From the repo root, inside a Fredrin ticket worktree:

    node src/data/refresh-build-log.mjs

It lists every ticket, reads each one with `./.fredrin/fredrin tickets get`, and rewrites `build-log.json`. Add a short title for a new ticket id in the `SHORT` map at the top of the script.
