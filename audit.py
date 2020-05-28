data = [line.strip() for line in open("E:/audit.log", 'r')]
dic = {'method':{},'port':{},'status':{}}
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
	if "-F--" in data[i]:
		status = data[i+1].split(" ")[1]
		if status not in dic['status'].keys():
			dic['status'][status] = 1
		else:
			dic['status'][status] = dic['status'][status] + 1
print(dic)