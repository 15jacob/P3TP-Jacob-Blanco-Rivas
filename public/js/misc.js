export function uint(value)
{
    value = parseInt(value);

    if(value && !isNaN(value) && value > 0)
        return value;

    return 0;
}
