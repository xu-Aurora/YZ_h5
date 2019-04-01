export function disposeUrl() {
    let url = window.location.href
    if(url) {
        let search = url.split('?')
        if(search[1]) {
            let params =  search[1].split('&')
            let data = {}
            params.forEach(item => {
                let list = item.split('=')
                data[list[0]] = list[1]
            });
            return data
        }
    }
}