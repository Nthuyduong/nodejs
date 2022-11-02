const expess = require("express");
const app = expess();
//cap cong, duoc cap hoac khong thi dung 5001//
const PORT = process.env.PORT || 5001;

app.listen(PORT,function (){
    console.log("Server is running...");
});
//config to connect my sql
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password: "t2207e123", //mamp dien root, xampp bo trong ""
    multipleStatement: true //cho phep su dung nhieu cau sql 1 lan gui yeu cau

};
//connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

//api list all class
app.get("/get-classes",function (req,res){
    const sql = "select * from classes";
    //ham callback
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//get students
app.get("/get-students",function (req,res){
    const sql = "select * from students";
    //ham callback
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//loc theo cid
app.get("/student-by-class",function (req,res){
    const cid = req.query.cid;
    const sql = "select * from students where cid = " +cid;
    //ham callback
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//tim kiem theo ten`(?q=)
app.get("/search-students",function (req,res){
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}%' or email like '%${q}%'`;
    //ham callback
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

app.get("/students",function (req,res){
    //liet ke sinh vien
    res.send ("Student with GET");
});
app.post("/students",function (req,res){
    //update sinh vien
    res.send ("Student with POST");
});
app.put("/students",function (req,res){
    //update sinh vien
    res.send ("Student with PUT");
});
app.delete("/students",function (req,res){
    //delete sinh vien
    res.send ("Student with DELETE");
});