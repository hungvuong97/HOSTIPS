
from flask import Flask, render_template, json, redirect, request, make_response
from time import sleep,mktime,strftime
from flask import jsonify 
import requests
import psutil
import hashlib
import subprocess
import calendar
app = Flask(__name__)   

@app.route("/trang_chu", methods=['GET'])
def home():
  token = request.cookies.get("token")
  if token != '':
    p = subprocess.Popen(['powershell.exe', ".\powershell\process.ps1"], stdout=subprocess.PIPE, shell=True)
    (output, err) = p.communicate()
    p_status = p.wait()
    data = str(output).split("|||")
    table = []
    del data[0]
    for i in range(1,len(data)-1):
      rowTable = []
      for j in range(0,5):
        if(j == 0):
          rowTable.append(data[i].split('||')[j].replace(r'\r\n', '').strip())
          continue
        elif(j==3):
          rowTable.append((data[i].split('||')[j]).replace('\\n', '').strip())
          # continue
        elif(j==4):
          rowTable.append(data[i].split('||')[j].replace('\\n', '').replace(" ","").strip())
          # continue
        else:
          rowTable.append((data[i].split('||')[j]).replace('\\n', '').strip())
          continue
      table.append(rowTable)

    hard = []
    cmd = '.\powershell\systeminfo.ps1'
    p = subprocess.Popen(["powershell.exe" ,cmd], stdout=subprocess.PIPE, shell=True)
    (output, err) = p.communicate()
    p_status = p.wait()
    data = str(output).split("|||")
    check_header = 0
    for i in range(0,len(data)-1):
      row = []
      if "*****" in data[i]:
        row.append("newtable")
      for j in range(0,4):
          try:
              if check_header == 1:
                test =1
                # in dam dong
              if(j == 0):
                row.append((data[i].split('||')[j]).replace('\\n', '').replace('*****','').replace('|', '').replace('\\r', ''))
              else:
                row.append((data[i].split('||')[j]).replace('\\n', '').replace('*****','').replace('|', '').replace('\\r', ''))
          except:
              continue
      hard.append(row)
    return render_template('index.html', process=table, hard=hard)
  else: 
    return redirect('/login')



@app.route('/log', methods=['GET'])
def log():
  token = request.cookies.get("token")
  if token != '': 
    cmd =  'Get-Content E:/audit.log -Tail 50'
    p = subprocess.Popen(['powershell.exe', cmd], stdout=subprocess.PIPE, shell=True)
    (output, err) = p.communicate()
    p_status = p.wait()
    output = str(output).split("\\r\\n")
    return render_template('log.html', log = output)
  else :
    return redirect('/login')
 

@app.route("/chart", methods=['GET'])
def network():
  data = [line.strip() for line in open("E:/audit.log", 'r')]
  dic = {'method':{},'port':{},'status':{}}
  dateDic = {}
  hourDic = {}
  curhour = 0
  curdate = 0
  curyear = 0
  for i in range(0,len(data)):
    if "-B--" in data[i]:
      method = data[i+1].split(" ")[0]
      if method not in dic['method'].keys():
        dic['method'][method]= 1
      else:
        dic['method'][method] = dic['method'][method] + 1
    if "-A--" in data[i]:
      port = data[i+1].split(" ")[-1]
      if port not in dic['port'].keys():
        dic['port'][port] = 1
      else:
        dic['port'][port] = dic['port'][port] + 1
      time = data[i+1].split(" ")[0][1:]
      date = time.split(":")[0]
      hour = time.split(":")[1]
      curyear = time.split(":")[2]
      curdate = date.split("/")[0] + "/" + date.split("/")[1] 
      if curdate not in dateDic.keys():
        dateDic[curdate]= 1
      else:
        dateDic[curdate] = dateDic[curdate] + 1
      curhour = int(hour)
      if hour + "-"+ curdate not in hourDic.keys():
        hourDic[hour + "-"+ curdate]= 1
      else:
        hourDic[hour + "-"+ curdate] = hourDic[hour + "-"+ curdate] + 1

    if "-F--" in data[i]:
      status = data[i+1].split(" ")[1]
      if status not in dic['status'].keys():
        dic['status'][status] = 1
      else:
        dic['status'][status] = dic['status'][status] + 1
  month = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']

  display_hour ={}
  for i in range(curhour,24):
    curday = int(curdate.split("/")[0])-1
    curmonth = curdate.split("/")[1]
    if curday == 0:
      curmonth = month[month.index(curmonth)-1]
      curday = calendar.monthrange(curyear,month.index(curmonth))[1]
    if str(i) + "-"+ str(curday)+"/"+  curmonth not in hourDic.keys():
      display_hour[str(curday)+"/"+  curmonth + "-" + str(i) + "h" ] =0
    else:
      display_hour[str(curday)+"/"+  curmonth + "-" + str(i) + "h"] = hourDic[str(i) + str(int(curdate.split("/")[0])-1)+"/"+  curdate.split("/")[1]]
  for i in range(0,curhour+1):
    if str(i) + "-"+ curdate not in hourDic.keys():
      display_hour[curdate + "-" + str(i) + "h" ] = 0
    else:
      display_hour[curdate + "-" + str(i) + "h"] = hourDic[str(i) + "-"+ curdate]
  curday = int(curdate.split("/")[0])
  curmonth = curdate.split("/")[1]

  count = 0

  display_date = {}

  if curday > 15:
    startday = curday -15
    startmonth = curmonth
  else:
    if not month.index(curmonth) - 1 <= 0:
      startmonth = month[month.index(curmonth) - 1]
      startday = calendar.monthrange(curyear,month.index(startmonth))[1]-(15-curday)
    else:
      startday = 0
      startmonth  = curmonth

  dateloop = startday
  check = 0 
  if month.index(curmonth) == 0:
    check =1

  while count  <= 15:
    if check ==1:
      break
    if curmonth != startmonth:
      cache = str(dateloop) + "/" + month[month.index(curmonth-1)]
      if (cache) not in dateDic:
        display_date[cache] = 0
      else:
        display_date[cache] = dateDic[cache]
      dateloop = dateloop + 1
      if dateloop > calendar.monthrange(curyear,month.index(startmonth))[1]:
        dateloop = 1
    else:
      cache = str(dateloop) + "/" + month[month.index(curmonth)]
      if (cache) not in dateDic:
        display_date[cache] = 0
      else:
        display_date[cache] = dateDic[cache]

      dateloop = dateloop + 1	
    count = count + 1
  if check == 1:
    for i in range(0,curday+1):
      cache = str(i) + "/" + month[month.index(curmonth)]
      if (cache) not in dateDic:
        display_date[cache] = 0
      else:
        display_date[cache] = dateDic[cache]
  hourKey =[]
  hourValue = []
  for key,val in display_hour.items():
    hourKey.append(key)
    hourValue.append(val)
  data = [dic, hourKey, hourValue, display_date]  
  return json.dumps(data)  

@app.route('/login', methods=['GET'])
def login():
  return render_template('login.html')

@app.route('/postLogin', methods=['POST'])
def postLogin():
  username = request.form['username']
  password = request.form['password']
  token = request.cookies.get("token")
  file = 'pass.txt'
  f = open(file, 'r')
  f1 = f.readline()
  print(token)
  if token != '' : 
    return redirect('/trang_chu')
  else : 
    print(hashlib.sha1(password.encode('utf-8')).hexdigest(), f1)
    if hashlib.sha1(password.encode('utf-8')).hexdigest() == f1 and username == 'admin' :
      resp = make_response(redirect('/trang_chu'))
      resp.set_cookie('token',hashlib.sha1(password.encode('utf-8')).hexdigest(), max_age = 3600)
      return resp
    else : 
      return redirect('/login')

@app.route('/info', methods=['GET'])
def info():
  cmd = '.\powershell\status.ps1'
  p = subprocess.Popen(["powershell.exe" ,cmd], stdout=subprocess.PIPE, shell=True)
  (output, err) = p.communicate()
  p_status = p.wait()
  data = str(output).split("|||")
  time = strftime("%b %d %Y %H:%M:%S")
  up_time = data[0].split(":")[1]
  cpu_usage = data[1].split(":")[1]
  ram_usage = data[2].split("||")[-1]

  swap = data[3].split("||")[2]
  process = data[4].replace('\\n', '').replace('\\r', '').lstrip("\'")
  print(time, up_time, swap, process)
  return json.dumps({'time':time, 'up_time': up_time, 'swap': swap, 'process': process,'cpu':cpu_usage,"ram":ram_usage})

@app.route('/changePass', methods=['GET'])
def changePass():
  token = request.cookies.get("token")
  if token != '':
    return render_template('change_pass.html')
  else:
    return redirect('/login')

@app.route('/postChangePass', methods=['POST'])
def postChangePass():
  file = 'pass.txt'
  f = open(file, 'r')
  f1 = f.readline()
  f.close()
  oldPass = request.form['oldpass']
  newPass = request.form['newpass']
  print(oldPass, newPass)
  print(hashlib.sha1((oldPass).encode('utf-8')).hexdigest(), f1)
  if(hashlib.sha1((oldPass).encode('utf-8')).hexdigest() == f1 ):
    f = open(file, 'w')
    f.write(hashlib.sha1(newPass.encode('utf-8')).hexdigest())
    f.close()
    resp = make_response(redirect('/login'))
    resp.set_cookie('token', '', max_age = 3600)
    return resp
  return redirect('/changePass')

@app.route('/logout', methods=['GET'])
def logout():
  resp = make_response(redirect('/login'))
  resp.set_cookie('token','', max_age = 3600)
  return resp


if __name__ == "__main__":
    app.run(host = '127.0.0.1', port = '3000', debug=True)