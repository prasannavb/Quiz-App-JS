const questions=[
    {
        question:"Which of the following is used to define a layout??",
        answers:[{option:"HTML",correct:true,checked:false},{option:"CSS",correct:false},{option:"JS",correct:false},{option:"PHP",correct:false}],
        attempted:false
    },
    {
        question:"Which of the following language is used as backend??",
        answers:[{option:"CSS",correct:false},{option:"XML",correct:false},{option:"PHP",correct:true,checked:false},{option:"ReactJS",correct:false}],
        attempted:false
    
    },
    {
        question:"Which of the following language is written with HTML??",
        answers:[{option:"NodeJS",correct:false},{option:"Pearl",correct:false},{option:"ExpressJS",correct:false},{option:"PHP",correct:true,checked:false}],
        attempted:false
    
    },
    {
        question:"What is the language used in 'MEAN'??",
        answers:[{option:"VueJS",correct:false},{option:"ReactJS",correct:false},{option:"AndroidJS",correct:false},{option:"AngularJS",correct:true,checked:false}],
        attempted:false
    
    }
];
var isonline=false;
var currentpos=-1;
var id=1;
var mark=0;
var prev_opno;
var name;
var options_chosed=[];
var correct_options=[1,3,4,4];
const info=new Map();

const Start=()=>
{
name=document.getElementById('name').value;
if(name==null || name!=="")
{
    document.getElementsByClassName("start-card")[0].style.display="none";
    document.getElementsByClassName("question-card")[0].style.display="block";
    document.getElementsByClassName("prev")[0].style.display="none";
    document.getElementsByClassName("submit")[0].style.display="none";
    document.getElementsByClassName("next")[0].style.display="block";
    document.getElementsByClassName("coder_name")[0].innerHTML=name;
    Next()
    isonline=true

}
else
{
    alert('Enter your name ');
}

}

const Prev=()=>
{
document.getElementsByClassName("submit")[0].style.display="none";
document.getElementsByClassName("next")[0].style.display="block";
if(currentpos>0)
{
    if(currentpos-1==0)
    {
        document.getElementsByClassName("prev")[0].style.display="none";
    }
    currentpos=currentpos-1;
    document.getElementsByClassName("question")[0].innerHTML=(currentpos+1)+". "+questions[currentpos].question;
    questions[currentpos].answers.forEach((answers)=>{
         document.getElementById(`${id}`).innerHTML=answers.option;
        id=id+1;
    })   
    id=1;
}
}

const Next=()=>
{
if(currentpos<questions.length )
{
    currentpos=currentpos+1;
    if(currentpos!=0)
    {
        Mark(prev_opno)
        prev_opno=0
    }
    if(currentpos==1)
    {
        document.getElementsByClassName("prev")[0].style.display="block";
    }
    document.getElementsByClassName("question")[0].innerHTML=(currentpos+1)+". "+questions[currentpos].question;
    questions[currentpos].answers.forEach((answers)=>{
         document.getElementById(`${id}`).innerHTML=answers.option;
         document.getElementById(id).classList.remove("selected");
        id=id+1;
    })   
    id=1;
    if(currentpos==questions.length-1)
    {
          document.getElementsByClassName("next")[0].style.display="none";
          document.getElementsByClassName("submit")[0].style.display="block";
    }
}
}

const Check=(opno)=>
{
if(!prev_opno)
{
    prev_opno=opno
}
    document.getElementById(prev_opno).classList.remove("selected");
    document.getElementById(opno).classList.add("selected");
    prev_opno=opno;
}

const Mark=(opno)=>
{
if(!questions[currentpos-1].attempted)
{
    options_chosed.splice(currentpos-1,0,opno)
    questions[currentpos-1].attempted=true
}
else
{
    options_chosed.splice(currentpos-1,1,opno)
}
}


const Submit=()=>
{
currentpos+=1
Mark(prev_opno)
for(let i=0;i<correct_options.length;i++)
{
    if(options_chosed[i]===correct_options[i])
    {
        mark+=1
    }
}
info.set(name,mark);
document.getElementsByClassName('result-card')[0].style.display="block";
document.getElementsByClassName('question-card')[0].style.display="none";
document.getElementsByClassName('mark')[0].innerHTML="Your Score is:"+mark;
currentpos=-1
mark=0
isonline=false
}

const Show=()=>
{

if(!isonline)
{

document.getElementsByClassName('high_scores')[0].style.display="block"
document.getElementsByClassName("start-card")[0].style.display="none";
document.getElementsByClassName("result-card")[0].style.display="none";
document.getElementsByClassName('coder_name')[0].innerHTML=" "
document.getElementById('name').value=""
if(info.size===0)
{
    document.getElementsByClassName('no_mark')[0].innerHTML="No high marks"
    document.getElementsByClassName('marks_table')[0].style.display="none"
}
else
{
    document.getElementsByClassName('marks_table')[0].style.display="block"
    document.getElementsByClassName('no_mark')[0].style.display="none"
    const tr=document.getElementsByClassName('name')[0];
    const tr1=document.getElementsByClassName('marks')[0];
    info.forEach((value,name)=>{
        let td=document.createElement('td');
        let td1=document.createElement('td');
        td.innerHTML=name;
        td1.innerHTML=value;
        tr1.appendChild(td);
        tr.appendChild(td1);

    })
    document.getElementsByClassName('marks_table')[0].appendChild(tr);

}
}
}

const Back=()=>
{
document.getElementsByClassName('high_scores')[0].style.display="none"
document.getElementsByClassName("start-card")[0].style.display="block";
}

const Retry=()=>
{
currentpos=-1
mark=0
document.getElementsByClassName('result-card')[0].style.display="none"
document.getElementsByClassName("start-card")[0].style.display="block";
document.getElementById('name').value=""
document.getElementsByClassName('coder_name')[0].innerHTML=" "
}