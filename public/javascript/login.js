const para_login = document.querySelector('.para_login')
const alertboxMain = document.querySelector('.alertboxMain')
const crossMark = document.querySelector('#crossMark')

if(para_login.innerHTML===""){
    alertboxMain.style.display='none'
}

crossMark.addEventListener('click',()=>{
    alertboxMain.style.display="none"
})



