import * as i18n from "./i18n.js";

export function registerApp() {
    let client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '60px' });

    client.on('app.registered', r => appRegistered('app.registered', client, r));
};

function appRegistered(evt, client, context) {
    if (context['context'] != undefined) {
        context = context['context'];
    }
    client.get("currentUser.locale").then((data) => {
        return i18n.processUserLocale(data["currentUser.locale"]);
    }).then((locale) => {
        autoAssignTicket(locale, client, context);
    });
}

function autoAssignTicket(locale, client, context) {
    try {
        if (context.location != 'ticket_sidebar') {
            console.error(i18n.getTranslation(locale, "load_location_error") + context.location);
            return;
        }
        let appInstance = client.instance(context.instanceGuid);

        Promise.all([
            client.metadata(),
            appInstance.get('ticket'),
            client.get('currentUser')
        ]).then((responses) => {
            let notAssignedReason = checkAssignment(
                locale,
                appInstance,
                responses[1]['ticket'],
                responses[2]['currentUser'],
                responses[0].settings
            );
            if (notAssignedReason) {
                notAssignedReason = i18n.getTranslation(locale, "ticket_not_assigned") + notAssignedReason;
                displayToUser(notAssignedReason);
            }
        });

    } catch (e) {
        // eat
    }
};

function displayToUser(textToDisplay) {
    document.getElementById('context').innerHTML = textToDisplay;
}

function checkAssignment(locale, client, ticket, user, settings) {

    let ticketStatus = ticket['status'];
    if (ticketStatus != 'new' && ticketStatus != 'open') {
        return i18n.getTranslation(locale, "non_agent_status");
    }

    let ticketUser = ticket['assignee']['user'];
    if (ticketUser !== null) {
        return i18n.getTranslation(locale, "ticket_already_assigned");
    }

    let aaGroups = settings['groups'].split(',').map(function (value) {
        return value.trim();
    });

    let ticketGroup = ticket['assignee']['group']['name'];
    let ticketGroupId = ticket['assignee']['group']['id'].toString();
    if (!aaGroups.includes(ticketGroup) && !aaGroups.includes(ticketGroupId)) {
        if (!settings["runonall"]) {
            return i18n.getTranslation(locale, "non_aa_ticket_group");
        }
    }

    let ticketInUserGroups = false;
    for (let i = 0; i < user['groups'].length; i++) {
        let userGroupId = user['groups'][i]['id'].toString();
        if (ticketGroupId == userGroupId) {
            ticketInUserGroups = true;
            break;
        }
    }
    if (!ticketInUserGroups) {
        return i18n.getTranslation(locale, "group_does_not_match");

    }

    let userAAGroupCount = 0;
    for (let i = 0; i < user['groups'].length; i++) {
        let userGroup = user['groups'][i]['name'];
        let userGroupId = user['groups'][i]['id'].toString();
        if ((aaGroups.includes(userGroup) || aaGroups.includes(userGroupId)) && userGroupId == ticketGroupId) {
            userAAGroupCount++;
        }
    }

    if (userAAGroupCount == 0) {
        if (!settings["runonall"]) {
            return i18n.getTranslation(locale, "non_aa_user_groups");
        }
    }

    if (!settings["runonall"]) {
        if (settings["matchall"] && userAAGroupCount < user['groups'].length) {
            return i18n.getTranslation(locale, "non_aa_user_groups_exact");
        }
    }

    if (settings["exactmatch"] && user['groups'].length > 1) {
        return i18n.getTranslation(locale, "too_many_user_groups");
    }

    let updateTicket = {
        "id": ticket['id'],
        "assignee_id": user['id']
    }
    if (settings["tagstoadd"]) {
        updateTicket["additional_tags"] = settings["tagstoadd"].split(',').map(function (value) {
            return value.trim();
        });
    }
    client.request({
        url: '/api/v2/tickets/update_many.json?ids=' + ticket['id'],
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            "tickets": [updateTicket]
        })
    }).then(function (data) {
        displayToUser(i18n.getTranslation(locale, "ticket_successfully_assigned"));
        client.invoke("notify", i18n.getTranslation(locale, "ticket_assigned_notification"));
    }).catch(function (error) {
        displayToUser(i18n.getTranslation(locale, "ticket_unsuccessfully_assigned"));
    });

}

