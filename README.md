# Name
Auto-Assigner

# Short Description
Assigns ticket to viewing user if ticket and user have same group.

# Long Description
Zendesk's Guided Mode is a fantastic means of delivering work to agents. But if your agents do a lot of work *outside* of Zendesk, the tickets they're viewing will be sent to another agent automatically.
For companies and teams with sophisticated workflows this can lead to tickets being sent to multiple agents at a time.

This app solves that problem by assigning the ticket directly to the agent on view. No more duplication of effort!
Simply set which Ticket Groups should be auto-assigned and the app will do the rest. As soon as an agent in that group views a ticket from that group, it will assign to them.
If you like this app, but it is missing a feature critical to your workflow: [Let us know!](https://support.3sigmatechnologies.com/hc/en-us/requests/new?ticket_form_id=13806449792525)


# Installation Instructions
**Note**: You need administrator permissions in Zendesk to set up the app.
 * Click the Install button above on this page.
 * Set up the app configuration according to your needs (see below for configurable parameters).
 * That's it! You're ready to start saving clicks.

## Parameters

<!-- groups -->
* **Auto-Assign Groups**: Comma-separated list of group names and/or ids that will auto-assign a ticket when viewed by an agent.
<!-- runonall -->
* **Auto-Assign all groups**: If true, the app will run on all tickets. Use the below role/group restrictions to control which users are effected. (This setting will prevent 'Match all user groups' from working properly and will ignore the setting above.)
<!-- matchall -->
* **Match all user groups**: If true, tickets will only auto-assign if all of the user's groups are in Auto-Assign Groups above. (Useful to avoid assigning tickets to non-agent users such as QA or Training.)
<!-- exactmatch -->
* **Match user groups exactly**: If true, tickets will only auto-assign if the ticket group matches the user's one and only group. (This is helpful if you're installing the app for one user group.)
<!-- tagstoadd -->
* **Tags**: Set this to a non-blank value to apply tags to each ticket when auto-assigned. Enter multiple tags as comma separated list.

---------------------------------------

# Screenshot(s):
[put your screenshots down here.]


# Notes about Icon Assets
Icon Nav Bar and Icon Ticket Editor are both Logo.svg
Icon Top Bar is Logo-Alternate.svg