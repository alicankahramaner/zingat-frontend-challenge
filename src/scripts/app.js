var App = {
    Init: function () {
        App.Helper.Import(this);
    },

    Helper: {
        Import: function (self) {
            var obj;

            for (obj in self) {
                if (self.hasOwnProperty(obj)) {
                    var _method = self[obj];
                    if (_method.selector !== undefined && _method.init !== undefined) {
                        if (document.querySelectorAll(_method.selector).length) {
                            _method.init();
                        }
                    }
                }
            }
        },

        isMobile() {
            return window.innerWidth < 960;
        },

        Http: (() => {
            var http = new XMLHttpRequest();
            var loading = document.getElementById('loading');

            var instance = async (type = 'POST' || 'GET', url = '', data = {}, callback = Function) => {
                return new Promise((resolve, reject) => {
                    loading.classList.toggle('show');
                    http.open("POST", url, true);

                    type === 'POST' ? http.setRequestHeader("Content-Type", "application/json") : null;

                    http.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            loading.classList.toggle('show');
                            resolve(JSON.parse(http.responseText));
                        }
                    };
                    http.onerror = reject;

                    http.send(JSON.stringify(data));

                });
            }

            var post = async (url = '', data = {}) => {
                return await instance('POST', url, data);
            }

            var get = async (url = '', data = {}) => {
                return await instance('GET', url, data);
            }

            return {
                post,
                get
            }
        })()
    },

    Login: {
        selector: '.login-form',
        init() {
            var loginForm = document.querySelector(this.selector);
            loginForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                var data = {
                    username: loginForm.elements['username'].value,
                    password: loginForm.elements['password'].value
                };

                if (data.username === '' || data.password === '') {
                    alert('Lütfen bütün alanları doldurunuz.');
                    return;
                }
                let res = await App.Helper.Http.post('/login', data);
                if (!res.success) {
                    alert('Hatalı kullanıcı adı veya şifre');
                    return;
                }
                location.href = '/myalbums';
            });
        }
    },

    MyAlbums: {
        selector: '#myalbums',
        albumLinkList: document.getElementById('albumList'),
        albumImages: document.getElementById('albumImages'),
        previewAlbumImage = document.getElementById('previewAlbumImage'),

        init() {
            this.getAlbumList();
        },
        async getAlbumList() {
            let list = await App.Helper.Http.post('/myalbums', {
                size: 10
            });

            if (!list.success) {
                alert('Albümler getirilemedi tekrar deneyiniz.');
                return;
            }

            this.fillAlbumList(list.data);

        },

        fillAlbumList(list = []) {
            for (var i = 0; i < list.length; i++) {
                let item = list[i];
                let link = document.createElement('a');

                link.text = item.title;
                link.href = 'javascript:;'
                link.onclick = (e) => {
                    this.getAlbumDetail(e, item.id);
                }
                this.albumLinkList.appendChild(link);
            }
        },

        async getAlbumDetail(event, albumId = 0) {
            if (albumId === 0) {
                return;
            }

            let img = this.previewAlbumImage.querySelector('img');
            if (img) {
                this.previewAlbumImage.removeChild(img);
            }

            let activeItem = this.albumLinkList.querySelector('.active');
            if (activeItem) {
                activeItem.classList.remove('active');
            }

            event.target.classList.add('active');

            let res = await App.Helper.Http.post('/getAlbum', {
                albumId: albumId,
                size: App.Helper.isMobile() ? 4 : 8
            });

            if (!res.success) {
                alert('Bir hata oluştu lütfen tekrar deneyiniz.');
                return;
            }

            this.fillAlbumImage(res.data);

        },

        fillAlbumImage(images = []) {
            this.albumImages.innerHTML = '';
            images.forEach((image) => {
                let img = document.createElement('img');

                img.src = image.thumbnailUrl;
                img.alt = image.title;
                img.dataset.fullsize = image.url;

                img.onclick = (event) => {
                    this.getAlbumPhotoFullSize(event.target, image.url);
                }

                this.albumImages.appendChild(img);
            });
        },

        getAlbumPhotoFullSize(clickedImage, src = '') {
            if (src === '') {
                return;
            }

            let activeItem = this.albumImages.querySelector('.active');
            console.log('active img',activeItem);
            if (activeItem) {
                activeItem.classList.remove('active');
            }

            clickedImage.classList.add('active');

            let img = this.previewAlbumImage.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                this.previewAlbumImage.appendChild(img);
            }

            img.src = src;
        }
    }

}

window.addEventListener('load', () => {
    App.Init();
});