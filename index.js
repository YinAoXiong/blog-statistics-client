"use strict";
function statistics(prop) {
    statistics.id= prop.id ? prop.id : null;
    statistics.pagePVId=prop.pagePVId ? prop.pagePVId :'statistics_page_pv';
    statistics.sitePVId=prop.sitePVId ? prop.sitePVId :'statistics_site_pv';
    statistics.siteUVId=prop.siteUVId ? prop.siteUVId :'statistics_site_uv';
    statistics.serverURL=prop.serverURL ? prop.serverURL : '//statistics.yinaoxiong.cn'

    function setCookie(name, value) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        var exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);//过期时间为24小时
        cookieText += '; expires=' + exp.toUTCString();
        document.cookie = cookieText + '; path=/';
    }
    function getCookie(name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }

    statistics.statisticsCallBack= function (page_pv, site_pv, site_uv) {
        console.log(page_pv, site_pv, site_uv);
        var a = document.getElementById(statistics.pagePVId);
        a && (a.innerHTML = page_pv);
        a = document.getElementById(statistics.sitePVId);
        a && (a.innerHTML = site_pv);
        a = document.getElementById(statistics.siteUVId);
        a && (a.innerHTML = site_uv);
    }

    this.begin=function() {
        var requestUrl = statistics.serverURL+'/api/callback?haveCookie=';
        if (getCookie('statistics_id') === null) {
            setCookie('statistics_id', 1);
            requestUrl += 0;
        } else {
            requestUrl += 1;
        }
        requestUrl+='&id='+statistics.id;
        var scriptTag = document.createElement("SCRIPT");
        scriptTag.type = "text/javascript", scriptTag.defer = !0;
        scriptTag.src = requestUrl;
        document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
    }

}
