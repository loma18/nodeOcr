ԭ�����ԣ�https://blog.csdn.net/aladdingod/article/details/78655056
�������Ƽ�����

����Ŀ��</br>
ԭ��ܼ򵥣���node��Ļ��������õ�����������ͼƬ���ݲ����ظ�ǰ̨��Ϣ��
ʵ��Ч�����ٶ��ṩ��ͼƬʶ�𣬾�������ʶ���ƺŵȹ淶�������ֻ��ǱȽ�׼ȷ��
���в��裺
1���ڸ�Ŀ¼������npm install;
2������node_modulesĿ¼,��ѹ��aip-node-sdk-1.4.1.zip�ļ�;
3������aip-node-sdk-1.4.1�ļ��в�ִ��npm install;
4���ڸ�Ŀ¼������npm start����,������Զ��򿪲���ת��http://localhost:3000/uploadPhoto,��û����ת,�����д���ַ;
5���������������ϴ�ͼƬʶ��ɡ�
###��������
1.Express ��һ���ǳ����е�node.js��web��ܡ�����connect(node�м�����)���ṩ�˺ܶ���ڴ���http�����web������ص���չ��
2.OCR��
ͨ������ʶ�� Node SDKĿ¼�ṹ��
<pre><code>
������ src
    ��  ������ auth                                //��Ȩ�����
    ��  ������ http                                //Httpͨ�������
    ��  ������ client                              //������
    ��  ������ util                                //������
    ��  ������ const                               //������
    ������ AipOcr.js                      //ͨ������ʶ�𽻻���
    ������ index.js                               //����ļ�
    ������ package.json                           //npm�������ļ�
  </code> </pre> 
  ֧�� node �汾 4.0+
  ֱ��ʹ��node�������������£�
1.�ڹٷ���վ����node SDKѹ������
2.�����ص�aip-node-sdk-version.zip��ѹ�󣬸��Ƶ������ļ����С�
3.����Ŀ¼������npm install��װsdk������
4.��Ŀ¼����ģ������
���У�versionΪ�汾�ţ������ɺ��û��Ϳ����ڹ�����ʹ��ͨ������ʶ�� Node SDK��
ֱ��ʹ��npm��װ������
npm install baidu-aip-sdk��**����û�гɹ�**��

AipOcrClient��Optical Character Recognition��node�ͻ��ˣ�Ϊʹ��Optical Character Recognition�Ŀ�����Ա�ṩ��һϵ�еĽ���������
�û����Բο����´����½�һ��AipOcrClient��
<code>
var AipOcrClient = require("baidu-aip-sdk").ocr;
// ����APPID/AK/SK
var APP_ID = "��� App ID";
var API_KEY = "��� Api Key";
var SECRET_KEY = "��� Secret Key";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
</code>

###����ʵ��
ǰ���ϴ�ͼƬ��˴���
<pre><code>
router.route("/uploadPhoto").get(function(req,res){    // �����·������Ⱦregister�ļ���������titleֵ�� register.htmlʹ��
    res.render("uploadPhoto",{title:'ͼƬ����ʶ��',message:""});
}).post(function(req,res){
	// ����
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // ����
    form.keepExtensions = true; // ������չ��
    form.maxFieldsSize = 2 * 1024 * 1024; // �ļ���С
    form.uploadDir = 'F:/nodejs/ocrCheck/assets/OCR'  // �洢·��
    form.parse(req,function(err,fileds,files){ // ���� formData����
        if(err){ return console.log(err) }

        let imgPath = files.img.path // ��ȡ�ļ�·��
        let imgName = "C:/Users/qduser02/Desktop/OCR/Node_OCR/assets/OCR/test." + files.img.type.split("/")[1] // �޸�֮�������
        let data = fs.readFileSync(imgPath) // ͬ����ȡ�ļ�

        fs.writeFile(imgName,data,function(err){ // �洢�ļ�
            if(err){ return console.log(err) }

            fs.unlink(imgPath,function(){}) // ɾ���ļ�
            //�ϴ�ͼƬ�ɹ�����code:1
            //res.json({code:1})
            global.nodeServer.getResult(res,imgName);
        })
    });
});
</code></pre>
ͼƬ�������ģ��:
<pre><code>
module.exports = { 
	getResult : function(res,imgName){
		var image = fs.readFileSync(imgName);
		var base64Img = new Buffer(image).toString('base64');
		client.generalBasic(base64Img).then(function(result) {
	    	console.log(JSON.stringify(result));
	    	res.json(result);
		});
	}
}
</code></pre>
��ȡ����base64ͼƬ���ݺ�res������Ϊ�������ݸ�ocr�ṩ�õķ�����
�ص����������ݽ���Ϊ������ظ�ǰ�ˡ�
***####С�ʵ���***
nodeJs��commonJs�淶���ʵ�ֵģ�

1.Node����������ģ����ɣ�ÿ��ģ�����һ���ļ���Nodeģ�������CommonJS�淶��
2.module����Node�ڲ��ṩһ��Module��������������ģ�鶼��Module��ʵ����ÿ��ģ���ڲ�������һ��module���󣬴���ǰģ�顣�����������ԡ�

    module.id ģ���ʶ�����ͨ���Ǵ��о���·����ģ���ļ�����
    module.filename ģ����ļ��������о���·����
    module.loaded ����һ������ֵ����ʾģ���Ƿ��Ѿ���ɼ��ء�
    module.parent ����һ�����󣬱�ʾ���ø�ģ���ģ�顣
    module.children ����һ�����飬��ʾ��ģ��Ҫ�õ�������ģ�顣
    module.exports ��ʾģ����������ֵ��
3.���ã�����ģ��������Ϊ������������Զ���ķ������ɡ�

<code> global.nodeServer.getResult(res,imgName);</code>


