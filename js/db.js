
let dbPromise = idb.open('BolaQu', 1, upgradeDB => {
    if(!upgradeDB.objectStoreNames.contains('teams')){
        upgradeDB.createObjectStore('teams')
    }
})

const addTeam = ({id,logo,name,venue,address,founded,phone,email,website}) => {
    dbPromise
    .then(db => {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        let item = {
            id: id,
            logo: logo,
            name: name,
            venue: venue,
            address:address,
            founded:founded,
            phone:phone,
            email:email,
            website: website,
            created: new Date().getTime()
        };
        store.put(item, id);
        return tx.complete;
    })
    .then(() => console.log('Yeah!!! Berhasil Menyimpan Tim',name))
    .catch(() => console.log('Uppss!!! Gagal Menyimpan Tim'))
}

const deleteTeam = id => {
    dbPromise
    .then(db => {
        let tx = db.transaction('teams', 'readwrite')
        let store = tx.objectStore('teams')
        store.delete(id)
        return tx.complete
    })
    .then(() => console.log('Item Deleted'))
}

const getTeam = () => {
    return dbPromise
    .then(db => {
        let tx = db.transaction('teams','readonly')
        let store = tx.objectStore('teams')

        return store.getAll()
    })
    .then(data => data)
}


const savFav = (id,logo,name,venue,address,founded,phone,email,website) => {
    let imSure = confirm(`${name} Team FavoritMu ?`)
    if(imSure){
    //menambah ke DB
    addTeam({id,logo,name,venue,address,founded,phone,email,website})
    //Tampilkan Toast
    M.toast({html: `Berhasil Favorit ${name}`});
    //Push Notification
    pushNotification(`Berhasil Menyimpan ${name}`)
    }
}
const deleteFav = (id,name) => {
    //Conform Delete Bookmark ?
    let imSure = confirm(`Hapus ${name} dari Team FavoritMu ?`)
    if(imSure){
        //Delete Team From Database
        deleteTeam(id)
        //Fetch All Team
        getTeamFav()
        //Tampilkan Toast
        M.toast({html: `Berhasil Menghapus ${name}`})
        //Push Notification
        pushNotification(`Berhasil Menghapus ${name}`)
    }
    
}

function cekDataTeam(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
                var tx = db.transaction('teamFav', "readonly");
                var store = tx.objectStore('teamFav');
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve(true)
                }else {
                  reject(false);
                }
            });
    });
}
