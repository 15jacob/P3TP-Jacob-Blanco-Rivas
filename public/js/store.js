window.addEventListener('load', function()
{
    initNavLinks();
    initPageSelectors();
})

function initNavLinks()
{
    document.querySelectorAll('.nav-link').forEach(function(navLink)
    {
        navLink.addEventListener('click', function()
        {
            const IDCATEGORY = parseInt(this.dataset.id);

            if(IDCATEGORY > 0)
                window.location.href = `/home/id=${IDCATEGORY.toString()}/page=0`;
            else
                window.location.href = `/home`;
        });
    }); 
}

function initPageSelectors()
{
    document.querySelectorAll('.page-select').forEach(function(pageSelect)
    {
        pageSelect.addEventListener('click', function()
        {
            const IDCATEGORY = parseInt(this.dataset.idCategory);
            const PAGE = parseInt(this.dataset.page);

            if(IDCATEGORY === 0 && PAGE === 1)
                window.location.href = `/home`;
            else
                window.location.href = `/home/id=${IDCATEGORY.toString()}/page=${PAGE.toString()}`;
        });
    });
}