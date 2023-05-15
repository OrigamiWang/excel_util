import os
import sys
import flask
import webview
import threading

sys.path.append(".")

from script.ReadYaml import write_yaml, get_path_str
from script.process_excel import solution
#
sys.stdout = open("log.txt", "a")
sys.stderr = open("log.txt", "a")

app = flask.Flask(__name__, static_url_path='', static_folder='.', template_folder='.')


@app.route('/')
def index():
    return flask.render_template('template/index.html')


@app.route('/echo/<text>')
def echo(text):
    return flask.jsonify(f'you input text is {text}')


def get_excel_file_path():
    in_excel = ''
    out_excel = ''
    file_list = list_dir()
    hasInExcel = False
    hasOutExcel = False
    if len(file_list):
        # 必须是一个进项文件，一个销项文件才符合要求
        for file in file_list:
            if str(file[0]) == str(0):
                in_excel = file
                hasInExcel = True
            if str(file[0]) == str(1):
                out_excel = file
                hasOutExcel = True
        if hasInExcel and hasOutExcel:
            in_excel_path = os.path.join(os.getcwd() + '\\temp', in_excel)
            out_excel_path = os.path.join(os.getcwd() + '\\temp', out_excel)
            return in_excel_path, out_excel_path
        return "", ""
    return "", ""


@app.route('/combine')
def combine_excel():
    try:
        union_excel = flask.request.args.get('union')
        in_excel, out_excel = get_excel_file_path()
        if in_excel == "" or out_excel == "":
            return flask.jsonify(400)
        solution(in_excel, out_excel, union_excel)
        return flask.jsonify(200)
    except Exception as e:
        print("combine_excel方法异常")
        print(e)
        return flask.jsonify(500)
    # return write_excel(combine_file(file1, file2))
    # http://127.0.0.1:5000/excel/files?file1=C:\Users\Origami\Desktop\excel\in.xlsx&file2=C:\Users\Origami\Desktop\excel\out.xlsx


# 保存文件路径配置
@app.route('/setting/paths')
def save_path():
    try:
        out_path = flask.request.args.get('path1')
        union_excel = flask.request.args.get('path2')
        write_yaml(out_path, union_excel)
        return flask.jsonify(200)
    except Exception as e:
        print("save_path方法异常")
        print(e)
        return flask.jsonify(500)


# 获取文件路径配置
@app.route('/setting/getPath')
def get_yaml_path():
    try:
        print(os.getcwd())
        return flask.jsonify(get_path_str('config.yaml'))
    except Exception as e:
        print("get_yaml_path方法异常")
        print(e)
        return ""


def start_server():
    app.run()


# 文件上传
@app.route("/upload", methods=["POST", "GET"])
def upload():
    # 文件类型：进项文件：0开头， 销项文件：1开头
    try:
        file_type = flask.request.args.get('type')
        file = flask.request.files["file"]
        print("file_type: ", file_type)
        # 在保存excel文件前，先把同类型的文件全部删了
        delete_old_file(file_type)
        # 上传最新的文件
        upload_file(file_type, file)
        return flask.jsonify(200)
    except Exception as e:
        print("upload方法异常")
        print(e)
        return flask.jsonify(500)


def delete_old_file(file_type):
    dir_path = os.path.join(os.getcwd(), 'temp')
    print("delete the old file...")
    file_list = list_dir()
    for file in file_list:
        if str(file[0]) == str(file_type):
            file_path = os.path.join(dir_path, file)
            os.remove(file_path)


def upload_file(file_type, file):
    print("upload new file...")
    temp_file_path = os.path.join(os.getcwd() + '\\temp', file_type + "_" + file.filename)
    file.save(temp_file_path)


def list_dir():
    dir_path = os.path.join(os.getcwd(), 'temp')
    file_list = os.listdir(dir_path)
    return file_list


if __name__ == '__main__':
    # app.run()
    t = threading.Thread(target=start_server)
    t.daemon = True
    t.start()
    webview.create_window("Excel Util", 'http://127.0.0.1:5000')  # 把app换成URL
    webview.start()
