////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---------------------------------------------------{   Home   }-------------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////----------------------------------------------------Login @login.html-----------------------------------------------------------------/////
async function login()
    {
        let obj = { user_name : document.getElementById("username").value,
                    password : document.getElementById("password").value}

        let fetchParams = { method : 'POST',
                            body : JSON.stringify(obj),
                            headers : { "Content-Type" : "application/json"}
                          };

        let resp = await fetch("https://localhost:44340/api/login" , fetchParams);
        let result = await resp.json();
        if(result == false)
        {
            document.getElementById('errMsg').innerText = "User Name or Password is Incorrect ! Please try again";
        }
        else
        {
          
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

            window.location.href = "home.html";
        }
    }


/////-------------------------------------------------Show Name and Actions @ALL-----------------------------------------------------------/////
async function showName()
{
    var CurrentUser = document.getElementById("showN");
    let CurrentActions = document.getElementById("nactions");
    CurrentUser.innerText = "Hello " + sessionStorage.getItem("user_name") + " !";
    CurrentActions.innerText = "You have  " + sessionStorage.getItem("sessionAct") + " actions left.";
}

/////---------------------------------------------------Action Tracker @ALL----------------------------------------------------------------/////
function changeacess()
        {
            localStorage.setItem("access", true);
        }

async function ActionTracker()
{
    
    let CurrentActions = sessionStorage.getItem("sessionAct") - 1;
    
    if(CurrentActions == 0)
    {
        var date = new Date()
        var date1 = new Date()
        date1.setDate(date1.getDate() + 1)
        console.log(date)
        localStorage.setItem("access", false);
        console.log(localStorage.getItem("access"));
        changeacess();
        console.log(localStorage.getItem("access"));
        console.log(date1);
        //window.location.href = ("login.html");
    }
    else
    {
        console.log(CurrentActions);
        sessionStorage.setItem("sessionAct", CurrentActions);
        showName();
    }

}


/////---------------------------------------------------------Logout @ALL------------------------------------------------------------------/////
async function logout()
        {
            window.location.href = "login.html";
        }


/////---------------------------------------------------------NavBar @ALL------------------------------------------------------------------/////
async function navBar()
{
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
        let resp = await fetch("https://localhost:44340/api/department");
        let data = await resp.json();
        
        data.forEach(DepWithEmp => {
            
            let tdDepnameObj = document.createElement("td");
            let tdNameObj = document.createElement("td");
            let tdEditObj = document.createElement("td");
            let tdDeleteObj = document.createElement("td");
            
            
            tdDepnameObj.innerText = DepWithEmp.name;
            tdNameObj.innerText = DepWithEmp.fname + " " + DepWithEmp.lname;
            

            tdEditObj = document.createElement("button");
            tdEditObj.innerHTML = "Edit";
            var clicked = false;
            tdEditObj.onclick = function editID()
            {
                clicked = true;
                if(clicked = true)
                {   
                    window.location.href = "department.html?DepWithEmpID=" + DepWithEmp.ID
                    ActionTracker()
                }
            };
            
            
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
            
            let trObj = document.createElement("tr");

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
            const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
        
            let resp =  await fetch("https://localhost:44340/api/department/" + DepWithEmpID);
            let data = await resp.json();
            
            console.table(data);

            document.getElementById("dep").value = data.name;
            document.getElementById("mngr").value = data.manager;
        }


/////---------------------------------------------Update Department @department.html-----------------------------------------------------/////
async function updateDep()
        {
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
         window.location.href = "departments.html"
         ActionTracker()
        }   


/////----------------------------------------------Go to Add Department @addnewdep.html----------------------------------------------------/////
async function gotoAddDep()
{
    const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
    window.location.href = "addnewdep.html?DepWithEmpID=" + DepWithEmpID 
};


/////-----------------------------------------------Add a new Department @addnewdep.html---------------------------------------------------/////
async function addNewDep()
{
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
     window.location.href = "departments.html"
     ActionTracker()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////-------------------------------------------------{   Employee   }-----------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////------------------------------------------------Load Employees Data @employees.html---------------------------------------------------/////
async function loadEmployees()
    {
        let resp = await fetch("https://localhost:44340/api/employee");
        let data = await resp.json();

        data.forEach((ExtendEmp) => {

            let tdFullnameObj = document.createElement("td");
            let tdDepaObj = document.createElement("td");
            let tdStartYearObj = document.createElement("td");
            let tdShiftidObj = document.createElement("td");
            let tdHoursObj = document.createElement("td");
            let tdDateObj = document.createElement("td");

            tdFullnameObj.innerText = ExtendEmp.fname + " " + ExtendEmp.lname;
            tdDepaObj.innerText = ExtendEmp.name;
            tdStartYearObj.innerText = ExtendEmp.startWorkYear;
            
            let ulShiftidObj = document.createElement("ul");
            let ulHoursObj = document.createElement("ul");
            let ulDateObj = document.createElement("ul");
           
                for (let i = 0; i < ExtendEmp.ExtendShiftz.length; i++)
                {
                    let liShiftidObj = document.createElement("li");
                    let liHoursObj = document.createElement("li");
                    let liDateObj = document.createElement("li");

                    liShiftidObj.innerText = ExtendEmp.ExtendShiftz[i].shiftid;
                    liHoursObj.innerText = ExtendEmp.ExtendShiftz[i].startTime + ":00 -" + ExtendEmp.ExtendShiftz[i].endTime + ":00";
                    liDateObj.innerText = ExtendEmp.ExtendShiftz[i].date;

                    ulShiftidObj.appendChild(liShiftidObj);
                    ulHoursObj.appendChild(liHoursObj);
                    ulDateObj.appendChild(liDateObj);

                    tdShiftidObj.appendChild(ulShiftidObj);
                    tdHoursObj.appendChild(ulHoursObj);
                    tdDateObj.appendChild(ulDateObj);

           
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

                    tdAddSObj = document.createElement("button");
                    tdAddSObj.innerText = "Add new Shift";
                    var clicked2 = false;
                    tdAddSObj.onclick = function GotoAddShift()
                    {
                        clicked2 = true;
                        if(clicked2 = true)
                        {
                            window.location.href = "addnewshift.html?ExtendEmp=" + ExtendEmp.ID;
                            ActionTracker()
                        }
                    };
                    


                };

            let trObj = document.createElement("tr");

            trObj.appendChild(tdFullnameObj);
            trObj.appendChild(tdDepaObj);
            trObj.appendChild(tdStartYearObj);
            trObj.appendChild(tdShiftidObj);
            trObj.appendChild(tdHoursObj);
            trObj.appendChild(tdDateObj);
            trObj.appendChild(tdEditObj);   
            trObj.appendChild(tdDeleteObj);   
            trObj.appendChild(tdAddSObj);   

            document.getElementById('tbl2').appendChild(trObj);       
        }); 
    }



/////---------------------------------------------------Load Employee per ID @employee.html------------------------------------------------/////
async function getEmpID()
        {
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let resp =  await fetch("https://localhost:44340/api/employee/" + ExtendEmp);
            let data = await resp.json();
            
            console.table(data);

            document.getElementById("fname").value = data.fname;
            document.getElementById("lname").value = data.lname;
            
            let resp2 = await fetch("https://localhost:44340/api/department");
            let datas = await resp2.json();
        
            datas.forEach(DepWithEmp => {

                let opDepObj = document.createElement("option");

                opDepObj.innerText = DepWithEmp.departmentID + ") " + DepWithEmp.name;
                opDepObj.value = DepWithEmp.departmentID;

                document.getElementById('depa').appendChild(opDepObj);
            });

        }


/////---------------------------------------------Update employee data @employee.html------------------------------------------------------/////
async function updateEmp()
        {
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

         window.location.href = "employees.html"
         ActionTracker()
        
        }
        


/////----------------------------------------------------Load Shift per ID @addnewshift----------------------------------------------------/////
async function getShiftID()
        {
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let resp =  await fetch("https://localhost:44340/api/employee/" + ExtendEmp);
            let data = await resp.json();
            
            console.table(data);

            document.getElementById("xname").innerText = data.fname + " " + data.lname;
            document.getElementById("xname").value = data.ID;
            
            let resp2 = await fetch("https://localhost:44340/api/shift");
            let datas = await resp2.json();
        
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
     
     window.location.href = "employees.html"
     ActionTracker()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---------------------------------------------------{   Shifts   }-----------------------------------------------------------//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////------------------------------------------------------Load Shifts @shifts.html--------------------------------------------------------/////
async function LoadShifts()
    {
        let resp = await fetch("https://localhost:44340/api/shift");
        let data = await resp.json();

        data.forEach((ExtendShftEmp) => {

            let tdShiftIDObj = document.createElement("td");
            let tdDateObj = document.createElement("td");
            let tdHoursObj = document.createElement("td");
            let tdEmpsObj = document.createElement("td");
            

            tdShiftIDObj.innerText = ExtendShftEmp.ID;
            tdDateObj.innerText = ExtendShftEmp.date
            tdHoursObj.innerText = ExtendShftEmp.startTime + ":00-" + ExtendShftEmp.endTime + ":00";
            
            
            let ulEmpsObj = document.createElement("ul");
           
                for (let i = 0; i < ExtendShftEmp.ExtendShiftz.length; i++)
                {
                    
                    let liNameObj = document.createElement("li");

                    let aNameObj = document.createElement("a");
                    aNameObj.innerText = ExtendShftEmp.ExtendShiftz[i].fname + " " + ExtendShftEmp.ExtendShiftz[i].lname;
                    aNameObj.onclick = function gotoeditID()
                    {
                        clicked = true;
                        if(clicked = true)
                        {
                            
                            aNameObj.href = window.location.href = "employee.html?ExtendEmp=" + ExtendShftEmp.ExtendShiftz[i].employeeid;
                        }
                    };
                    

                    liNameObj.appendChild(aNameObj);

                    ulEmpsObj.appendChild(liNameObj);

                    tdEmpsObj.appendChild(ulEmpsObj);
                };

            let trObj = document.createElement("tr");

            trObj.appendChild(tdShiftIDObj);
            trObj.appendChild(tdDateObj);
            trObj.appendChild(tdHoursObj);
            trObj.appendChild(tdEmpsObj);
            

            document.getElementById('tbl3').appendChild(trObj);
        });

        let btCreateSObj = document.createElement("button");
            btCreateSObj.innerText = "Create new Shift";
            var clicked2 = false;
            btCreateSObj.onclick = function GotoCreateShift()
            {
                clicked2 = true;
                if(clicked2 = true)
                {
                    window.location.href = "createshift.html";
                }
            };

            document.getElementById('gotocreate').appendChild(btCreateSObj);
    }



/////-------------------------------------------------Create a new Shift @createshift.html-------------------------------------------------/////
async function createNewShift()
{
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
    
     window.location.href = "shifts.html"
     ActionTracker()
}








