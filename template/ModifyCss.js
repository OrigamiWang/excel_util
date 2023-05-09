function drag_over_fun(dragDiv, title) {
    dragDiv.style.backgroundColor = "#c56fd5"
    title.style.color = "white"
}

function drop_fun(files, dragInHiddenDiv, dragDiv, title, i) {
    console.log("文件名字：" + files[0].name)
    console.log("文件类型：" + files[0].type)
    dragInHiddenDiv.style.visibility = ""
    dragInHiddenDiv.innerText = files[0].name
    dragDiv.style.backgroundColor = "#e5e5e5"
    // 将内框中的文本修改问文件的名字
    title.style.color = "black"
    drag_upload_file(files[0], i)
}

function dragenter_fun(dragDiv, title) {
    dragDiv.style.backgroundColor = "#c56fd5"
    title.style.color = "white"
}

function dragleave_fun(dragDiv, title, drop_area_in_hidden) {
    dragDiv.style.backgroundColor = "#e5e5e5"
    title.style.color = "black"
}


function display_file(file_btn, drop_area_in, drop_area_in_hidden) {
    let files = document.getElementById(file_btn).files
    let dragInHiddenDiv = document.getElementById(drop_area_in_hidden)
    console.log(files[0])
    console.log("文件路径：" + files[0].name)
    dragInHiddenDiv.innerText = files[0].name
    document.getElementById(drop_area_in_hidden).style.visibility = ""
    // 将内框中的文本修改问文件的名字
}

function after_upload_file1() {
    display_file('file_btn1', 'drop_area1_in_hidden', 'drop_area1_in_hidden');
}

function after_upload_file2() {
    display_file('file_btn2', 'drop_area2_in_hidden', 'drop_area2_in_hidden');
}

let after_upload_file = [
    after_upload_file1,
    after_upload_file2
]