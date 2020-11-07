window.onload = function (e) {
    const likeBtn = document.getElementById('likeBtn');
    const dislikdBtn = document.getElementById('dislikeBtn')

    likeBtn.addEventListener('click', function (e) {
        let postId = likeBtn.dataset.post
        console.log(postId);
        reqLikeDislike('likes', postId)
            .then(res => res.json())
            .then(data => {
                let likeText = data.liked ? 'Liked' : 'Like'
                likeText = likeText + ` (${data.totalLikes}) `
                let dislikeText = `Dislike(${data.totalDislikes})`

                likeBtn.innerHTML = likeText
                dislikdBtn.innerHTML = dislikeText
            })
            .catch(e => {
                console.log(e)
                alert(e.message)
            })
    })

    dislikdBtn.addEventListener('click', function (e) {
        let postId = dislikdBtn.dataset.post
        reqLikeDislike('dislikes', postId)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let dislikeText = data.dislikes ? 'Disliked' : 'Dislike'
                dislikeText = dislikeText + ` ( ${data.totalDislikes} ) `
                let likeText = `Like( ${data.totalLikes} )`

                likeBtn.innerHTML = likeText
                dislikdBtn.innerHTML = dislikeText
            })
            .catch(e => {
                console.log(e)
                alert(e.message)
            })
    })
    function reqLikeDislike(type, postId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${type}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })
        console.log(req)
        return fetch(req)
    }
}