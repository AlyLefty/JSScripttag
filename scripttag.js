// some cookie functions
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//get params
console.log('XX');
const url_string = window.location.href;
const url_object = new URL(url_string);
const my_param = url_object.searchParams.get("lefty");

console.log(my_param);
if (my_param != null) {

    //set cookie
    setCookie('lefty', my_param);

} else {

    //get cookie
    let my_param_cookie = getCookie('lefty');

    if (my_param_cookie) {

        //set params from cookie

        let url_all_params = '';
        const url_pathname = url_object.pathname;
        const url_params = url_object.search;
        const url_seperator = url_params == '' ? '?' : '&';
        const url_my_param = my_param == null ? 'lefty=' + my_param_cookie : my_param;

        url_all_params = url_pathname + url_params + url_seperator + url_my_param;

        if (history.pushState) {
            window.history.pushState({}, "", url_all_params);
        } else {
            document.location.href = url_all_params;
        }
    }
}
