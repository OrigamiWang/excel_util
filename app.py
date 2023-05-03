import os
import sys
import flask
import webview
import threading

sys.path.append(".")

from script.ReadYaml import write_yaml, get_path_str
from script.process_excel import solution

sys.stdout = open("log.txt", "a")
sys.stderr = open("log.txt", "a")

app = flask.Flask(__name__, static_url_path='', static_folder='.', template_folder='.')


@app.route('/')
def index():
    return flask.render_template('template/index.html')
    # return flask.render_template(get_path('index.html'))


@app.route('/echo/<text>')
def echo(text):
    return flask.jsonify(f'you input text is {text}')


# TODO: Cannot get file path in html, maybe should post first?
# TODO: https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E4%B8%8A%E4%BC%A0%E4%B8%80%E4%B8%AA%E7%94%A8%E6%88%B7%E9%80%89%E6%8B%A9%E7%9A%84%E6%96%87%E4%BB%B6
@app.route('/excel/files')
def combine_excel():
    in_excel = flask.request.args.get('file1')
    out_excel = flask.request.args.get('file2')
    union_excel = flask.request.args.get('file3')
    solution(in_excel, out_excel, union_excel)
    return flask.jsonify("combine excel success!")
    # return write_excel(combine_file(file1, file2))
    # http://127.0.0.1:5000/excel/files?file1=C:\Users\Origami\Desktop\excel\in.xlsx&file2=C:\Users\Origami\Desktop\excel\out.xlsx


# 保存文件路径配置
@app.route('/setting/paths')
def save_path():
    basic_path = flask.request.args.get('path1')
    out_path = flask.request.args.get('path2')
    union_excel = flask.request.args.get('path3')
    write_yaml(basic_path, out_path, union_excel)
    return flask.jsonify("config success!")


# 获取文件路径配置
@app.route('/setting/getPath')
def get_yaml_path():
    print(os.getcwd())
    return flask.jsonify(get_path_str('config.yaml'))


def start_server():
    app.run()


if __name__ == '__main__':
    t = threading.Thread(target=start_server)
    t.daemon = True
    t.start()
    webview.create_window("Excel Util", 'http://127.0.0.1:5000')  # 把app换成URL
    webview.start()
