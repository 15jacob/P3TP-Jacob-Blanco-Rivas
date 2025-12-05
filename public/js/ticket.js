window.addEventListener('load', function()
{
    initTicketButtons();
});

function initTicketButtons()
{
    const BTN_HOME = document.getElementById('btn-home');
    const BTN_DOWNLOAD_TICKET = document.getElementById('btn-download-ticket');

    if(BTN_HOME && BTN_DOWNLOAD_TICKET)
    {
        BTN_HOME.addEventListener('click', () => location.href = '/');
        BTN_DOWNLOAD_TICKET.addEventListener('click', () => downloadTicket(9));
    }
}



async function downloadTicket(id)
{
    if(id > 0)
        location.href = `http://localhost:3000/ticket/pdf/id=${id}`;
}