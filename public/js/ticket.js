import { checkLogin } from "./misc";

window.addEventListener('load', function()
{
    checkLogin();
    initTicketButtons();
});

function initTicketButtons()
{
    const BTN_HOME = document.getElementById('btn-home');
    const BTN_DOWNLOAD_TICKET = document.getElementById('btn-download-ticket');

    if(BTN_HOME && BTN_DOWNLOAD_TICKET)
    {
        BTN_HOME.addEventListener('click', () => location.href = '/');
        BTN_DOWNLOAD_TICKET.addEventListener('click', downloadTicket);
    }
}

function downloadTicket()
{

}