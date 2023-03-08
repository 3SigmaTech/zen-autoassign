export const translations = {"de":{"default":{"report_bugs":"Probleme melden","load_location_error":"Autoassign-App von falschem Standort geladen -","non_agent_status":"Das Ticket befindet sich nicht im Agent-Aktiv-Status.","ticket_already_assigned":"Das Ticket ist bereits vergeben; Wir aktualisieren den Bevollmächtigten nicht.","non_aa_ticket_group":"Das Ticket gehört keiner automatisch zugewiesenen Gruppe an.","group_does_not_match":"Die Ticketgruppe befindet sich nicht in der/den Gruppe(n) des Benutzers.","non_aa_user_groups":"Der Benutzer gehört keiner automatisch zugewiesenen Gruppe an.","non_aa_user_groups_exact":"Der Benutzer gehört mindestens einer Gruppe an, die nicht automatisch zugewiesen wird.","ticket_unsuccessfully_assigned":"Beim Versuch, das Ticket automatisch zuzuweisen, ist ein Fehler aufgetreten.","ticket_successfully_assigned":"Das Ticket wurde erfolgreich automatisch zugewiesen.","ticket_assigned_notification":"Das Ticket wurde automatisch zugewiesen.","ticket_not_assigned":"Ticket nicht automatisch zugewiesen:","too_many_user_groups":"Der Benutzer gehört mehr als einer Benutzergruppe an."}},"en":{"app":{"parameters":{"groups":{"label":"Auto-Assign Groups","helpText":"Comma-separated list of group names and/or ids that will auto-assign a ticket when viewed by an agent."},"runonall":{"label":"Run auto-assign for all groups","helpText":"If true, the app will run on all tickets. Use the below role/group restrictions to control which users are effected. (This setting will prevent 'Match all user groups' from working properly and will ignore the setting above.)"},"matchall":{"label":"Match all user groups","helpText":"If true, tickets will only auto-assign if all of the user's groups are in Auto-Assign Groups above. (Useful to avoid assigning tickets to non-agent users such as QA or Training.)"},"exactmatch":{"label":"Match user groups exactly","helpText":"If true, tickets will only auto-assign if the ticket group matches the user's one and only group. (This is helpful if you're installing the app for one user group.)"},"tagstoadd":{"label":"Tags applied to auto-assigned tickets","helpText":"Set this to a non-blank value to apply tags to each ticket when auto-assigned. Enter multiple tags as comma separated list."}},"name":"Auto-Assigner","short_description":"Assigns ticket to viewing user if ticket and user have same group.","long_description":"Zendesk's Guided Mode is a fantastic means of delivering work to agents. But if your agents do a lot of work *outside* of Zendesk, the tickets they're viewing will be sent to another agent automatically.\nFor companies and teams with sophisticated workflows this can lead to tickets being sent to multiple agents at a time.\n\nThis app solves that problem by assigning the ticket directly to the agent on view. No more duplication of effort!\nSimply set which Ticket Groups should be auto-assigned and the app will do the rest. As soon as an agent in that group views a ticket from that group, it will assign to them.\nIf you like this app, but it is missing a feature critical to your workflow: [Let us know!](https://support.3sigmatechnologies.com/hc/en-us/requests/new?ticket_form_id=13806449792525)","installation_instructions":"**Note**: You need administrator permissions in Zendesk to set up the app.\n * Click the Install button above on this page. \n * Set up the app configuration according to your needs. \n * That's it! You're ready to start saving clicks.\n        \n\n---------------------------------------"},"default":{"report_bugs":"Report Issues","load_location_error":"Autoassign App loaded from bad location - ","ticket_not_assigned":"Ticket not auto-assigned: ","non_agent_status":"The ticket is not in an agent-active status.","ticket_already_assigned":"The ticket is already assigned; we are not updating the assignee.","non_aa_ticket_group":"The ticket does not belong to an auto-assigned group.","group_does_not_match":"The ticket group is not in the user's group(s).","non_aa_user_groups":"The user does not belong to any auto-assigned groups.","non_aa_user_groups_exact":"The user belongs to at least one group that is not auto-assigned.","too_many_user_groups":"The user belongs to more than one user group.","ticket_unsuccessfully_assigned":"There was an erorr when attempting to auto-assign the ticket.","ticket_successfully_assigned":"The ticket was successfully auto-assigned.","ticket_assigned_notification":"The ticket has been auto-assigned."}},"fr":{"default":{"report_bugs":"Signaler des problèmes","load_location_error":"Attribuer automatiquement l'application chargée à partir d'un mauvais emplacement -","non_agent_status":"Le ticket n'est pas dans un statut d'agent actif.","ticket_already_assigned":"Le ticket est déjà attribué ; nous ne mettons pas à jour le cessionnaire.","non_aa_ticket_group":"Le ticket n'appartient pas à un groupe attribué automatiquement.","group_does_not_match":"Le groupe de tickets n'appartient pas au(x) groupe(s) de l'utilisateur.","non_aa_user_groups":"L'utilisateur n'appartient à aucun groupe attribué automatiquement.","non_aa_user_groups_exact":"L'utilisateur appartient à au moins un groupe qui n'est pas attribué automatiquement.","ticket_unsuccessfully_assigned":"Une erreur s'est produite lors de la tentative d'attribution automatique du ticket.","ticket_successfully_assigned":"Le ticket a été attribué automatiquement avec succès.","ticket_assigned_notification":"Le ticket a été attribué automatiquement.","ticket_not_assigned":"Ticket non attribué automatiquement :","too_many_user_groups":"L'utilisateur appartient à plusieurs groupes d'utilisateurs."}},"hi":{"default":{"report_bugs":"मुद्दों की रिपोर्ट करें","load_location_error":"ऑटोअसाइन ऐप खराब स्थान से लोड किया गया -","non_agent_status":"टिकट एजेंट-सक्रिय स्थिति में नहीं है।","ticket_already_assigned":"टिकट पहले ही असाइन किया जा चुका है; हम असाइनी को अपडेट नहीं कर रहे हैं।","non_aa_ticket_group":"टिकट किसी स्वत: असाइन किए गए समूह से संबंधित नहीं है।","group_does_not_match":"टिकट समूह उपयोगकर्ता के समूह(समूहों) में नहीं है।","non_aa_user_groups":"उपयोगकर्ता किसी भी ऑटो-असाइन किए गए समूह से संबंधित नहीं है।","non_aa_user_groups_exact":"उपयोगकर्ता कम से कम एक समूह से संबंधित है जो स्वत: असाइन नहीं किया गया है।","ticket_unsuccessfully_assigned":"टिकट अपने आप असाइन करने का प्रयास करते समय एक गड़बड़ी हुई थी.","ticket_successfully_assigned":"टिकट सफलतापूर्वक ऑटो-असाइन किया गया था।","ticket_assigned_notification":"टिकट स्वतः असाइन किया गया है।","ticket_not_assigned":"टिकट स्वतः असाइन नहीं किया गया:","too_many_user_groups":"उपयोगकर्ता एक से अधिक उपयोगकर्ता समूह से संबंधित है।"}},"it":{"default":{"report_bugs":"Segnala problemi","load_location_error":"Assegna automaticamente l'app caricata da una posizione errata -","non_agent_status":"Il ticket non è in uno stato agente attivo.","ticket_already_assigned":"Il biglietto è già assegnato; non stiamo aggiornando l'assegnatario.","non_aa_ticket_group":"Il ticket non appartiene a un gruppo assegnato automaticamente.","group_does_not_match":"Il gruppo di ticket non è nel gruppo o nei gruppi dell'utente.","non_aa_user_groups":"L'utente non appartiene a nessun gruppo assegnato automaticamente.","non_aa_user_groups_exact":"L'utente appartiene ad almeno un gruppo non assegnato automaticamente.","ticket_unsuccessfully_assigned":"Si è verificato un errore durante il tentativo di assegnare automaticamente il ticket.","ticket_successfully_assigned":"Il ticket è stato assegnato automaticamente con successo.","ticket_assigned_notification":"Il ticket è stato assegnato automaticamente.","ticket_not_assigned":"Ticket non assegnato automaticamente:","too_many_user_groups":"L'utente appartiene a più di un gruppo di utenti."}},"pt":{"default":{"report_bugs":"Relatar problemas","load_location_error":"Aplicativo de atribuição automática carregado de localização incorreta -","non_agent_status":"O ticket não está em um status de agente ativo.","ticket_already_assigned":"O ticket já está atribuído; não estamos atualizando o cessionário.","non_aa_ticket_group":"O ticket não pertence a um grupo atribuído automaticamente.","group_does_not_match":"O grupo de tickets não está no(s) grupo(s) do usuário.","non_aa_user_groups":"O usuário não pertence a nenhum grupo atribuído automaticamente.","non_aa_user_groups_exact":"O usuário pertence a pelo menos um grupo que não é atribuído automaticamente.","ticket_unsuccessfully_assigned":"Ocorreu um erro ao tentar atribuir automaticamente o ticket.","ticket_successfully_assigned":"O ticket foi atribuído automaticamente com sucesso.","ticket_assigned_notification":"O ticket foi atribuído automaticamente.","ticket_not_assigned":"Bilhete não atribuído automaticamente:","too_many_user_groups":"O usuário pertence a mais de um grupo de usuários."}},"zh-cn":{"default":{"report_bugs":"报告问题","load_location_error":"自动分配应用程序从错误的位置加载 -","non_agent_status":"工单未处于代理活动状态。","ticket_already_assigned":"票已分配；我们没有更新受让人。","non_aa_ticket_group":"工单不属于自动分配的组。","group_does_not_match":"工单组不在用户组中。","non_aa_user_groups":"用户不属于任何自动分配的组。","non_aa_user_groups_exact":"用户至少属于一个未自动分配的组。","ticket_unsuccessfully_assigned":"尝试自动分配工单时出错。","ticket_successfully_assigned":"工单已成功自动分配。","ticket_assigned_notification":"工单已自动分配。","ticket_not_assigned":"工单未自动分配：","too_many_user_groups":"用户属于多个用户组。"}}};