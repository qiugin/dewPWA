
const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        image: '/images/bolaquPush.png',
        badge: '/images/badgeicon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    } else {
        console.error('Wadudu !! , Fitur notifikasi tidak diijinkan Sluurr.');
    }
}

function reLoad(){
    window.location.reload(true);
}

const loadPage = (path = 'home') => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            let element = document.querySelector('#body-content')
            if(xhr.status == 200){
                element.innerHTML = xhr.responseText
                if(path === 'bolaqu'){
                    getTeamFav()
                    window.deleteFav = deleteFav
                }
                else if(path === 'teams'){
                    getTeams(2019)
                    window.savFav = savFav
                }
                
                else if(path === 'jadwal'){
                    getJadwal(2019)
                }
                else if(path === 'topskor'){
                    topSkor()
                }
                else if(path === 'klasemen'){
                    AllKlasemen()
                }
                
            }else if(xhr.status == 404){
                element.innerHTML = "<h1>Wadudu !!! Halaman Tidak Ditemukan Sluurr</h1>"
            }else{
                element.innerHTML = "<h1>Untuk mode Offline, refresh halaman dahulu</h1>"

            }
        }
    }
    xhr.open('GET',`/pages/${path}.html`,true)
    xhr.send()
}


const init = () => {
    const sideNav = document.querySelector('.sidenav')
    M.Sidenav.init(sideNav)
}

const loadNav = () => {

    init()

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 || xhr.status != 200) return

    document.querySelectorAll('.topnav, .sidenav')
    .forEach(el => {
        el.innerHTML = xhr.responseText
    })

        document.querySelectorAll('.topnav a, .sidenav a')
        .forEach(el => {
            el.addEventListener('click',event => {

                const sideNav = document.querySelector('.sidenav')
                M.Sidenav.getInstance(sideNav).close()

                const path = event.target.getAttribute('href').substr(1)
                loadPage(path)
            })
        })
    }
    xhr.open('GET','nav.html',true)
    xhr.send()
}





$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
  }).resize();