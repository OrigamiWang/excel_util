for (let i = 0; i < file_btn_arr.length; i++) {
    file_btn_arr[i].addEventListener("change", () => {
        click_upload_file(i)
    })

}

function click_upload_file(i) {
    console.log("listen click file...")
    let file = document.getElementById(file_btn_id[i]).files[0];
    let formData = new FormData();
    formData.append("file", file);
    fetch("/upload?type=" + i, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data === 200) {
                message_box('文件上传成功！', 'springgreen', 2000)
            } else if (data === 500) {
                message_box('文件上传失败，请检查文件类型后重试！', 'red', 2000)
            }
            //do something with data
        })
        .catch(error => {
            console.log(error)
            //handle error
        });
}

function drag_upload_file(file, i) {
    console.log("listen drag file..." + i)
    let formData = new FormData();
    formData.append("file", file);
    fetch("/upload?type=" + i, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //do something with data
        })
        .catch(error => {
            console.log(error)
            //handle error
        });
}
