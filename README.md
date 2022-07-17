# bulletin_board

這是一個公佈欄作品


如何啟用

1.請先修改index.php 關於db元件($dsn)的設定   EX:  //$dsn = "mysql:dbname=boardcast;host=localhost;port=3307"; //$db = new PDO($dsn,'test','test');

2.創立資料庫的表
以MYSQL舉例

CREATE TABLE `board` (
  `id` int(11) NOT NULL,
  `title` text,
  `text` text,
  `time` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


api格式

讀取:
requset:
{
  method:'get',
  text:'',
  id:'',
}
response:
{
  method:get,
  data:[],
}
______________________
新增佈告:
requset:
{
  method:'insert',
  text:{
    title:string,
    txt:string  
  },
  id:'',
}
response:
{
  method:'success'
}
___________________
編輯佈告:
requset:
{
  method:'update',
  text:{
    title:string,
    txt:string  
  },
  id:number,
}
response:
{
  method:'success'
}
____________________
刪除佈告:
requset:
{
  method:'delete',
  text:'',
  id:number,
}
response:
{
  method:'success'
}
__________________



能增進的方案
1.分頁功能
2.帳戶權限功能
