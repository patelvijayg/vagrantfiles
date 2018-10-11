#!/usr/bin/arangosh --javascript.execute
//use the root password of arongodb as it will need to drop and create database
function print(msg){require("internal").print(msg)}
const DBNAME="testing"
const DBUSER="testing"
const DBPASS="testing"
try
{
	print("Dropping existing "+DBNAME)
	db._dropDatabase(DBNAME);
}
catch(e) {print("DROPING .... error occur")}

try{
db._createDatabase(DBNAME, {}, [{ username: DBUSER, passwd: DBPASS, active: true}])
}
catch(e) {print("CREATING .... error occur")}

db._useDatabase(DBNAME)
var cities = db._create("cities");
var roads = db._createEdgeCollection("roads");
var mumbai = cities.save({_key: "mumbai", name:"mumbai", state:"mh"})
var pune = cities.save({_key: "pune", name:"pune", state:"mh"})
var nagpur = cities.save({_key: "nagpur", name:"nagpur", state:"mh"})

var nh5 = roads.save(mumbai,pune,{name:"express way 1",distance:200})
var nh6 = roads.save(mumbai,nagpur,{name:"express way 2",distance:600})

try{
var Graph = require('@arangodb/general-graph');
var g = Graph._create('city_grapth',[Graph._relation('roads', ['cities'], ['cities'])]);
}
catch(e) {print("CREATING GRAPH .... error occur"+e)}
