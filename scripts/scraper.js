const puppeteer = require('puppeteer');

async function runScraper() {
    const url = 'https://dev.to/andrewbaisden/50-cool-web-and-mobile-project-ideas-for-2021-1pgl'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const projects = await page.$$eval('h2', (headings) =>
        headings.map((heading) => {
            let project={title:"",description:"",level:"",type:"",fe:"",be:""};
            let currNode=heading;
            project.title = heading.textContent;
            console.log('Next node = ');
            currNode=currNode.nextSibling;
            while(currNode.nodeName==='P'){
                if(currNode.textContent.includes('Programming Level')){
                    project.level = currNode.textContent.substr(20);
                    currNode = currNode.nextSubling;
                    project.type = currNode.textContent.substr(15);
                    currNode  = currNode.nextSibling;
                    project.fe = currNode.textContent.substr(12);
                    currNode = currNode.nextSibling;
                    project.be = currNode.textContent.substr(11);
                    currNode = currNode.nextSibling;
                    break;
                }
                project.description += currNode.textContent;
                currNode=currNode.nextSibling;
            }
            return project;
        })
    );
    console.log(projects);
}

runScraper();
