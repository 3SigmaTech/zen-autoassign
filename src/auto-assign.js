
export function registerApp() {
    var client = ZAFClient.init();
    //client.invoke('resize', { width: '100%', height: '0px' });

    //client.on('instance.created', r => caller('instance.created', client, r));
    //client.on('instance.registered', r => caller('instance.registered', client, r));
    //client.on('app.activated', r => caller('app.activated', client, r));
    client.on('app.registered', r => appRegistered('app.registered', client, r));

};


function appRegistered(evt, client, context) {
    if (context['context'] != undefined) {
        context = context['context'];
    }
    autoAssignTicket(client, context);
}

function autoAssignTicket(client, context) {
    try {
        if (context.location != 'ticket_sidebar') {
            console.error('Autoassign App loaded from bad location - ' + context.location);
            return;
        }
        var appInstance = client.instance(context.instanceGuid);

        client.metadata().then(function (metadata) {
            appInstance.get('ticket').then(function (ticketDetails) {
                client.get('currentUser').then(function (currentUser) {

                    var notAssignedReason = checkAssignment(
                        appInstance,
                        ticketDetails['ticket'],
                        currentUser['currentUser'],
                        metadata.settings
                    );
                    console.log(notAssignedReason);
                    document.getElementById('context').innerHTML = notAssignedReason;
                });
            });
        });

    } catch (e) {
        // eat
    }
};

function checkAssignment(client, ticket, user, settings) {

    var ticketStatus = ticket['status'];
    if (ticketStatus != 'new' && ticketStatus != 'open') {
        return "The ticket is not in an agent-active status.";
    }

    var ticketUser = ticket['assignee']['user'];
    if (ticketUser !== null) {
        return "The ticket is already assigned; we are not updating the assignee";
    }


    var aaGroups = settings['groups'].split(',').map(function (value) {
        return value.trim();
    });

    var ticketGroup = ticket['assignee']['group']['name'];
    var ticketGroupId = ticket['assignee']['group']['id'].toString();
    if (!aaGroups.includes(ticketGroup) && !aaGroups.includes(ticketGroupId)) {
        return "The ticket does not belong to an auto-assigned group.";
    }

    var userHasAAGroup = false;
    for (var i = 0; i < user['groups'].length; i++) {
        var userGroup = user['groups'][i]['name'];
        var userGroupId = user['groups'][i]['id'].toString();
        if ((aaGroups.includes(userGroup) || aaGroups.includes(userGroupId)) && userGroupId == ticketGroupId) {
            userHasAAGroup = true;
            break;
        }
    }

    if (!userHasAAGroup) {
        return "The ticket and user group don't match or are not AA groups";
    }

    /*
    client.request({
        url: '/api/v2/tickets/' + ticket['id'],
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            "ticket": {
                "assignee_id": user['id']
            }
        })
    })
    */

    client.request({
        url: '/api/v2/tickets/update_many.json?ids=' + ticket['id'],
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            "tickets": [{
                "id": ticket['id'],
                "assignee_id": user['id'],
                "additional_tags": ['aa_assigned']
            }]
        })
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.log(error);
    });
}

