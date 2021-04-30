const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getDoc,
  getDocByID
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
//const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    //console.log("Starting" +body);
    //const body = {
     //first_name: "Sumon",
      //last_name: "Biswas",
      //gender: "Male",
      //email: "tetsdgfg@dg.dfcom",
      //password:"ok",
      //number: "067123"
  //};

    body.password = bcrypt.hashSync(body.password)
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    console.log("hit");
    const body = req.body;
    //console.log(JSON.stringify(req.body.email));
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        res.status(400).send();
        //const return res.json({
          ////success: 0,
          //data: "Now"+ req.body.email+ "Invalid email or password"
        //});
      }
      else{
        console.log(results.firstName);

    const result = compareSync(body.password, results.password);


  console.log(results.lastName);
      
      if (result) {
        //results.password = undefined;
        //const jsontoken = sign({ result: results }, "qwe1234", {
          //expiresIn: "1h"
        //});
        const dataToSend = {
          name: results.firstName + " " + results.lastName,
          email: results.email,
          location: results.location
        }
        res.status(200).send(JSON.stringify(dataToSend));
        //return res.json({
          //success: 1,
          //message: "login successfully",
          //token: jsontoken
        //});
      } else {
        res.status(400).send();
        //console.log(req.body);
        //return res.json({
          //success: 0,
         // data: "Invalid email or password"
        //});
      }
    }
    });
  
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  
  getDoc: (req, res) => {
    //console.log("hit");
    const location = req.body.location;
    console.log(location);
    getDoc(location, (err, results) => {
      if(!location)
      {
        res.status(400).send();
        return;
      }
      if (err) {
        console.log(err);
        return;
      }
      if (results.length>0) {
        //console.log(Object.keys(results).length);
        //return res.json({
          //success: 1,
          //data: results
        //});
      const count = results.length;
      for(i=0; i<count; i++) {
        //console.log(count);
      }
      const names = new Array(results.length);
      const ids = new Array(results.length);
      const chember = new Array(results.length);
      const phone = new Array(results.length);
      const speciality = new Array(results.length);
      const mail = new Array(results.length);

      for(let i=0; i<count; i++)
        {
          names[i]=results[i].firstName + " " + results[i].lastName;
          ids[i]=results[i].id;
          chember[i]=results[i].chember;
          phone[i]=results[i].phone;
          speciality[i]=results[i].type;
          mail[i]=results[i].email;
        }
      //console.log(count);
      const dataToSend1 = 
      {
        
        name: names,
        id: ids,
        chember: chember,
        phone: phone,
        email: mail,
        speciality:speciality,
        count: count
      };
      //console.log(results[1].id);
      //console.log(dataToSend1);
      res.status(200).send(JSON.stringify(dataToSend1));
      //results.password = undefined;
      //return res.json({
        //success: 1,
        //data: results
      //});
      }
      else{
        res.status(400).send();
        return;
        //return res.json({
          //success: 0,
         // message: "Record not Found"
       // });
    }
    });
    
  },
  getDocByID: (req, res) => {
    //console.log("hit");
    const id = req.body.id;
    console.log(id);
    getDocByID(id, (err, results) => {
      if(!id)
      {
        res.status(400).send();
        return;
      }
      if (err) {
        console.log(err);
        return;
      }
      if (results!=0) {
        //console.log(Object.keys(results).length);
        //return res.json({
          //success: 1,
          //data: results
        //});

      //console.log(count);
      const dataToSend1 = 
      {
        name: results[0].firstName + " " + results[0].lastName,
        location: results[0].location,
        phone: results[0].phone,
        speciality: results[0].type,
        chember: results[0].chember
        
      };
      //console.log(results[1].id);
      //console.log(dataToSend1);
      res.status(200).send(JSON.stringify(dataToSend1));
      //results.password = undefined;
      //return res.json({
        //success: 1,
        //data: results
      //});
      }
      else{
        res.status(400).send();
        return;
        //return res.json({
          //success: 0,
         // message: "Record not Found"
       // });
    }
    });
    
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    //console.log(req.body.id);
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
};