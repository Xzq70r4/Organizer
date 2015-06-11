app.filter('priority', function role() {
    return function (role) {
        if (role === 0 ) {
            return 'Urgent';
        } else {
            return 'Non Urgent';
        }
    }
})