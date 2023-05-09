combineBtn.onclick = () => {
    // let basic_path = document.getElementById('basic_path').value
    let union_excel = document.getElementById('union_excel').value
    fetch('/combine?union=' + union_excel)
        .then(response => response.json())
        .then(data => {
            if (data === 200) {
                message_box('文件合并成功！', 'springgreen', 2000)
            } else if (data === 400) {
                message_box('未上传excel文件！', 'red', 3000)
            } else if (data === 500) {
                message_box('excel文件格式不对或系统异常！', 'red', 3000)
            }
        })
        .catch(e => {
            console.log(e);
            message_box('文件合并失败！', 'red', 3000)
        })
}


function save_path() {

    let out_path = document.getElementById('out_path').value
    let union_excel = document.getElementById('union_excel').value
    // console.log(basic_path);
    // console.log(out_path);
    // console.log(union_excel);

    fetch('/setting/paths?path1=' + out_path + '&path2=' + union_excel)
        .then(response => response.json())
        .then(data => {
            if (data === 200) {
                message_box('配置保存成功！', 'springgreen', 2000)
            } else if (data === 500) {
                message_box('配置保存失败,请检查后重新输入！', 'red', 3000)
            }
        })
        .catch(e => {
            console.log(e);
            message_box('配置保存失败,请检查后重新输入！', 'red', 3000)
        })

}


function get_path() {
    fetch('/setting/getPath')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data === "") {
                message_box('配置加载失败,请检查config.yaml文件是否存在！', 'red', 3000)
            } else {
                let path_arr = data.split(',')
                // document.getElementById('basic_path').value = path_arr[0]
                document.getElementById('out_path').value = path_arr[0]
                document.getElementById('union_excel').value = path_arr[1]
                message_box('配置加载成功！', 'gray', 2000)
            }
        })
        .catch(e => {
            console.log(e);
            message_box('配置加载失败,请检查config.yaml文件是否存在！', 'red', 3000)
        })
}
