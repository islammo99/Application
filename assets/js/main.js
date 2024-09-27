let inputs = document.querySelectorAll("input");
let selects = document.querySelectorAll("select");
let sumbitBtn = document.querySelector("#form button");
let applicantsRow = document.querySelector("#applicants")


let applicants = JSON.parse(localStorage.getItem("applicants")) || [];

sumbitBtn.addEventListener("click", ()=>{
    if(sumbitBtn.innerText == "Sumbit") {
        addApplicant();
    } else {
        updateApplicant();
    }
})

function clearInputs(){
    for(let i = 0; i<inputs.length; i++){
        inputs[i].value =''
        }
    for(let i = 0; i<selects.length; i++){
        selects[i].value = "Choose...";
    }
}

function validateData(){
    let valid =  true;
    for(let i = 0; i<inputs.length; i++){
        if (inputs[i].value.trim() == ""){
            valid = false
        }
    }
    for(let i = 0; i<selects.length; i++){
        if (inputs[i].value == "Choose..."){
            valid = false
        }
    }
    return (valid);
}

function addApplicant() {
        let validation =  validateData();
        
        
    if(validation) {
        const applicant = {
            first_name: inputs[0].value,
            last_name: inputs[1].value,
            age: inputs[2].value,
            phone: inputs[3].value,
            address: inputs[4].value,
            degree: inputs[5].value,
            salary: inputs[6].value,
            email: inputs[7].value,
            experience: inputs[8].value,
            image: inputs[9].value,
            gender: selects[0].value,
            job_title:selects[1].value,
            marital_status: selects[2].value,
        };
        applicants.push(applicant);
        localStorage.setItem("applicants", JSON.stringify(applicants));
        clearInputs();
        printApplicants();
    } else {
        alert ("Inputs are not Valid")
    }
}

function printApplicants() {
    applicantsRow.innerHTML = "";
    applicants.forEach((applicant,index)=>{
        
        applicantsRow.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-10 mb-15">
                    <div class="card">
                        <img src="${applicant.gender == "male" 
                            ? "./assets/images/user.png"
                            : "./assets/images/user fe.png" }"
                             alt="User image" class="img-fluid">
                        <div class="card-body">
                            <h4 class="card-title text-center">${applicant.first_name} ${applicant.last_name}</h4>
                            <div class="row justify-content-sm-center ">
                                <div class="col-lg-6">
                                    <p class="card-text">age : ${applicant.age} </p>
                                </div>
                                <div class="col-lg-6">
                                    <p class="card-text">Marital Status: ${applicant.marital_status} </p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="card-text">
                                        Gender: ${applicant.gender}
                                    </p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="card-text">
                                        Phone: ${applicant.phone}
                                    </p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="card-text">
                                        Address: ${applicant.address}
                                    </p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="card-text">
                                        Degree : ${applicant.degree}
                                    </p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="card-text">
                                        Job Title : ${applicant.job_title}
                                    </p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="card-text">
                                        Salary : ${applicant.salary}$
                                    </p>
                                </div>
                                
                                <div class="col-lg-6 col-12">
                                    <p class="card-text">
                                        Email: ${applicant.email}
                                    </p>
                                </div>
                                
                                <div class="col-lg-6 col-12">
                                    <p class="card-text">
                                        Experience: ${applicant.experience} years
                                    </p>
                                </div>
                                <div class="col-lg-12 text-center">
                                    <button onclick='editApplicant(${index})'  class="btn btn-warning">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onclick='deleteApplicant(${index})' class="btn btn-danger">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
                    `
    })
}

function deleteApplicant(index){
    applicants.splice(index, 1)
    localStorage.setItem("applicants",JSON.stringify(applicants));
    printApplicants();
}

let applicantIndex;
function editApplicant(index) {
    applicantIndex = index;
    const applicant = applicants[index];
        inputs[0].value = applicant.first_name;
        inputs[1].value = applicant.last_name;
        inputs[2].value = applicant.age;
        inputs[3].value = applicant.phone;
        inputs[4].value = applicant.address;
        inputs[5].value = applicant.degree;
        inputs[6].value = applicant.salary;
        inputs[7].value = applicant.email;
        inputs[8].value = applicant.experience;
        inputs[9].value = applicant.image;
        selects[0].value = applicant.gender;
        selects[1].value = applicant.job_title;
        selects[2].value = applicant.marital_status;
    
        sumbitBtn.classList.replace("btn-primary","btn-success");
        sumbitBtn.innerText="Update";
}

function updateApplicant(){
    let validation =  validateData();
        
        
    if(validation) {
        const applicant = {
            first_name: inputs[0].value,
            last_name: inputs[1].value,
            age: inputs[2].value,
            phone: inputs[3].value,
            address: inputs[4].value,
            degree: inputs[5].value,
            salary: inputs[6].value,
            email: inputs[7].value,
            experience: inputs[8].value,
            image: inputs[9].value,
            gender: selects[0].value,
            job_title:selects[1].value,
            marital_status: selects[2].value,
        };
        applicants[applicantIndex] = applicant;
        localStorage.setItem("applicants", JSON.stringify(applicants));
        clearInputs();
        printApplicants();
        sumbitBtn.classList.replace("btn-success","btn-primary");
        sumbitBtn.innerText="Submit";
    } else {
        alert ("Inputs are not Valid")
    }
}
printApplicants();
