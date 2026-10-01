This is a proposal for changing how the Integrations team deals with incoming requests. It is a starting point, not a decision.

The numbers below are guesses. If something turns out wrong we fix it at the next retrospective.

Right now requests belong to everybody. Each morning we go through the board after the stand-up, update the items in progress and then look for volunteers for the new ones. Debugging sessions regularly start right there and eat the rest of the meeting.

Last quarter we measured roughly 40 hours per sprint spent on requests, about half a person. The hidden cost is probably larger: people get interrupted all day, planned work slips, and what we learn while fixing things is rarely written down.

What I suggest:

1. Everybody takes turns, aligned with sprints. Two people are on duty each sprint to begin with; we revisit that number at planning depending on how many requests are open.
2. For that sprint, the people on duty put requesters first and planned work second.
3. They come to the stand-up as usual but skip sprint planning and refinement, and no story points are assigned to them.
4. A request that needs more than two days of work is converted into a backlog item and estimated with the rest.
5. On the last day the pair leaves a hand-over note for the next pair: what is still open, causes that keep coming back, and documentation that was missing.

Escalation: when the pair has spent half a day without reproducing an issue, they can ask the owner of the component, who replies before the end of the working day.

After three sprints we check how long requests wait and whether the rest of the team delivers more.
