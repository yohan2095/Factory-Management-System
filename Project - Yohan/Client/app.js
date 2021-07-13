////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---------------------------------------------------{   Home   }-------------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////----------------------------------------------------Login @login.html-----------------------------------------------------------------/////
async function login()
    {   
        //'POST' a username and a password to the server to check if the combination in the database is true.
        let obj = { user_name : document.getElementById("username").value,
                    password : document.getElementById("password").value}

        let fetchParams = { method : 'POST',
                            body : JSON.stringify(obj),
                            headers : { "Content-Type" : "application/json"}
                          };

        let resp = await fetch("https://localhost:44340/api/login" , fetchParams);
        let result = await resp.json();
        //verify entry according to username, password and actions available.
        if((result == false && localStorage.getItem("access") == "true") || (result == false && localStorage.getItem("access") == "false"))
        {
            document.getElementById('errMsg').innerText = "User Name or Password is Incorrect ! Please try again";
        }
        else if(result == true && localStorage.getItem("access") == "false")
        {
            document.getElementById('errMsg').innerText = "You used all your actions for today, come back tomorrow !";
        }
        else if(result == true && localStorage.getItem("access") == "true")
        {
        //if access is allowed, create a session to memorize name of user and number of actions. 
             let obj2 = { user_name : document.getElementById("username").value}
             let fetchParams = { method : 'POST',
                         body : JSON.stringify(obj2),
                         headers : { "Content-Type" : "application/json"}
                       };
            let resp2 = await fetch("https://localhost:44340/api/user" , fetchParams);
            let result2 = await resp2.json();

            sessionStorage.setItem("user_name", result2.user.full_name);
            sessionStorage.setItem("sessionAct", result2.user.numOfActions);
            sessionStorage.getItem("user_name");
            sessionStorage.getItem("sessionAct");
            
            //memorize entry permission.
            localStorage.setItem("access", true);
            localStorage.setItem("sessionID", result2.user.ID);
            
            //goto Home page.
            window.location.href = "home.html";
        }
    }

/////-------------------------------------------------Check Access Status @login-----------------------------------------------------------/////

async function CheckAccess()
{
    //verifies and alert if entry is allowed or not according to number of actions available.
    var datecount = new Date();
    localStorage.setItem("actualdate", datecount);
    var chck = localStorage.getItem("access")
    if(chck == "false")
    {
        alert("Come back Tomorrow, " + (localStorage.getItem("endDates")));
        if(localStorage.getItem("actualdate") >= localStorage.getItem("endDates"))
        {
            localStorage.setItem("access", true);
            CheckAccess();
        }
    }
    else if(chck == "true")
    {
        alert("Welcome");
    }
}



/////-------------------------------------------------Show Name and Actions @ALL-----------------------------------------------------------/////
async function showName()
{
    //information on every page about name of current user and number of actions left to this day.
    var CurrentUser = document.getElementById("showN");
    let CurrentActions = document.getElementById("nactions");
    CurrentUser.innerText = "Hello " + sessionStorage.getItem("user_name") + " !";
    CurrentActions.innerText = "You have  " + sessionStorage.getItem("sessionAct") + " actions left.";
}

/////------------------------------------------------Change Access Status @ActionTracker()-------------------------------------------------/////
function changeacess()
        {
            //change access status according to number of actions left and setting the next time to access the website.
            localStorage.setItem("access", false);
            var now = new Date();
            var endDate = new Date();
            endDate.setDate(endDate.getDate() + 1);
            localStorage.setItem("nows", now);
            localStorage.setItem("endDates", endDate);
        }

/////---------------------------------------------------Action Tracker @ALL----------------------------------------------------------------/////

async function ActionTracker()
{ 
    //tracks and take actions on every function assigned until no more action left.
    let CurrentActions = sessionStorage.getItem("sessionAct") - 1;
    
    if(CurrentActions == 0)
    {
        changeacess();
        logout();
    }
    else
    {
        sessionStorage.setItem("sessionAct", CurrentActions);
        showName();
    }
}


/////---------------------------------------------------------Logout @ALL------------------------------------------------------------------/////
async function logout()
        {
            //redirects to login page, used as disconnection and end of session.
            window.location.href = "login.html";
        }


/////---------------------------------------------------------NavBar @ALL------------------------------------------------------------------/////
async function navBar()
{
    //creates a NavBar on every page with all the main pages linked inside
    let thHomeObj = document.createElement('th');
    let thDepObj = document.createElement('th');
    let thEmpObj = document.createElement('th');
    let thShfObj = document.createElement('th');

    let nvHomeObj = document.createElement('a');
    let nvDepObj = document.createElement('a');
    let nvEmpObj = document.createElement('a');
    let nvShfObj = document.createElement('a');

    nvHomeObj.innerText = 'Home';
    nvDepObj.innerText = 'Department';
    nvEmpObj.innerText = 'Employees';
    nvShfObj.innerText = 'Shifts';

    nvHomeObj.href = 'home.html';
    nvDepObj.href = 'departments.html';
    nvEmpObj.href = 'employees.html';
    nvShfObj.href = 'shifts.html';

    let nvBarObj = document.createElement('table');
    
    thHomeObj.appendChild(nvHomeObj);
    thDepObj.appendChild(nvDepObj);
    thEmpObj.appendChild(nvEmpObj);
    thShfObj.appendChild(nvShfObj);

    nvBarObj.appendChild(thHomeObj);
    nvBarObj.appendChild(thDepObj);
    nvBarObj.appendChild(thEmpObj);
    nvBarObj.appendChild(thShfObj);

    document.getElementById('navBar').appendChild(nvBarObj);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-----------------------------------------------{   Department   }-----------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////----------------------------------------------Load Departments @departments.html------------------------------------------------------/////
async function loadDepartment()
    {
        //fetch data from department api created on the server.
        let resp = await fetch("https://localhost:44340/api/department");
        let data = await resp.json();
        
        //runs a loop on every "DepWithEmp" element in order to create a table according to the reqeusted data.
        data.forEach(DepWithEmp => {
            
            //creates td elements.
            let tdDepnameObj = document.createElement("td");
            let tdNameObj = document.createElement("td");
            let tdEditObj = document.createElement("td");
            let tdDeleteObj = document.createElement("td");
            
            //inserts requested data on every td element.
            tdDepnameObj.innerText = DepWithEmp.name;
            tdNameObj.innerText = DepWithEmp.fname + " " + DepWithEmp.lname;
            
            //EDIT Button and function.
            tdEditObj = document.createElement("button");
            tdEditObj.innerHTML = "Edit";
            var clicked = false;
            tdEditObj.onclick = function editID()
            {
                clicked = true;
                if(clicked = true)
                {   
                    window.location.href = "department.html?DepWithEmpID=" + DepWithEmp.ID
                }
            };
            
            //DELETE button and function.
            //verifies if department is empty.
            var empexist = false;
            if(DepWithEmp.departmentID == DepWithEmp.ID)
            {
                empexist = true;
            }

            //only if department is empty, shows DELETE button and function.
            if(empexist == false)
            {
                tdDeleteObj = document.createElement("button");
                tdDeleteObj.innerHTML = "Delete";
                var clicked1 = false;
                tdDeleteObj.onclick = async function deleteDep()
                {
                    clicked1 = true;
                    if(clicked1 = true)
                    {
                        let fectParams = { method : 'DELETE',  
                                           headers : { "Content-Type" : "application/json"} 
                                         };
    
                        let resp = await fetch("https://localhost:44340/api/department/" + DepWithEmp.ID, fectParams);
                        let status =  await resp.json();
                        window.location.href = "departments.html"
                        ActionTracker()
                    }
                };
            }
            else
            {
                //if there are employees inside the department, notifies it.
                tdDeleteObj.innerText = "Clear the department from employees to delete it";
            }
           
            //create a tr for each "DepWithEmp" element.
            let trObj = document.createElement("tr");

            //insert td's inside tr objects.
            trObj.appendChild(tdDepnameObj);
            trObj.appendChild(tdNameObj);
            trObj.appendChild(tdEditObj);
            trObj.appendChild(tdDeleteObj);

            document.getElementById('tbl').appendChild(trObj);
            
        });
    }

/////------------------------------------------Load Department per ID @department.html----------------------------------------------------/////
async function getDepID()
        {
            //fetch data by ID.
            const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
        
            let resp =  await fetch("https://localhost:44340/api/department/" + DepWithEmpID);
            let data = await resp.json();

            //Shows current department data on input.
            document.getElementById("dep").value = data.name;
            document.getElementById("mngr").value = data.manager;
        }


/////---------------------------------------------Update Department @department.html-----------------------------------------------------/////
async function updateDep()
        {
            //'PUT' (update) data from DepWithEmp inside the server and sends it to the related DB.
            const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
        
            let obj = { name : document.getElementById("dep").value,
                        manager : document.getElementById("mngr").value
                      };
    
    
        let fectParams = { method : 'PUT',
        body : JSON.stringify(obj),
        headers : { "Content-Type" : "application/json"} 
        };
    
         let resp = await fetch("https://localhost:44340/api/department/" + DepWithEmpID, fectParams);
         let status =  await resp.json();

         //redirects to departments to see the updated table of departments.
         window.location.href = "departments.html"
         ActionTracker()
        }   


/////----------------------------------------------Go to Add Department @addnewdep.html----------------------------------------------------/////
async function gotoAddDep()
{
    //create and redirects to @addnewdep.html by ID.
    const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
    window.location.href = "addnewdep.html?DepWithEmpID=" + DepWithEmpID 
};


/////-----------------------------------------------Add a new Department @addnewdep.html---------------------------------------------------/////
async function addNewDep()
{
    //'POST' (create) data into DepWithEmp inside the server and sends it to the related DB.
    const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');

    let obj = { name : document.getElementById("addname").value,
                manager : document.getElementById("addmngr").value  
             };


    let fectParams = { method : 'POST',
                        body : JSON.stringify(obj),
                        headers : { "Content-Type" : "application/json"} 
    };

    let resp = await fetch("https://localhost:44340/api/department", fectParams);
    let status =  await resp.json();

    //redirects to departments to see the updated table of departments.
    window.location.href = "departments.html"
    ActionTracker()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-------------------------------------------------{   Employee   }-----------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////------------------------------------------------Load Employees Data @employees.html---------------------------------------------------/////
async function loadEmployees()
    {
        //fetch data from employee api created on the server.
        let resp = await fetch("https://localhost:44340/api/employee");
        let data = await resp.json();

        //runs a loop on every "ExtendEmp" element in order to create a table according to the reqeusted data.
        data.forEach((ExtendEmp) => {

            //creates td object.
            let tdFullnameObj = document.createElement("td");
            let tdDepaObj = document.createElement("td");
            let tdStartYearObj = document.createElement("td");
            let tdShiftidObj = document.createElement("td");
            let tdHoursObj = document.createElement("td");
            let tdDateObj = document.createElement("td");

            //inserts requested data on every td object.
            tdFullnameObj.innerText = ExtendEmp.fname + " " + ExtendEmp.lname;
            tdDepaObj.innerText = ExtendEmp.name;
            tdStartYearObj.innerText = ExtendEmp.startWorkYear;

            //create ul objects for shift data.
            let ulShiftidObj = document.createElement("ul");
            let ulHoursObj = document.createElement("ul");
            let ulDateObj = document.createElement("ul");

                //for each ExtendEmp element, create a list of shift data.
                for (let i = 0; i < ExtendEmp.ExtendShiftz.length; i++)
                {
                    //creates li objects.
                    let liShiftidObj = document.createElement("li");
                    let liHoursObj = document.createElement("li");
                    let liDateObj = document.createElement("li");

                    //insert requested data inside every li object.
                    liShiftidObj.innerText = ExtendEmp.ExtendShiftz[i].shiftid;
                    liHoursObj.innerText = ExtendEmp.ExtendShiftz[i].startTime + ":00 -" + ExtendEmp.ExtendShiftz[i].endTime + ":00";
                    liDateObj.innerText = ExtendEmp.ExtendShiftz[i].date;

                    //put every li object inside its related ul object.
                    ulShiftidObj.appendChild(liShiftidObj);
                    ulHoursObj.appendChild(liHoursObj);
                    ulDateObj.appendChild(liDateObj);

                    //put every ul object inside its related td object.
                    tdShiftidObj.appendChild(ulShiftidObj);
                    tdHoursObj.appendChild(ulHoursObj);
                    tdDateObj.appendChild(ulDateObj);

                    //EDIT Button and function.
                    tdEditObj = document.createElement("button");
                    tdEditObj.innerHTML = "Edit";
                    var clicked = false;
                    tdEditObj.onclick = function editID()
                    {
                        clicked = true;
                        if(clicked = true)
                        {
                            window.location.href = "employee.html?ExtendEmp=" + ExtendEmp.ID
                            ActionTracker()
                        }
                    };

                    //DELETE Button and function.
                    tdDeleteObj = document.createElement("button");
                    tdDeleteObj.innerHTML = "Delete";
                    var clicked1 = false;
                    tdDeleteObj.onclick = async function deleteDep()
                    {
                        clicked1 = true;
                        if(clicked1 = true)
                        {
                            let fectParams = { method : 'DELETE',  
                                               headers : { "Content-Type" : "application/json"} 
                                             };
        
                            let resp = await fetch("https://localhost:44340/api/employee/" + ExtendEmp.ID, fectParams);
                            let status =  await resp.json();
            
                            window.location.href = "employees.html"
                            ActionTracker()
                        }
                    };

                    //ADD Button and function.
                    tdAddSObj = document.createElement("button");
                    tdAddSObj.innerText = "Add new Shift";
                    var clicked2 = false;
                    tdAddSObj.onclick = function GotoAddShift()
                    {
                        clicked2 = true;
                        if(clicked2 = true)
                        {
                            window.location.href = "addnewshift.html?ExtendEmp=" + ExtendEmp.ID;
                        }
                    };
                };

            //create a tr object for each ExtendEmp element.    
            let trObj = document.createElement("tr");

            //insert all td's inside the tr object.
            trObj.appendChild(tdFullnameObj);
            trObj.appendChild(tdDepaObj);
            trObj.appendChild(tdStartYearObj);
            trObj.appendChild(tdShiftidObj);
            trObj.appendChild(tdHoursObj);
            trObj.appendChild(tdDateObj);
            trObj.appendChild(tdEditObj);   
            trObj.appendChild(tdDeleteObj);   
            trObj.appendChild(tdAddSObj);   

            //inserts trObj inside the HTML table id.
            document.getElementById('tbl2').appendChild(trObj);       
        }); 
    }


/////-------------------------------------------------memorize search input @employees.html------------------------------------------------/////
async function sendSearch()
{
    //takes the user's input and set it a a sessionStorage item
    let input = document.getElementById("searchTXT").value;
    sessionStorage.setItem("SearchInput", input);
 
    //redirects to "searchresult.html"
    window.location.href = "searchresult.html";
}

/////---------------------------------------------check and load search result @searchresult.html------------------------------------------/////
async function ShowResult()
{
   let Cinput = sessionStorage.getItem("SearchInput");
   let resp = await fetch("https://localhost:44340/api/employee");
   let data = await resp.json();

   //"no result" counter, if noresult = ExtendEmp.length, it means no results were found
   let noresult = 0;

    data.forEach((ExtendEmp) => {
    
    //verifies results
    if((Cinput.toLowerCase() == ExtendEmp.fname.toLowerCase()) || (Cinput.toLowerCase() == ExtendEmp.lname.toLowerCase()) || (Cinput.toLowerCase() == ExtendEmp.name.toLowerCase()))
    {
        //creates td object.
        let tdFullnameObj = document.createElement("td");
        let tdDepaObj = document.createElement("td");
        let tdStartYearObj = document.createElement("td");
        let tdShiftidObj = document.createElement("td");
        let tdHoursObj = document.createElement("td");
        let tdDateObj = document.createElement("td");

        //inserts requested data on every td object.
        tdFullnameObj.innerText = ExtendEmp.fname + " " + ExtendEmp.lname;
        tdDepaObj.innerText = ExtendEmp.name;
        tdStartYearObj.innerText = ExtendEmp.startWorkYear;

        //create ul objects for shift data.
        let ulShiftidObj = document.createElement("ul");
        let ulHoursObj = document.createElement("ul");
        let ulDateObj = document.createElement("ul");

        //for each ExtendEmp element, create a list of shift data.
        for (let i = 0; i < ExtendEmp.ExtendShiftz.length; i++)
        {
            //creates li objects.
            let liShiftidObj = document.createElement("li");
            let liHoursObj = document.createElement("li");
            let liDateObj = document.createElement("li");

            //insert requested data inside every li object.
            liShiftidObj.innerText = ExtendEmp.ExtendShiftz[i].shiftid;
            liHoursObj.innerText = ExtendEmp.ExtendShiftz[i].startTime + ":00 -" + ExtendEmp.ExtendShiftz[i].endTime + ":00";
            liDateObj.innerText = ExtendEmp.ExtendShiftz[i].date;

            //put every li object inside its related ul object.
            ulShiftidObj.appendChild(liShiftidObj);
            ulHoursObj.appendChild(liHoursObj);
            ulDateObj.appendChild(liDateObj);

            //put every ul object inside its related td object.
            tdShiftidObj.appendChild(ulShiftidObj);
            tdHoursObj.appendChild(ulHoursObj);
            tdDateObj.appendChild(ulDateObj);

            //EDIT Button and function.
            tdEditObj = document.createElement("button");
            tdEditObj.innerHTML = "Edit";
            var clicked = false;
            tdEditObj.onclick = function editID()
            {
                clicked = true;
                if(clicked = true)
                {
                    window.location.href = "employee.html?ExtendEmp=" + ExtendEmp.ID
                    ActionTracker()
                }
            };

            //DELETE Button and function.
            tdDeleteObj = document.createElement("button");
            tdDeleteObj.innerHTML = "Delete";
            var clicked1 = false;
            tdDeleteObj.onclick = async function deleteDep()
            {
                clicked1 = true;
                if(clicked1 = true)
                {
                    let fectParams = { method : 'DELETE',  
                                       headers : { "Content-Type" : "application/json"} 
                                     };

                    let resp = await fetch("https://localhost:44340/api/employee/" + ExtendEmp.ID, fectParams);
                    let status =  await resp.json();
    
                    window.location.href = "employees.html"
                    ActionTracker()
                }
            };

            //ADD Button and function.
            tdAddSObj = document.createElement("button");
            tdAddSObj.innerText = "Add new Shift";
            var clicked2 = false;
            tdAddSObj.onclick = function GotoAddShift()
            {
                clicked2 = true;
                if(clicked2 = true)
                {
                    window.location.href = "addnewshift.html?ExtendEmp=" + ExtendEmp.ID;
                }
            };
        };

    //create a tr object for each ExtendEmp element.    
    let trObjR = document.createElement("tr");

    //insert all td's inside the tr object.
    trObjR.appendChild(tdFullnameObj);
    trObjR.appendChild(tdDepaObj);
    trObjR.appendChild(tdStartYearObj);
    trObjR.appendChild(tdShiftidObj);
    trObjR.appendChild(tdHoursObj);
    trObjR.appendChild(tdDateObj);
    trObjR.appendChild(tdEditObj);   
    trObjR.appendChild(tdDeleteObj);   
    trObjR.appendChild(tdAddSObj);  

    document.getElementById('tblR').appendChild(trObjR);

    }
    else
    {
        noresult = noresult + 1;
    }

    }); 
    
    //verify and notifies if no result were found.
    if(noresult == data.length)
    {
        alert("No Result Found");
    }

}

async function backB()
{
    window.location.href = "employees.html";
}


/////---------------------------------------------------Load Employee per ID @employee.html------------------------------------------------/////
async function getEmpID()
        {
            //fetch data from ExtendEmp by ID.
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let resp =  await fetch("https://localhost:44340/api/employee/" + ExtendEmp);
            let data = await resp.json();

            //insert data from ExtendEmp.
            document.getElementById("fname").value = data.fname;
            document.getElementById("lname").value = data.lname;
            
            //fetch data from DepWithEmp by ID.
            let resp2 = await fetch("https://localhost:44340/api/department");
            let datas = await resp2.json();
        
            //creates a dropdown list of every department.
            datas.forEach(DepWithEmp => {

                let opDepObj = document.createElement("option");

                opDepObj.innerText = DepWithEmp.ID + ") " + DepWithEmp.name;
                opDepObj.value = DepWithEmp.ID;

                document.getElementById('depa').appendChild(opDepObj);
            });

        }


/////---------------------------------------------Update employee data @employee.html------------------------------------------------------/////
async function updateEmp()
        {
            //'PUT' (update) data by ID from ExtendEmp.
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let obj = { fname : document.getElementById("fname").value,
                        lname : document.getElementById("lname").value,
                        departmentID : document.getElementById("depa").value,
                      };
    
    
        let fectParams = { method : 'PUT',
                           body : JSON.stringify(obj),
                           headers : { "Content-Type" : "application/json"} 
                           };
    
         let resp = await fetch("https://localhost:44340/api/employee/" + ExtendEmp, fectParams);
         let status =  await resp.json();

         //redirects to employees table to see the updated result.
         window.location.href = "employees.html"
         ActionTracker()
        }
        


/////----------------------------------------------------Load Shift per ID @addnewshift----------------------------------------------------/////
async function getShiftID()
        {
            //fetch shift data from ExtendEmp.
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let resp =  await fetch("https://localhost:44340/api/employee/" + ExtendEmp);
            let data = await resp.json();

            //insert ExtendEmp name and id for the current employee.
            document.getElementById("xname").innerText = data.fname + " " + data.lname;
            document.getElementById("xname").value = data.ID;
            
            //fetch shift data from ExtendShft.
            let resp2 = await fetch("https://localhost:44340/api/shift");
            let datas = await resp2.json();
        
            //create a dropdown list of every shift available.
            datas.forEach(ExtendShft => {
                
                let opDepObj = document.createElement("option");

                opDepObj.innerText = ExtendShft.ID + ") " + ExtendShft.startTime + ":00-" + ExtendShft.endTime + ":00  Date:" + ExtendShft.date;
                opDepObj.value = ExtendShft.ID;

                document.getElementById('shiftid').appendChild(opDepObj);
            });
        }

/////--------------------------------------------Add a new shift to an Employee @addnewshift.html------------------------------------------/////
async function addNewShift()
{
    //'POST' (create) a new shift into DataBase.
    const urlParams = new URLSearchParams(window.location.search);
    ExtendShft = urlParams.get('ExtendShft');

    let obj = { employeeid : document.getElementById("xname").value,
                shiftid : document.getElementById("shiftid").value, 
             };

    let fectParams = { method : 'POST',
                        body : JSON.stringify(obj),
                        headers : { "Content-Type" : "application/json"} 
    };

     let resp = await fetch("https://localhost:44340/api/empshift", fectParams);
     let status =  await resp.json();
     
     //redirects to employees.html to see results.
     window.location.href = "employees.html"
     ActionTracker()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---------------------------------------------------{   Shifts   }-----------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////------------------------------------------------------Load Shifts @shifts.html--------------------------------------------------------/////
async function LoadShifts()
    {
        //fetch data from shift api created on the server.
        let resp = await fetch("https://localhost:44340/api/shift");
        let data = await resp.json();

        //runs a loop on every "ExtendShftEmp" element in order to create a table according to the reqeusted data.
        data.forEach((ExtendShftEmp) => {

            //creates td objects.
            let tdShiftIDObj = document.createElement("td");
            let tdDateObj = document.createElement("td");
            let tdHoursObj = document.createElement("td");
            let tdEmpsObj = document.createElement("td");
            
            //insert data inside td objects.
            tdShiftIDObj.innerText = ExtendShftEmp.ID;
            tdDateObj.innerText = ExtendShftEmp.date
            tdHoursObj.innerText = ExtendShftEmp.startTime + ":00-" + ExtendShftEmp.endTime + ":00";
            
            //create a ul object for employees data
            let ulEmpsObj = document.createElement("ul");
           
                //create a list for each ExtendShftz element
                for (let i = 0; i < ExtendShftEmp.ExtendShiftz.length; i++)
                {
                    // create a li object.
                    let liNameObj = document.createElement("li");

                    //create a link and insert value and text.
                    let aNameObj = document.createElement("a");
                    aNameObj.innerText = ExtendShftEmp.ExtendShiftz[i].fname + " " + ExtendShftEmp.ExtendShiftz[i].lname;
                    aNameObj.onclick = function gotoeditID()
                    {
                        clicked = true;
                        if(clicked = true)
                        {
                            //redirects to edit employee page by ID.
                            aNameObj.href = window.location.href = "employee.html?ExtendEmp=" + ExtendShftEmp.ExtendShiftz[i].employeeid;
                        }
                    };
                    
                    //insert link object inside ul object.
                    liNameObj.appendChild(aNameObj);
                    ulEmpsObj.appendChild(liNameObj);
                    tdEmpsObj.appendChild(ulEmpsObj);
                };

            //create a tr object.
            let trObj = document.createElement("tr");

            //insert related data inside tr.
            trObj.appendChild(tdShiftIDObj);
            trObj.appendChild(tdDateObj);
            trObj.appendChild(tdHoursObj);
            trObj.appendChild(tdEmpsObj);
            
            //insort data into the table by id.
            document.getElementById('tbl3').appendChild(trObj);
        });

        //CREATE Button and function
        let btCreateSObj = document.createElement("button");
            btCreateSObj.innerText = "Create new Shift";
            var clicked2 = false;
            btCreateSObj.onclick = function GotoCreateShift()
            {
                clicked2 = true;
                if(clicked2 = true)
                {
                    //redirect to "createshift".
                    window.location.href = "createshift.html";
                }
            };

            document.getElementById('gotocreate').appendChild(btCreateSObj);
    }



/////-------------------------------------------------Create a new Shift @createshift.html-------------------------------------------------/////
async function createNewShift()
{
    //'POST (create) a new shift.
    const urlParams = new URLSearchParams(window.location.search);
    ExtendEmpShft = urlParams.get('ExtendShft');

    let obj = { date : document.getElementById("dateT").value,
                startTime : document.getElementById("startT").value, 
                endTime : document.getElementById("endT").value, 
             };

    let fectParams = { method : 'POST',
                        body : JSON.stringify(obj),
                        headers : { "Content-Type" : "application/json"} 
    };

     let resp = await fetch("https://localhost:44340/api/shift", fectParams);
     let status =  await resp.json();
    
     //redirects to shifts to see the updated shift.
     window.location.href = "shifts.html"
     ActionTracker()
}








