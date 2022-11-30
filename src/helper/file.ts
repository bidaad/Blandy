import $ from 'jquery'
export const FileExist = (url: string) => {
    if (!url) {
        return false;
    }
    $.get(url)
    .done(function() { 
        return true;

    }).fail(function() { 
        return false;

    })
}