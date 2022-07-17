<?php

$data = json_decode(file_get_contents('php://input'),true);

$action =$data['method'];

//db元件
$out=array();
$dsn = "mysql:dbname=boardcast;host=localhost;port=3307";

try {
$db = new PDO($dsn,'test','test');
} catch(PDOException $e) {
die('Could not connect to the database:<br/>' . $e);
}

if($action==""){
    require_once "html/bulletin_board.html";
}

if($action =='getData'){

    $sql = "select * from `board`";
    //$db->query($sql);
    $query = $db->prepare($sql);
    // $query ->bindValue(":id",$id);
    // $query ->bindValue(":id",$id,PDO::PARAM_INT);
    $query ->execute();

    $result = $query->fetchAll();
    $tmp_all=array();
    foreach($result as $row){
        $tmp=array();
        $tmp['id']= $row['id'];
        $tmp['title']=$row['title'];
        $tmp['text']=$row['text'];
        $tmp['day'] =$row['time'];
        
        $tmp_all[]= $tmp;
    }
    $out['method']='get';
    $out['data']=$tmp_all;
    echo json_encode($out);
    exit;
}


if($action =='insert'){
   
    $msg = $data['text'];
    
    $today=date("Y-m-d");
    $sql = "insert into  `board` set title=:tt,text=:txt,time='$today'";

    $query = $db->prepare($sql);
    $query ->bindValue(':tt',$msg['title']);
    $query ->bindValue(':txt',$msg['txt']);
    
    $result =$query ->execute();
    //print_r($query->errorInfo());
    //$result = $query->fetchAll();
    if($result){
        $out['method']='success';
        
    }
    echo json_encode($out);
    exit;
}


if($action =='update'){
   
    $msg = $data['text'];
    $id = $data['id'];

    $today=date("Y-m-d");
    $sql = "update `board` set title=:tt,text=:txt,time='$today' where `id`=:id";

    $query = $db->prepare($sql);
    $query ->bindValue(':tt',$msg['title']);
    $query ->bindValue(':txt',$msg['txt']);
    $query ->bindValue(':id',$data['id']);
    $result =$query ->execute();
    //print_r($query->errorInfo());
    //$result = $query->fetchAll();
    if($result){
        $out['method']='success';
        
    }
    echo json_encode($out);
    exit;
}

if($action =='delete'){
   
    
    $id = $data['id'];

    $today=date("Y-m-d");
    $sql = "delete  from `board` where id=:id";

    $query = $db->prepare($sql);
    $query ->bindValue(':id',$data['id']);
    $result =$query ->execute();
    //print_r($query->errorInfo());

    if($result){
        $out['method']='success';
        
    }
    echo json_encode($out);
    exit;
}
