# _*_ coding : utf-8 _*_
# @Time : 2023/4/4 17:16
# @Author : Origami
# @File : ReadYaml
# @Project : ExcelUtil

from yaml import load, SafeLoader


def get_yaml_data(yaml_path):
    with open(yaml_path, 'r', encoding='utf-8') as f:
        my_data = load(f.read(), Loader=SafeLoader)
    return my_data


# 运行前的预处理。包括创建配置文件、文件夹；创建结果输出文件夹


def write_yaml(out_path, union_excel):
    print(out_path, union_excel)
    with open('config.yaml', 'w', encoding='utf-8') as f:
        f.write(
            "# 注意:\n# "
            "1. 在路径最后必须要添加反斜杠 \n# "
            "2. 不要破坏文件结构 (冒号后面有个空格，路径使用单引号) \n"
            "# 3. 文件路径必须存在！\n"
            "out_path: \'" + out_path + "\'\n" +
            "union_excel: \'" + union_excel + "\'\n")


def get_path_str(yaml_path):
    yaml_data = get_yaml_data(yaml_path)
    path_res = ""
    for k in yaml_data:
        print(k)
        path_res += (yaml_data[k] + ",")
    return path_res[:len(path_res) - 1]

# print(get_path_str('config.yaml'))
