const fs = require('fs');
const readline = require('readline');

// processLineByLine();
let projects=[{name:"",description:"",level:"",type:"",frontend:[""],backend:[""]}];
const string = fs.readFileSync('ideas.txt','utf-8').split('\n');
let projectno=0;

for(let i=0;i<string.length-1;i++){
  if(string[i]==='') continue;

  else if(string[i][1]==='.'){
    projects[projectno].name=string[i].substring(3);
  }

  else if(string[i][2]==='.'){
    projects[projectno].name=string[i].substring(4);
  }

  else if(string[i].startsWith("Programming Level")){
    projects[projectno].level=string[i].substring(19);
  }

  else if(string[i].startsWith("Project Type")){
    projects[projectno].type=string[i].substring(14);
  }

  else if(string[i].startsWith("Front-End")){
    if(string[i].substring(11)==='N/A') projects[projectno].frontend=null;
    else projects[projectno].frontend=string[i].substring(11).split(', ');
  }

  else if(string[i].startsWith("Back-End")){
    if(string[i].substring(10)==='N/A') projects[projectno].backend=null;
    else projects[projectno].backend=string[i].substring(10).split(', ');
    projectno++;
    projects.push({description:"",level:"",type:"",frontend:[""],backend:[""]})
  }

  else{
    projects[projectno].description=string[i];
  }

}


console.log(projects);
module.exports = projects