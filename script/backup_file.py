# _*_ coding : utf-8 _*_
# @Time : 2023/4/27 22:53
# @Author : Origami
# @File : backup_test
# @Project : ExcelUtil

import os
import time
import shutil


def copy_paste(src_path, dst_path):
    if not os.path.isfile(src_path):
        print("%s is not exists." % src_path)
    else:
        shutil.copyfile(src_path, dst_path)


def backup_file(in_excel, out_excel, union_excel):
    # 用时间来命名分文件夹
    backup_dir_name = '各月存档文件夹\\' + get_time() + '\\'

    if not os.path.exists(backup_dir_name):
        os.makedirs(backup_dir_name)

    copy_paste(in_excel, backup_dir_name + '进项备份.xlsx')
    copy_paste(out_excel, backup_dir_name + '销项备份.xlsx')
    copy_paste(union_excel, backup_dir_name + '总（待）匹配表备份.xlsx')


def get_time():
    return time.strftime('%Y-%m-%d', time.localtime(time.time()))
