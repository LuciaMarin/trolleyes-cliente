miModulo.factory('promesasService', ['$http',
    function ($http) {
        return {
            ajaxGet: function (objeto, id) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=get&id=' + id);
            },
            ajaxUpdate: function (objeto, datos) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=update', datos);
            },
            ajaxNew: function (objeto, datos) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=insert', datos);
            },
            ajaxGetCount: function (object,id,filter) {
                if(filter != null && id != null) {
                    return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=getcount&filter=${filter}&id=${id}`);
                }
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=getcount`);
            },
            ajaxGetPage: function (object, rpp, page, colOrder, order, user, filter) {
                if (colOrder == null && order == null && user == null && filter == null) {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}`;
                } else if(user != null && filter != null) {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}&filter=${filter}&id=${user}`;
                } else if(user != null && filter != null && colOrder != null && order != null) {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}&filter=${filter}&rpp=${rpp}&order=${colOrder}&direccion=${order}`;
                } else {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}&order=${colOrder}&direccion=${order}`
                }
                return $http.get(url);
            },
            // pagination: function (num_posts, ppe, actually_page, range) {
            //     let num_pages = Math.ceil(num_posts / ppe);
            //     let pages = [];
            //     range++;
    
            //     for (let i = 1; i <= num_pages; i++) {
            //         if (i === 1) {
            //             pages.push(i);
            //         } else if (i > (actually_page - range) && i < (actually_page + range)) {
            //             pages.push(i);
            //         } else if (i === num_pages) {
            //             pages.push(i);
            //         } else if (i === (actually_page - range) || i === (actually_page + range)) {
            //             pages.push('...');
            //         }
            //     }
    
            //     return pages;
            // },
            ajaxRemove: function (objeto, id) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=remove&id=' + id);
            },
            ajaxLogin: function (username, password) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=login&username=' + username + '&password=' + forge_sha256(password));
            },
            ajaxLogout: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=logout');
            },
            ajaxCheck: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=check');
            },
            ajaxSessionLevel: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=sessionlevel');
            },
            ajaxFill: function (objeto, number) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=fill&number=' + number);
            },
            ajaxSearch: function (objeto, rpp, page, word) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=getpage&rpp=' + rpp + '&page=' + page + '&word=' + word);
            },
            ajaxAddCarrito: function (id, cantidad) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=' + id + '&cantidad=' + cantidad);
            },
            ajaxRemoveCarrito: function (id) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=remove&id=' + id);
            },
            ajaxListCarrito: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=list');
            },
            ajaxEmptyCarrito: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=empty');
            },
            ajaxBuy: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=buy');
            }
        }
    }])