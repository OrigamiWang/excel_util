


combineBtn.onclick = () => {
    let basic_path = document.getElementById('basic_path').value
    let union_excel = document.getElementById('union_excel').value
    fetch('/excel/files?file1=' + basic_path + path1.innerText + '&file2=' + basic_path + path2.innerText
        + '&file3=' + union_excel)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            message_box('文件合并成功！', 'springgreen', 2000)
        })
        .catch(e => {
            console.log(e);
            message_box('文件合并失败！', 'red', 3000)
        })
}



function save_path() {

    let basic_path = document.getElementById('basic_path').value
    let out_path = document.getElementById('out_path').value
    let union_excel = document.getElementById('union_excel').value
    // console.log(basic_path);
    // console.log(out_path);
    // console.log(union_excel);

    fetch('/setting/paths?path1=' + basic_path + '&path2=' + out_path + '&path3=' + union_excel)
        .then(response => response.json())
        .then(data => {
            console.log("配置保存成功！")
            message_box('配置保存成功！', 'springgreen', 2000)
        })
        .catch(e => {
            console.log(e);
            message_box('配置保存失败！', 'red', 3000)
        })

}


function get_path() {
    fetch('/setting/getPath')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let path_arr = data.split(',')
            document.getElementById('basic_path').value = path_arr[0]
            document.getElementById('out_path').value = path_arr[1]
            document.getElementById('union_excel').value = path_arr[2]
            message_box('配置加载成功！', 'gray', 2000)
        })
        .catch(e => {
            console.log(e);
            message_box('配置加载失败！', 'red', 3000)
        })
}
